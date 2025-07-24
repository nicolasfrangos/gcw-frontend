import { webflowClient, COLLECTIONS } from '@/lib/webflow';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqItem from '@/components/FaqItem';
import ClientMap from '@/components/ClientMap';
import WaterfallList from '@/components/WaterfallList';
import JsonLdSchema from '@/components/JsonLdSchema';

// Types
type Region = {
  id: string;
  fieldData: {
    name: string;
    'intro-description': any;
    'waterfall-count': number;
    'faq-1-question'?: string;
    'faq-1-answer'?: any;
    'faq-2-question'?: string;
    'faq-2-answer'?: any;
    'faq-3-question'?: string;
    'faq-3-answer'?: any;
  };
};

type Waterfall = {
  id: string;
  fieldData: {
    name: string;
    'main-image': { url: string };
    'address-locality': string;
    'address-region': string;
    'difficulty-option': 'Easy' | 'Moderate' | 'Hard';
    'hike-length-km': number;
    'hike-type': 'Loop' | 'Out & Back' | 'One Way';
    'best-for-swimming': boolean;
    'dog-friendly': boolean;
    slug: string;
    latitude: number;
    longitude: number;
    region: string;
  };
};

// Data Fetching
async function getRegionData(regionId: string): Promise<Region> {
  const region = await webflowClient.getCollectionItem(COLLECTIONS.REGIONS, regionId);
  if (!region) throw new Error(`Region with ID ${regionId} not found.`);
  return region;
}

async function getWaterfallsByRegion(regionId: string): Promise<Waterfall[]> {
  const response = await webflowClient.listCollectionItems(COLLECTIONS.WATERFALLS);
  return response.items.filter((item: Waterfall) => item.fieldData.region === regionId);
}

export default async function WaterfallPage({ params }: { params: { 'country-slug': string, 'state-slug': string, 'region-slug': string } }) {
  const regionId = '688039f71d143ebb03b0e215'; // Blue Mountains
  
  const region = await getRegionData(regionId);
  const waterfalls = await getWaterfallsByRegion(regionId);

  const { name, 'waterfall-count': waterfallCount, 'intro-description': introDescription, ...faqData } = region.fieldData;

  const regionUrl = `/waterfalls/${params['country-slug']}/${params['state-slug']}/${params['region-slug']}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Waterfalls', href: '/waterfalls' },
    { name: 'Australia', href: `/waterfalls/${params['country-slug']}` },
    { name: 'New South Wales', href: `/waterfalls/${params['country-slug']}/${params['state-slug']}` },
    { name: name, href: regionUrl },
  ];

  const faqs = [
    { q: faqData['faq-1-question'], a: faqData['faq-1-answer'] },
    { q: faqData['faq-2-question'], a: faqData['faq-2-answer'] },
    { q: faqData['faq-3-question'], a: faqData['faq-3-answer'] },
  ].filter(faq => faq.q && faq.a);

  const mapPins = waterfalls.map(fall => ({
    lat: fall.fieldData.latitude,
    lng: fall.fieldData.longitude,
    popupText: fall.fieldData.name,
    slug: `${regionUrl}/${fall.fieldData.slug}`,
  }));

  return (
    <>
      <JsonLdSchema 
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        waterfalls={waterfalls}
        regionName={name}
        regionUrl={regionUrl}
      />
      <div>
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold mb-4">
          The Ultimate Guide to the {waterfallCount} Best Waterfalls in {name}
        </h1>
        <div className="prose lg:prose-xl mb-8">
          {documentToReactComponents(introDescription)}
        </div>

        <div className="mb-8">
          <ClientMap pins={mapPins} />
        </div>

        <WaterfallList waterfalls={waterfalls} />

        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.q}
              answer={documentToReactComponents(faq.a)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
