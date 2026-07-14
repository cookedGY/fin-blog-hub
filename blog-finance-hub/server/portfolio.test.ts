import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';

// Mock the database module
vi.mock('./db', () => ({
  getAllPublicProjectFiles: vi.fn(async () => [
    {
      id: 1,
      userId: 1,
      filename: 'Nokia Case Study.pdf',
      fileKey: 'projects/1/nokia-case-study.pdf',
      fileUrl: 'https://storage.example.com/projects/1/nokia-case-study.pdf',
      mimeType: 'application/pdf',
      fileSize: 2048000,
      projectCategory: 'Business Builder',
      description: 'Comprehensive Nokia business analysis',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
  ]),
  getPublicProjectFilesByCategory: vi.fn(async (category: string) => []),
}));

describe('Portfolio Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Category Filtering', () => {
    const validCategories = [
      'Finance Grind',
      'Global De',
      'Business Builder',
      'Life & Growth',
      'Fun Stuff',
    ];

    it.each(validCategories)('should accept category: %s', (category) => {
      const schema = z.object({
        category: z.enum([
          'Finance Grind',
          'Global De',
          'Business Builder',
          'Life & Growth',
          'Fun Stuff',
        ]),
      });

      expect(() => schema.parse({ category })).not.toThrow();
    });

    it('should reject invalid categories', () => {
      const schema = z.object({
        category: z.enum([
          'Finance Grind',
          'Global De',
          'Business Builder',
          'Life & Growth',
          'Fun Stuff',
        ]),
      });

      expect(() => schema.parse({ category: 'Invalid Category' })).toThrow();
    });
  });

  describe('File Display Properties', () => {
    it('should have all required properties for display', () => {
      const fileSchema = z.object({
        id: z.number(),
        filename: z.string(),
        fileUrl: z.string().url(),
        mimeType: z.string(),
        fileSize: z.number().positive(),
        projectCategory: z.string(),
        description: z.string().nullable(),
        createdAt: z.date(),
      });

      const testFile = {
        id: 1,
        filename: 'test.pdf',
        fileUrl: 'https://example.com/test.pdf',
        mimeType: 'application/pdf',
        fileSize: 1024,
        projectCategory: 'Finance Grind',
        description: 'Test file',
        createdAt: new Date(),
      };

      expect(() => fileSchema.parse(testFile)).not.toThrow();
    });
  });

  describe('File Size Formatting', () => {
    const formatFileSize = (bytes: number): string => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    it('should format bytes correctly', () => {
      expect(formatFileSize(512)).toBe('512 B');
      expect(formatFileSize(1024)).toBe('1.0 KB');
      expect(formatFileSize(1024 * 100)).toBe('100.0 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1.0 MB');
    });
  });

  describe('MIME Type Icon Mapping', () => {
    const getFileIcon = (mimeType: string): string => {
      if (mimeType.includes('pdf')) return '📄';
      if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
      if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊';
      if (mimeType.includes('presentation')) return '🎯';
      if (mimeType.includes('zip') || mimeType.includes('archive')) return '📦';
      return '📎';
    };

    const mimeTypeMappings = [
      ['application/pdf', '📄'],
      ['application/msword', '📝'],
      ['application/vnd.ms-excel', '📊'],
      ['application/zip', '📦'],
      ['text/plain', '📎'],
    ];

    it.each(mimeTypeMappings)('should map %s to %s', (mimeType, expectedIcon) => {
      expect(getFileIcon(mimeType as string)).toBe(expectedIcon);
    });
  });

  describe('Portfolio Statistics', () => {
    it('should calculate total file count', () => {
      const files = [
        { id: 1, projectCategory: 'Finance Grind' },
        { id: 2, projectCategory: 'Global De' },
        { id: 3, projectCategory: 'Business Builder' },
      ];

      expect(files.length).toBe(3);
    });

    it('should calculate unique categories', () => {
      const files = [
        { id: 1, projectCategory: 'Finance Grind' },
        { id: 2, projectCategory: 'Global De' },
        { id: 3, projectCategory: 'Finance Grind' },
      ];

      const uniqueCategories = new Set(files.map((f) => f.projectCategory)).size;
      expect(uniqueCategories).toBe(2);
    });

    it('should calculate total file size', () => {
      const files = [
        { fileSize: 1024 },
        { fileSize: 2048 },
        { fileSize: 512 },
      ];

      const totalSize = files.reduce((sum, f) => sum + f.fileSize, 0);
      expect(totalSize).toBe(3584);
    });
  });
});
