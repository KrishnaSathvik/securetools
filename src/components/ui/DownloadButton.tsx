import { Download } from 'lucide-react';
import { Button } from './button';
import { useToast } from '@/hooks/use-toast';

interface DownloadButtonProps {
  content: string;
  filename: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
}

export function DownloadButton({ 
  content, 
  filename, 
  variant = 'outline', 
  size = 'default',
  disabled 
}: DownloadButtonProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!content.trim()) {
      toast({
        title: "Nothing to download",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded!",
        description: `File "${filename}" has been downloaded.`,
      });
    } catch (err) {
      toast({
        title: "Download failed",
        description: "Please try again or copy the text manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={disabled}
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Download
    </Button>
  );
}