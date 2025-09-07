import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          // Tool chunks - each tool gets its own chunk
          'password-generator': ['./src/pages/tools/PasswordGenerator'],
          'text-encryptor': ['./src/pages/tools/TextEncryptor'],
          'security-headers': ['./src/pages/tools/SecurityHeadersChecker'],
          'two-factor-auth': ['./src/pages/tools/TwoFactorAuth'],
          'random-data': ['./src/pages/tools/RandomDataGenerator'],
          'password-analyzer': ['./src/pages/tools/PasswordStrengthAnalyzer'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit for individual chunks
  },
}));
