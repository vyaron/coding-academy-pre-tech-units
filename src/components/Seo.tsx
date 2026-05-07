import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  canonicalPath?: string;
}

function getOrigin() {
  if (typeof window === 'undefined') return 'https://cyber.coding-academy.co.il';
  return window.location.origin;
}

function normalizeBaseUrl(baseUrl: string) {
  if (!baseUrl) return '/';
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

function buildCanonicalUrl(pathname: string) {
  const origin = getOrigin();
  const baseUrl = normalizeBaseUrl(import.meta.env.BASE_URL || '/');
  if (pathname === '/') return `${origin}${baseUrl}`;
  return `${origin}${baseUrl}#${pathname}`;
}

function buildImageUrl(image: string) {
  if (/^https?:\/\//i.test(image)) return image;
  const origin = getOrigin();
  const baseUrl = normalizeBaseUrl(import.meta.env.BASE_URL || '/');
  const cleanedImage = image.startsWith('/') ? image.slice(1) : image;
  return `${origin}${baseUrl}${cleanedImage}`;
}

export default function Seo({
  title,
  description,
  image = 'img/logo.png',
  noIndex = false,
  type = 'website',
  canonicalPath,
}: SeoProps) {
  const { pathname } = useLocation();
  const finalPath = canonicalPath ?? pathname;
  const canonicalUrl = buildCanonicalUrl(finalPath);
  const imageUrl = buildImageUrl(image);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex,follow' : 'index,follow'} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:site_name" content="Coding Academy" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}