'use client';

import { useState, useMemo } from 'react';
import WaterfallCard from './WaterfallCard';
import FilterSortControls from './FilterSortControls';

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
  };
};

type WaterfallListProps = {
  waterfalls: Waterfall[];
};

export default function WaterfallList({ waterfalls }: WaterfallListProps) {
  const [difficultyFilters, setDifficultyFilters] = useState<string[]>([]);
  const [featureFilters, setFeatureFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Recommended');

  const filteredAndSortedWaterfalls = useMemo(() => {
    let filtered = [...waterfalls];

    if (difficultyFilters.length > 0) {
      filtered = filtered.filter(fall => difficultyFilters.includes(fall.fieldData['difficulty-option']));
    }

    if (featureFilters.includes('Swimming')) {
      filtered = filtered.filter(fall => fall.fieldData['best-for-swimming']);
    }
    if (featureFilters.includes('Dog Friendly')) {
      filtered = filtered.filter(fall => fall.fieldData['dog-friendly']);
    }

    switch (sortBy) {
      case 'Hike Length: Shortest to Longest':
        filtered.sort((a, b) => a.fieldData['hike-length-km'] - b.fieldData['hike-length-km']);
        break;
      case 'Hike Length: Longest to Shortest':
        filtered.sort((a, b) => b.fieldData['hike-length-km'] - a.fieldData['hike-length-km']);
        break;
      default:
        break;
    }

    return filtered;
  }, [waterfalls, difficultyFilters, featureFilters, sortBy]);

  return (
    <div>
      <FilterSortControls
        onDifficultyChange={setDifficultyFilters}
        onFeatureChange={setFeatureFilters}
        onSortChange={setSortBy}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredAndSortedWaterfalls.map((fall) => (
          <WaterfallCard
            key={fall.id}
            name={fall.fieldData.name}
            imageUrl={fall.fieldData['main-image'].url}
            location={`${fall.fieldData['address-locality']}, ${fall.fieldData['address-region']}`}
            difficulty={fall.fieldData['difficulty-option']}
            hikeLength={fall.fieldData['hike-length-km']}
            hikeType={fall.fieldData['hike-type']}
            isSwimmable={fall.fieldData['best-for-swimming']}
            isDogFriendly={fall.fieldData['dog-friendly']}
            slug={`/waterfalls/australia/nsw/blue-mountains/${fall.fieldData.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
