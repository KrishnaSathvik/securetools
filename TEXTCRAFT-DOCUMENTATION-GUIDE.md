# 📚 TextCraft Component Documentation Guide

> **Professional-grade documentation for all components in the TextCraft text processing application**

## 🎯 Overview

This guide provides comprehensive documentation for all components in the TextCraft application. The documentation follows industry standards with JSDoc comments, TypeScript integration, and practical examples for every component.

## 📊 Documentation Coverage Status

### ✅ **Fully Documented Components (11/11 Core Components)**

- **100% JSDoc Coverage** on all major components
- **TypeScript Integration** for all props and methods
- **Usage Examples** for every component
- **Technical Details** for complex implementations
- **Security Notes** where applicable

---

## 🔧 **Tool Components** (5 Components)

### 1. **WordCounter** (`src/pages/tools/WordCounter.tsx`)

**Purpose**: Advanced word counting and text analysis tool

**Features**:
- ✅ Real-time word, character, sentence, and paragraph counting
- ✅ Reading time estimates (225 WPM average)
- ✅ Speaking time calculations (130 WPM average)
- ✅ Character density analysis and line counting
- ✅ Copy and download functionality
- ✅ Professional statistics display

**Usage**:
```tsx
<WordCounterPage />
```

**Technical Details**:
- Uses `countStats` utility for comprehensive text analysis
- Implements `formatReadingTime` for user-friendly time display
- Real-time statistics updates with `useMemo` optimization
- SEO-optimized with structured data and meta tags

**Key Statistics**:
- Words, characters (with/without spaces)
- Sentences, paragraphs, lines
- Reading time (225 WPM) and speaking time (130 WPM)
- Average sentence/paragraph length
- Character density analysis

---

### 2. **CaseConverter** (`src/pages/tools/CaseConverter.tsx`)

**Purpose**: Text case transformation tool with multiple format support

**Features**:
- ✅ UPPERCASE and lowercase conversion
- ✅ Title Case and Sentence case
- ✅ camelCase and PascalCase
- ✅ kebab-case and snake_case
- ✅ Real-time preview and conversion
- ✅ Undo/Redo functionality

**Usage**:
```tsx
<CaseConverterPage />
```

**Supported Cases**:
- `upper` - UPPERCASE TEXT
- `lower` - lowercase text
- `title` - Title Case Text
- `sentence` - Sentence case text
- `camel` - camelCase text
- `pascal` - PascalCase Text
- `kebab` - kebab-case-text
- `snake` - snake_case_text

**Technical Details**:
- Uses `transformCase` utility with `caseOptions` configuration
- Implements undo functionality with state management
- Real-time preview with `useMemo` optimization
- Professional case selection interface

---

### 3. **DiffChecker** (`src/pages/tools/DiffChecker.tsx`)

**Purpose**: Text comparison and difference highlighting tool

**Features**:
- ✅ Line-by-line and word-by-word comparison
- ✅ Color-coded differences (added, removed, unchanged)
- ✅ Unified diff format output
- ✅ Side-by-side text comparison
- ✅ Real-time diff calculation
- ✅ Export and copy diff results

**Usage**:
```tsx
<DiffCheckerPage />
```

**Comparison Modes**:
- **Line Diff**: Compare documents line by line
- **Word Diff**: Detailed word-by-word analysis

**Technical Details**:
- Uses `diffLines` and `diffWords` utilities
- Implements `generateUnifiedDiff` for standard diff format
- Real-time diff calculation with performance optimization
- Professional diff visualization with color coding

**Diff Statistics**:
- Additions (green), deletions (red), changes (yellow)
- Similarity percentage calculation
- Chunk-based diff processing

---

### 4. **LineBreaks** (`src/pages/tools/LineBreaks.tsx`)

**Purpose**: Text cleanup and whitespace normalization tool

**Features**:
- ✅ Remove extra blank lines and normalize spacing
- ✅ Trim trailing spaces and tabs
- ✅ Join lines with single spaces
- ✅ Convert smart quotes to ASCII
- ✅ Normalize line break formats
- ✅ Customizable cleanup options

**Usage**:
```tsx
<LineBreaksPage />
```

**Cleanup Options**:
- `removeExtraBlankLines` - Convert 3+ consecutive line breaks to 2
- `trimTrailingSpaces` - Remove spaces and tabs at end of lines
- `joinLines` - Convert line breaks to single spaces
- `removeExtraSpaces` - Convert multiple spaces to single spaces
- `smartToAsciiQuotes` - Convert "" to "" and '' to ''
- `normalizeLineBreaks` - Convert \r\n and \r to \n

**Technical Details**:
- Uses `cleanupText` utility with `CleanupOptions` interface
- Real-time preview with character count changes
- Undo functionality for safe text processing
- Professional cleanup options interface

---

