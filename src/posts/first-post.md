---
title: "Welcome to Nexus - Building a Personal Dashboard"
date: "2024-12-15"
excerpt: "Exploring the design principles and technical decisions behind creating a minimalist, Glance-inspired dashboard for personal use."
language: "en"
tags: ["web-dev", "design", "nextjs"]
---

# Welcome to Nexus

This is my first blog post on my new personal dashboard and blog system. I've built this with inspiration from the **Glance** project, focusing on clean information architecture and functional design.

## Design Philosophy

The core principle behind this dashboard is *information aesthetics* - presenting data and content in a way that's both beautiful and highly functional. Here are the key design decisions:

### Color System

- **Single accent color**: A warm, muted yellow-gold (`hsl(43, 50%, 70%)`)
- **Structured grayscale**: Multiple levels of gray for perfect information hierarchy
- **Dark-first approach**: Designed primarily for dark mode with light mode as an alternative

### Typography

Using **JetBrains Mono** throughout gives the interface a technical, code-like precision that appeals to developers while maintaining excellent readability.

```typescript
// Example: Clean, monospace typography in action
const theme = {
  fonts: {
    mono: 'JetBrains Mono, monospace',
    sans: 'Inter, sans-serif'
  }
};
```

### Layout System

The 23px gap system creates perfect visual rhythm:

- Widget spacing: `var(--widget-gap: 23px)`
- Consistent borders: `var(--border-radius: 5px)`
- Breathing room through calculated whitespace

## Technical Implementation

This dashboard is built with:

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom CSS variables
- **Gray-matter** and **Remark** for markdown processing

The markdown rendering system supports:

1. **Frontmatter parsing** for metadata
2. **Reading time calculation**
3. **Tag-based organization**
4. **Multi-language support**

## What's Next?

I'm planning to add:

- [ ] Live GitHub integration
- [ ] Project showcase with real-time commit feeds  
- [ ] Interactive system status widgets
- [ ] Multi-language content switching

This is just the beginning of my digital garden. Stay tuned for more updates!