
type Breadcrumb = {
  name: string;
  href: string;
};

type Faq = {
  q: string;
  a: any; 
};

type Waterfall = {
  id: string;
  fieldData: {
    name: string;
    slug: string;
  };
};

type JsonLdSchemaProps = {
  breadcrumbs: Breadcrumb[];
  faqs: Faq[];
  waterfalls: Waterfall[];
  regionName: string;
  regionUrl: string;
};

export default function JsonLdSchema({ breadcrumbs, faqs, waterfalls, regionName, regionUrl }: JsonLdSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.gochasewaterfalls.com${item.href}`
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "See page for answer." // Simplified for now
      }
    }))
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `The Ultimate Guide to the ${waterfalls.length} Best Waterfalls in ${regionName}`,
    "description": `Discover the top waterfalls in ${regionName}. Our guide includes an interactive map, photos, and details on hike difficulty, swimming, and more.`,
    "url": `https://www.gochasewaterfalls.com${regionUrl}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": waterfalls.map((fall, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristAttraction",
          "name": fall.fieldData.name,
          "url": `https://www.gochasewaterfalls.com${regionUrl}/${fall.fieldData.slug}`
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
    </>
  );
}
