import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

/**
 * ThemeToggle - A button component for switching between dark and light themes
 * 
 * Features:
 * - Animated icon transition between sun (light) and moon (dark) icons
 * - Integrates with ThemeProvider for theme state management
 * - Accessible button with proper ARIA labels
 * - Smooth icon rotation animations
 * - Responsive hover states
 * 
 * @example
 * ```tsx
 * // Basic usage - typically placed in navigation or header
 * <ThemeToggle />
 * 
 * // The component automatically:
 * // - Shows sun icon in dark mode, moon icon in light mode
 * // - Toggles between light and dark themes
 * // - Provides smooth icon transition animations
 * ```
 * 
 * Accessibility:
 * - Screen reader friendly with descriptive labels
 * - Keyboard navigation support
 * - Focus indicators for keyboard users
 * 
 * Animation Details:
 * - Icons rotate during theme transitions
 * - Scale animations for smooth visual feedback
 * - CSS transitions for smooth theme switching
 * 
 * @returns JSX button element with theme toggle functionality
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="hover:bg-secondary"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
