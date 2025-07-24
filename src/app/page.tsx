import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Go Chase Waterfalls</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your ultimate guide to discovering the most beautiful waterfalls.
      </p>
      <Link 
        href="/waterfalls/australia/nsw/blue-mountains" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Explore the Blue Mountains
      </Link>
    </div>
  );
}
