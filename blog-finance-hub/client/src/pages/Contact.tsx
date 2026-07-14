import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Home, Mail, Linkedin, Twitter, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendMessage = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setErrorMessage("");
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error) => {
      setErrorMessage(
        error.message.includes("credentials")
          ? "Email service is not configured yet. Please email me directly at dekena.wade@gmail.com."
          : "Something went wrong sending your message. Please try again or email me directly."
      );
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;
    sendMessage.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                Dekena Wade
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have a question, collaboration idea, or speaking opportunity? I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <CheckCircle className="w-14 h-14 text-primary" />
                    <h3 className="text-xl font-serif font-bold text-foreground">Message sent!</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Thanks for reaching out. I'll get back to you within 2–3 business days.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={sendMessage.isPending}
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={sendMessage.isPending}
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={sendMessage.isPending}
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me more..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        disabled={sendMessage.isPending}
                        className="bg-background resize-none"
                      />
                    </div>

                    {errorMessage && (
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                        <p className="text-sm text-destructive">{errorMessage}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={sendMessage.isPending || !formData.name || !formData.email || !formData.subject || !formData.message}
                    >
                      {sendMessage.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  For general inquiries and collaboration opportunities:
                </p>
                <a
                  href="mailto:dekena.wade@gmail.com"
                  className="text-primary hover:underline font-medium text-sm"
                >
                  dekena.wade@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="https://www.linkedin.com/in/dekenawade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">@dekena-wade</p>
                  </div>
                </a>
                <a
                  href="https://twitter.com/dekenawade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <Twitter className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Twitter</p>
                    <p className="text-xs text-muted-foreground">@dekenawade</p>
                  </div>
                </a>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  I typically respond to inquiries within 2–3 business days. Thank you for your patience!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