### 5. **LoremIpsum** (`src/pages/tools/LoremIpsum.tsx`)

**Purpose**: Placeholder text generator with multiple content types

**Features**:
- ✅ Multiple content types (Classic, Modern, Tech, Business)
- ✅ Flexible formats (words, sentences, paragraphs)
- ✅ Customizable length with slider control
- ✅ HTML formatting options
- ✅ Real-time generation and preview
- ✅ Copy and download functionality

**Usage**:
```tsx
<LoremIpsumPage />
```

**Content Types**:
- `classic` - Traditional Lorem Ipsum text
- `modern` - Contemporary placeholder content
- `tech` - Technology-focused placeholder text
- `business` - Business and corporate content

**Output Formats**:
- **Words**: Individual word generation (1-500 words)
- **Sentences**: Complete sentence generation (1-50 sentences)
- **Paragraphs**: Full paragraph generation (1-20 paragraphs)

**Technical Details**:
- Uses `genWords`, `genSentences`, `genParagraphs` utilities
- Implements `loremTypes` configuration for content variety
- Real-time generation with `useMemo` optimization
- HTML formatting support for web content

---

## 🏗️ **Core Infrastructure Components** (3 Components)

### 1. **ToolLayout** (`src/components/layouts/ToolLayout.tsx`)

**Purpose**: Reusable wrapper component for all text tools

**Features**:
- ✅ Consistent layout structure for all tools
- ✅ Responsive design with proper spacing
- ✅ Tool header with title and description
- ✅ Professional gradient text styling
- ✅ Mobile-optimized layout

**Props**:
```tsx
interface ToolLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  examples?: Example[];
  onFillExample?: (example: Example) => void;
}
```

**Usage**:
```tsx
<ToolLayout
  title="Word Counter"
  description="Count words, characters, and analyze text"
>
  <YourToolContent />
</ToolLayout>
```

**Technical Details**:
- Responsive width with max-width constraints
- Professional gradient text for titles
- Consistent spacing and padding system
- Mobile-first responsive design

---

### 2. **Navigation** (`src/components/Navigation.tsx`)

**Purpose**: Main navigation component for TextCraft

**Features**:
- ✅ Responsive design with mobile hamburger menu
- ✅ Command palette search (Ctrl/Cmd + K)
- ✅ Theme toggle integration
- ✅ Active route highlighting
- ✅ Breadcrumb structured data
- ✅ Tool search functionality

**Usage**:
```tsx
<Navigation />
```

**Keyboard Shortcuts**:
- `Ctrl/Cmd + K` - Open command palette search
- `Escape` - Close search palette

**Technical Details**:
- Uses React Router for navigation
- Implements breadcrumb structured data for SEO
- Command palette with keyboard shortcuts
- Mobile-responsive hamburger menu
- Theme integration with ThemeToggle

**Available Tools**:
- Word Counter (`/word-counter`)
- Case Converter (`/case-converter`)
- Line Breaks (`/line-breaks`)
- Diff Checker (`/diff-checker`)
- Lorem Ipsum (`/lorem-ipsum`)

---

### 3. **ThemeProvider** (`src/components/ThemeProvider.tsx`)

**Purpose**: Theme state management and system detection

**Features**:
- ✅ Dark/light theme switching with system detection
- ✅ Persistent storage in localStorage
- ✅ Automatic system theme changes detection
- ✅ Context-based theme access
- ✅ Smooth theme transitions

**Usage**:
```tsx
<ThemeProvider defaultTheme="dark" storageKey="textcraft-ui-theme">
  <App />
</ThemeProvider>

// Use in components
const { theme, setTheme } = useTheme()
```

**Theme Options**:
- `"dark"` - Force dark theme
- `"light"` - Force light theme
- `"system"` - Follow system preference

**Technical Details**:
- Uses React Context for theme state management
- Implements `matchMedia` for system theme detection
- Updates document root class for CSS theme switching
- Persistent storage with localStorage

---

## 🎨 **Theme Management Components** (2 Components)

### 1. **ThemeToggle** (`src/components/ThemeToggle.tsx`)

**Purpose**: Animated theme switching button

**Features**:
- ✅ Animated icon transition between sun and moon
- ✅ Integrates with ThemeProvider
- ✅ Accessible button with ARIA labels
- ✅ Smooth icon rotation animations
- ✅ Responsive hover states

**Usage**:
```tsx
<ThemeToggle />
```

**Animation Details**:
- Icons rotate during theme transitions
- Scale animations for smooth visual feedback
- CSS transitions for smooth theme switching

**Accessibility**:
- Screen reader friendly with descriptive labels
- Keyboard navigation support
- Focus indicators for keyboard users

---

## 🎯 **UI Components Library** (40+ Components)

The project includes a comprehensive UI component library based on Radix UI and shadcn/ui:

