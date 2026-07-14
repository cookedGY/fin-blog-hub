import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash2, Download, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const PROJECT_CATEGORIES = [
  "Finance Grind",
  "Global De",
  "Business Builder",
  "Life & Growth",
  "Fun Stuff",
];

export default function FileManager() {
  const { user, isAuthenticated } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileListQuery = trpc.files.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      toast.success("File uploaded successfully!");
      setSelectedFile(null);
      setFileName("");
      setDescription("");
      setCategory("");
      fileListQuery.refetch();
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });

  const deleteMutation = trpc.files.delete.useMutation({
    onSuccess: () => {
      toast.success("File deleted successfully!");
      fileListQuery.refetch();
    },
    onError: (error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !category) {
      toast.error("Please select a file and category");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileData = (e.target?.result as string).split(",")[1];
        await uploadMutation.mutateAsync({
          filename: fileName || selectedFile.name,
          fileData,
          mimeType: selectedFile.type,
          fileSize: selectedFile.size,
          projectCategory: category,
          description: description || undefined,
        });
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      toast.error("Failed to read file");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to manage files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span>You need to be logged in to upload and manage files.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">File Manager</h1>
          <p className="text-muted-foreground">Upload and manage your project files</p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload New File</CardTitle>
            <CardDescription>Add documents, case studies, or project files</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-input">Select File</Label>
              <Input
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                disabled={isUploading}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-name">File Name (optional)</Label>
              <Input
                id="file-name"
                placeholder="Leave blank to use original filename"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Project Category</Label>
              <Select value={category} onValueChange={setCategory} disabled={isUploading}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Add a description for this file"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isUploading}
                rows={3}
              />
            </div>

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !category || isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload File"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Files List Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Files</CardTitle>
            <CardDescription>
              {fileListQuery.data?.length || 0} file(s) uploaded
            </CardDescription>
          </CardHeader>
          <CardContent>
            {fileListQuery.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : fileListQuery.data && fileListQuery.data.length > 0 ? (
              <div className="space-y-3">
                {fileListQuery.data.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{file.filename}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{file.projectCategory}</span>
                        <span>•</span>
                        <span>{(file.fileSize / 1024).toFixed(2)} KB</span>
                        <span>•</span>
                        <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                      </div>
                      {file.description && (
                        <p className="text-sm text-muted-foreground mt-2">{file.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Download file"
                      >
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </a>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this file?")) {
                            deleteMutation.mutate({ fileId: file.id });
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                        title="Delete file"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No files uploaded yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
