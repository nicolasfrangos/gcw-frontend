
import Image from 'next/image';
import Link from 'next/link';

type WaterfallCardProps = {
  name: string;
  imageUrl: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  hikeLength: number;
  hikeType: 'Loop' | 'Out & Back' | 'One Way';
  isSwimmable: boolean;
  isDogFriendly: boolean;
  slug: string;
};

export default function WaterfallCard({
  name,
  imageUrl,
  location,
  difficulty,
  hikeLength,
  hikeType,
  isSwimmable,
  isDogFriendly,
  slug,
}: WaterfallCardProps) {
  return (
    <Link href={slug} className="bg-white rounded-lg shadow-md overflow-hidden block">
      <div className="relative h-48">
        <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{location}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-gray-200 rounded-full px-3 py-1">{difficulty}</span>
          <span className="bg-gray-200 rounded-full px-3 py-1">{hikeLength}km {hikeType}</span>
          {isSwimmable && <span className="bg-green-200 rounded-full px-3 py-1">Swimming</span>}
          {isDogFriendly && <span className="bg-blue-200 rounded-full px-3 py-1">Dog Friendly</span>}
        </div>
      </div>
    </Link>
  );
}