### **Form Components**
- `Button` - Interactive button component
- `TextArea` - Multi-line text input with custom styling
- `Input` - Text input field
- `Select` - Dropdown selection
- `Checkbox` - Checkbox input
- `Slider` - Range slider input
- `Label` - Form label component

### **Layout Components**
- `Card` - Content container with header and content
- `Separator` - Visual divider
- `ScrollArea` - Custom scrollable area
- `Tabs` - Tabbed interface component

### **Feedback Components**
- `CopyButton` - Copy to clipboard functionality
- `DownloadButton` - File download functionality
- `StatsPill` - Statistics display component
- `StatsGrid` - Grid layout for statistics

### **Data Display Components**
- `Badge` - Status badge
- `Skeleton` - Loading skeleton

---

## 🚀 **How to Use the Documentation**

### **In Your IDE (Primary Method)**
1. **Hover over any component** to see full documentation
2. **Start typing props** to see parameter descriptions
3. **Ctrl/Cmd+Click** on components to jump to documented source
4. **View examples** directly in the JSDoc comments

### **Generate HTML Docs (Advanced)**
```bash
# Install TypeDoc
npm install -D typedoc

# Add to package.json scripts
"docs": "typedoc src --out docs"

# Generate documentation website
npm run docs
```

### **Run Tests**
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 📈 **Documentation Quality Metrics**

### ✅ **Coverage Statistics**
- **100% JSDoc Coverage** on key components
- **TypeScript Integration** for all props and methods
- **Usage Examples** for every major component
- **Technical Details** for complex implementations
- **Security Notes** where applicable

### 📊 **Component Categories**
- **Tool Components**: 5/5 documented (100%)
- **Infrastructure Components**: 3/3 documented (100%)
- **Theme Components**: 2/2 documented (100%)
- **UI Components**: 40+ available (shadcn/ui library)
- **Test Components**: Available for testing

---

## 🛠️ **Development Workflow**

### **Adding New Components**
1. **Create component file** in appropriate directory
2. **Add JSDoc documentation** following established patterns
3. **Include TypeScript interfaces** for all props
4. **Add usage examples** in JSDoc comments
5. **Write unit tests** for the component
6. **Update this documentation** if it's a major component

### **Documentation Standards**
- **JSDoc Format**: Follow established documentation conventions
- **TypeScript Integration**: All props and methods fully typed
- **Usage Examples**: Include practical code examples
- **Technical Details**: Document implementation specifics
- **Security Notes**: Include security considerations where applicable

### **Testing Standards**
- **Unit Tests**: Write tests for all major components
- **Router Context**: Wrap components in BrowserRouter for tests
- **Mocking**: Mock external dependencies appropriately
- **Coverage**: Aim for high test coverage on critical components

---

## 🔧 **Troubleshooting**

### **Common Issues**

#### **React Router Context Errors in Tests**
```tsx
// Wrap components in BrowserRouter for tests
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};
```

#### **Theme Provider Context Errors**
```tsx
// Wrap components in ThemeProvider for tests
import { ThemeProvider } from '@/components/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};
```

#### **Performance Issues**
- **Large Text Processing**: Use `useMemo` for expensive calculations
- **Real-time Updates**: Debounce input changes for better performance
- **Memory Leaks**: Properly clean up event listeners and subscriptions

---

## 💡 **Best Practices**

### **Component Development**
1. **Always Add JSDoc** to new components following established patterns
2. **Include @example Blocks** for components with complex APIs
3. **Document Security Implications** for data-handling tools
4. **Update Documentation** when changing component behavior
5. **Use Semantic Names** that are self-documenting

### **Testing Best Practices**
1. **Test User Interactions** not implementation details
2. **Mock External Dependencies** appropriately
3. **Use Router Context** for components that use React Router
4. **Write Descriptive Test Names** that explain what's being tested
5. **Keep Tests Simple** and focused on single behaviors

### **Documentation Maintenance**
1. **Update Examples** when component APIs change
2. **Review Technical Details** regularly
3. **Keep Implementation Notes** current with code
4. **Add New Components** to this guide when they're created

---

## 🎉 **Result: Professional-Grade Codebase**

Your TextCraft now has enterprise-level documentation that will:

- **Speed up development** with clear component contracts
- **Reduce debugging time** with documented expected behavior
- **Enable easy maintenance** with comprehensive technical notes
- **Support team collaboration** with consistent documentation standards
- **Provide excellent developer experience** through IDE integration

The documentation follows industry standards and provides everything needed for both current development and future maintenance! 🚀

---

## 📚 **Additional Resources**

- [TypeDoc Documentation](https://typedoc.org/)
- [JSDoc Reference](https://jsdoc.app/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Made with ❤️ by TextCraft Team**

[![GitHub](https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white)](https://github.com/KrishnaSathvik/textcraft)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
