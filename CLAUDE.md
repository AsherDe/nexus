# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build` (uses Turbopack)
- **Start production**: `npm start`
- **Linting**: `npm run lint` (uses Biome)
- **Format code**: `npm run format` (uses Biome with write)

## Architecture Overview

This is **Nexus**, a personal dashboard and blog system built with Next.js 15, inspired by the Glance dashboard. It combines a developer-focused personal homepage with an integrated blog system.

### Tech Stack
- **Framework**: Next.js 15 with App Router and React 19
- **Styling**: Tailwind CSS 4 with custom CSS variables
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **Fonts**: JetBrains Mono for everything (monospace design)
- **Content**: Markdown blogs with gray-matter frontmatter

### Project Structure

**Core App Structure** (`src/app/`):
- Uses Next.js App Router with layout.tsx as root layout
- Main dashboard at `/` (page.tsx)
- Blog system at `/blog/` and `/blog/[slug]/`
- Projects showcase at `/projects/`

**Data Layer** (`src/lib/`):
- `github.ts`: Fetches GitHub repositories and activity via GitHub API
- `blog.ts`: Handles markdown blog posts from `src/posts/` directory
- Uses environment variables `GITHUB_USERNAME` and `GITHUB_TOKEN`

**Components** (`src/components/`):
- `Widget.tsx`: Main dashboard widget container with external titles
- `ThemeToggle.tsx`: Light/dark theme switching
- `Navigation.tsx`: Site navigation
- Widget Structure: External title + content container for flat design

**Content** (`src/posts/`):
- Markdown files with frontmatter (title, date, excerpt, language, tags)
- Automatically processes reading time calculation
- Supports multiple languages and tagging

### Key Features

1. **GitHub Integration**: Real-time GitHub activity feed and repository showcase
2. **Blog System**: Markdown-based with frontmatter support
3. **Dashboard Layout**: Masonry-style layout with narrow and wide columns
4. **Theme Support**: Light/dark modes using CSS variables
5. **Responsive Design**: Mobile-first with Tailwind CSS

### Styling System

- **Design Philosophy**: High-density, flat design inspired by Glance dashboard
- **Information Hierarchy**: Content-first approach with external widget titles
- **Typography**: Multi-level text hierarchy with JetBrains Mono
  - Primary: `--color-text-primary` (90% white) - Main headings
  - Secondary: `--color-text-secondary` (80% white) - Subheadings  
  - Body: `--color-text-body` (70% white) - Content text
  - Meta: `--color-text-meta` (55% white) - Metadata
  - Muted: `--color-text-muted` (40% white) - Supporting text
  - Disabled: `--color-text-disabled` (30% white) - Widget titles
- **Spacing System**: 
  - `--micro-gap: 4px` - Tight element spacing
  - `--content-gap: 8px` - Related content spacing  
  - `--element-gap: 12px` - Element separation
  - `--widget-gap: 16px` - Widget separation
- **Flat Design Principles**:
  - No shadows or borders on widgets
  - External widget titles (very small, uppercase, muted)
  - Background contrast for element separation
  - Minimal border radius (3px)
- **Font Scale**: xxs(0.7rem) → xs(0.8rem) → sm(0.9rem) → base(1rem) → md(1.15rem) → lg(1.35rem) → xl(1.6rem)
- **CSS Variables**: Comprehensive system in `globals.css` for consistent theming
- **Utility Classes**: Custom spacing, typography, and layout utilities

### Environment Setup

Required environment variables:
- `GITHUB_USERNAME`: Your GitHub username for API calls
- `GITHUB_TOKEN`: GitHub personal access token (optional, increases rate limits)

### Development Notes

- Biome handles all linting and formatting (configured in `biome.json`)
- TypeScript with strict mode enabled
- Path aliases: `@/*` maps to `src/*`
- Blog posts auto-create reading time estimates
- GitHub data has fallback mock data when API fails
- Caching: GitHub repos (5min), activity (1min) via Next.js `revalidate`