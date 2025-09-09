"use client";

import Image from "next/image";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";

// Type definitions for MDX components
interface ImageProps {
  src?: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  [key: string]: unknown;
}

interface LinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  [key: string]: unknown;
}

interface CodeProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

interface GenericProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

// MDX components for security and styling
const mdxComponents = {
  // Override default components for security
  img: ({ src, alt, ...props }: ImageProps) => (
    <Image
      src={src || ""}
      alt={alt || ""}
      width={800}
      height={400}
      className="max-w-full h-auto rounded-lg my-4"
      {...props}
    />
  ),
  a: ({ href, children, ...props }: LinkProps) => (
    <a
      href={href}
      className="text-color-primary hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, className, ...props }: CodeProps) => (
    <code
      className={`bg-color-separator px-2 py-1 rounded text-sm font-mono ${className || ""}`}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: GenericProps) => (
    <pre
      className="bg-color-separator p-4 rounded-lg overflow-x-auto my-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: GenericProps) => (
    <blockquote
      className="border-l-4 border-color-primary pl-4 py-2 my-4 italic text-color-text-subdue"
      {...props}
    >
      {children}
    </blockquote>
  ),
};

interface MDXContentProps {
  content: MDXRemoteSerializeResult;
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div
      className="prose prose-invert max-w-none"
      style={
        {
          "--tw-prose-body": "var(--color-text-paragraph)",
          "--tw-prose-headings": "var(--color-text-highlight)",
          "--tw-prose-lead": "var(--color-text-paragraph)",
          "--tw-prose-links": "var(--color-primary)",
          "--tw-prose-bold": "var(--color-text-highlight)",
          "--tw-prose-counters": "var(--color-text-subdue)",
          "--tw-prose-bullets": "var(--color-text-subdue)",
          "--tw-prose-hr": "var(--color-separator)",
          "--tw-prose-quotes": "var(--color-text-paragraph)",
          "--tw-prose-quote-borders": "var(--color-separator)",
          "--tw-prose-captions": "var(--color-text-subdue)",
          "--tw-prose-code": "var(--color-text-highlight)",
          "--tw-prose-pre-code": "var(--color-text-paragraph)",
          "--tw-prose-pre-bg": "var(--color-widget-background)",
          "--tw-prose-th-borders": "var(--color-separator)",
          "--tw-prose-td-borders": "var(--color-separator)",
        } as React.CSSProperties
      }
    >
      <MDXRemote {...content} components={mdxComponents} />
    </div>
  );
}
