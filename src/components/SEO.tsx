import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "Pakasian Protein Nimko - Power in Every Crunch | Premium Pakistani Snack",
  description = "Fuel your day with Pakasian Protein Nimko - 22g protein per 100g serving. Bold taste meets unbeatable nutrition in this premium high-protein Pakistani snack.",
  keywords = "protein nimko, pakistani snacks, high protein snacks, nimko, pakistani food, protein rich snacks, healthy snacks, traditional snacks, pakistani cuisine, protein bars alternative, nimko snacks, pakistani protein snacks",
  image = "https://pakasianmart.com/logo.webp",
  url = "https://pakasianmart.com/",
  type = "website",
  structuredData
}) => {
  const siteName = "Pakasian Protein Nimko";
  const twitterHandle = "@pakasianfoods";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content={twitterHandle} />
      <meta property="twitter:site" content={twitterHandle} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
