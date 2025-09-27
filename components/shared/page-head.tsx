import Head from 'next/head';

const BUSINESS_NAME = 'Next Tailwind Starter';
const DEFAULT_DESCRIPTION = 'A modern Next.js starter with Tailwind CSS and TypeScript.';

interface PageHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export function PageHead({
  title = BUSINESS_NAME,
  description = DEFAULT_DESCRIPTION,
  keywords,
  ogImage,
  canonical
}: PageHeadProps) {
  // If title doesn't already include the business name, append it
  const fullTitle = title.includes(BUSINESS_NAME)
    ? title
    : `${title} | ${BUSINESS_NAME}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Viewport and other essential meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  );
}

export default PageHead;
