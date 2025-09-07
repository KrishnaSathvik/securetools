import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/**
 * ThemeProvider - Manages application theme state and system theme detection
 * 
 * Features:
 * - Dark/light theme switching with system preference detection
 * - Persistent theme storage in localStorage
 * - Automatic system theme changes detection
 * - Context-based theme access throughout the app
 * - Smooth theme transitions
 * 
 * @example
 * ```tsx
 * // Wrap your app with the theme provider
 * <ThemeProvider defaultTheme="dark" storageKey="app-theme">
 *   <App />
 * </ThemeProvider>
 * 
 * // Use the theme in components
 * const { theme, setTheme } = useTheme()
 * ```
 * 
 * Theme Options:
 * - "dark": Force dark theme
 * - "light": Force light theme  
 * - "system": Follow system preference
 * 
 * Technical Details:
 * - Uses matchMedia to detect system theme changes
 * - Stores preference in localStorage for persistence
 * - Updates document root class for CSS theme switching
 * - Provides React context for theme state management
 * 
 * @param props - Theme provider configuration
 * @returns JSX provider component
 */
export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "securetools-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

/**
 * useTheme - Hook to access and control theme state
 * 
 * @example
 * ```tsx
 * const { theme, setTheme } = useTheme()
 * 
 * // Get current theme
 * console.log(theme) // "dark" | "light" | "system"
 * 
 * // Change theme
 * setTheme("light")
 * ```
 * 
 * @returns Theme context with current theme and setter function
 * @throws {Error} When used outside of ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
