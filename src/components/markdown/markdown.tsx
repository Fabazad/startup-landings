'use client';

import './code-highlight-block.css';

import type { Options } from 'react-markdown';

import { useMemo, useState, useEffect } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import Link from '@mui/material/Link';

import { isExternalLink } from 'src/routes/utils';
import { RouterLink } from 'src/routes/components';

import { Image } from '../image';
import { StyledRoot } from './styles';
import { markdownClasses } from './classes';
import { htmlToMarkdown, isMarkdownContent } from './html-to-markdown';

import type { MarkdownProps } from './types';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type ComponentTag = {
  [key: string]: any;
};

type RehypeHighlight = typeof import('rehype-highlight').default;

const components = {
  img: ({ ...other }: ComponentTag) => (
    <Image
      ratio="16/9"
      className={markdownClasses.content.image}
      sx={{ borderRadius: 2 }}
      {...other}
    />
  ),
  a: ({ href, children, ...other }: ComponentTag) => {
    const linkProps = isExternalLink(href)
      ? { target: '_blank', rel: 'noopener' }
      : { component: RouterLink };

    return (
      <Link
        {...linkProps}
        href={href}
        className={markdownClasses.content.link}
        sx={{ textDecoration: 'underline' }}
        {...other}
      >
        {children}
      </Link>
    );
  },
  pre: ({ children }: ComponentTag) => (
    <div className={markdownClasses.content.codeBlock}>
      <pre>{children}</pre>
    </div>
  ),
  code({ className, children, ...other }: ComponentTag) {
    const language = /language-(\w+)/.exec(className || '');

    return language ? (
      <code {...other} className={className}>
        {children}
      </code>
    ) : (
      <code {...other} className={markdownClasses.content.codeInline}>
        {children}
      </code>
    );
  },
};

// ----------------------------------------------------------------------

export function Markdown({ children, sx, ...other }: MarkdownProps) {
  const content = useMemo(() => {
    if (isMarkdownContent(`${children}`)) {
      return children;
    }
    return htmlToMarkdown(`${children}`.trim());
  }, [children]);

  // Defer rehype-highlight (pulls highlight.js, ~50KB) off the critical path.
  // Code blocks render unhighlighted on first paint, then upgrade once loaded.
  const [rehypeHighlight, setRehypeHighlight] = useState<RehypeHighlight | null>(null);
  useEffect(() => {
    let cancelled = false;
    import('rehype-highlight').then((mod) => {
      if (!cancelled) setRehypeHighlight(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const rehypePlugins = useMemo(
    () => [
      rehypeRaw,
      ...(rehypeHighlight ? [rehypeHighlight] : []),
      [remarkGfm, { singleTilde: false }],
    ],
    [rehypeHighlight]
  );

  return (
    <StyledRoot
      components={components as Options['components']}
      rehypePlugins={rehypePlugins as Options['rehypePlugins']}
      /* base64-encoded images
       * https://github.com/remarkjs/react-markdown/issues/774
       * urlTransform={(value: string) => value}
       */
      className={markdownClasses.root}
      sx={sx}
      {...other}
    >
      {content}
    </StyledRoot>
  );
}
