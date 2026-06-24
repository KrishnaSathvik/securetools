import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  structuredData?: Record<string, unknown>;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

/**
 * Custom hook for managing SEO meta tags and structured data
 * 
 * This hook automatically updates the document head with SEO-optimized
 * meta tags, Open Graph tags, Twitter Cards, and structured data.
 * 
 * @param props - SEO configuration object
 * @param props.title - Page title (will be appended to site name)
 * @param props.description - Meta description (max 160 characters)
 * @param props.keywords - Comma-separated keywords
 * @param props.canonical - Canonical URL for the page
 * @param props.structuredData - JSON-LD structured data object
 * @param props.ogImage - Open Graph image URL
 * @param props.ogType - Open Graph content type (default: 'website')
 * @param props.twitterCard - Twitter Card type (default: 'summary_large_image')
 * 
 * @example
 * ```tsx
 * useSEO({
 *   title: 'Word Counter - Free Online Text Analysis Tool',
 *   description: 'Count words, characters, sentences instantly. Free online word counter with reading time estimates.',
 *   keywords: 'word counter, character count, text analysis, reading time',
 *   canonical: 'https://www.securetools.dev/word-counter',
 *   structuredData: {
 *     '@context': 'https://schema.org',
 *     '@type': 'WebApplication',
 *     name: 'Word Counter',
 *     description: 'Free online word counting tool'
 *   }
 * });
 * ```
 */
export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  structuredData,
  ogImage = 'https://www.securetools.dev/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    const siteName = 'SecureTools';
    document.title = title?.includes(siteName) ? title : `${title || ''} | ${siteName}`;

    // Update meta description
    updateMetaTag('name', 'description', description);
    
    // Update keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // Update canonical URL
    if (canonical) {
      updateCanonical(canonical);
    }

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:url', canonical || window.location.href);
    updateMetaTag('property', 'og:site_name', siteName);

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:card', twitterCard);
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // Add structured data
    if (structuredData) {
      addStructuredData(structuredData);
    }

    // Cleanup function to remove structured data when component unmounts
    return () => {
      removeStructuredData();
    };
  }, [title, description, keywords, canonical, structuredData, ogImage, ogType, twitterCard]);
};

/**
 * Updates or creates a meta tag in the document head
 */
const updateMetaTag = (attribute: string, value: string, content: string) => {
  const existingTag = document.querySelector(`meta[${attribute}="${value}"]`);
  
  if (existingTag) {
    existingTag.setAttribute('content', content);
  } else {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, value);
    metaTag.setAttribute('content', content);
    document.head.appendChild(metaTag);
  }
};

/**
 * Updates the canonical URL
 */
const updateCanonical = (url: string) => {
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (canonicalLink) {
    canonicalLink.href = url;
  } else {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = url;
    document.head.appendChild(canonicalLink);
  }
};

/**
 * Adds structured data as JSON-LD script
 */
const addStructuredData = (data: Record<string, unknown>) => {
  // Remove existing structured data
  removeStructuredData();
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  script.id = 'structured-data';
  document.head.appendChild(script);
};

/**
 * Removes structured data script
 */
const removeStructuredData = () => {
  const existingScript = document.getElementById('structured-data');
  if (existingScript) {
    existingScript.remove();
  }
};
