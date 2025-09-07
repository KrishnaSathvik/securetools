import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Code2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const navigation = [
  { name: 'Word Count', href: '/tools/word-counter', short: 'Words' },
  { name: 'Case Convert', href: '/tools/case-converter', short: 'Case' },
  { name: 'Line Breaks', href: '/tools/line-breaks', short: 'Lines' },
  { name: 'Text Diff', href: '/tools/diff-checker', short: 'Diff' },
  { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum', short: 'Lorem' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SecureTools
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm transition-colors hover:text-primary ${
                    location.pathname === item.href
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.short}
                </Link>
              ))}
            </nav>

            {/* Search */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="relative hidden sm:flex items-center w-64 h-10 px-3 py-2 text-sm bg-secondary/50 border border-border rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="flex-1 text-left">Search tools...</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tools..." />
        <CommandList>
          <CommandEmpty>No tools found.</CommandEmpty>
          <CommandGroup heading="Text Tools">
            {navigation.map((tool) => (
              <CommandItem
                key={tool.href}
                onSelect={() => runCommand(() => navigate(tool.href))}
                className="flex items-center gap-2 px-4 py-3"
              >
                <span>{tool.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}