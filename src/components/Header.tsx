
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Go Chase Waterfalls
        </Link>
      </div>
    </header>
  );
}
