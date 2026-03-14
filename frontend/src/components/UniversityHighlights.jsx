import React from 'react';

// simple static list of top universities with placeholder images
const PUBLIC_UNIS = [
  {
    name: 'University of Nairobi',
    img: 'https://source.unsplash.com/400x250/?university,nairobi',
  },
  {
    name: 'Kenyatta University',
    img: 'https://source.unsplash.com/400x250/?university,kenyatta',
  },
  {
    name: 'Moi University',
    img: 'https://source.unsplash.com/400x250/?university,moi',
  },
  {
    name: 'JKUAT',
    img: 'https://source.unsplash.com/400x250/?university,jkuat',
  },
  {
    name: 'Egerton University',
    img: 'https://source.unsplash.com/400x250/?university,egerton',
  },
];

const PRIVATE_UNIS = [
  {
    name: 'Strathmore University',
    img: 'https://source.unsplash.com/400x250/?university,strathmore',
  },
  {
    name: 'Kenya Methodist University',
    img: 'https://source.unsplash.com/400x250/?university,methodist',
  },
  {
    name: 'Catholic University of Eastern Africa',
    img: 'https://source.unsplash.com/400x250/?university,catholic',
  },
  {
    name: 'USIU-Africa',
    img: 'https://source.unsplash.com/400x250/?university,usiu',
  },
  {
    name: 'Daystar University',
    img: 'https://source.unsplash.com/400x250/?university,daystar',
  },
];

export default function UniversityHighlights() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Universities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--kuccps-red)' }}>Best Public Universities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PUBLIC_UNIS.map((uni) => (
              <div key={uni.name} className="rounded-lg overflow-hidden shadow-md">
                <img src={uni.img} alt={uni.name} className="w-full h-32 object-cover" />
                <p className="p-2 text-center font-medium text-gray-700">{uni.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-purple-600 mb-2">Best Private Universities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRIVATE_UNIS.map((uni) => (
              <div key={uni.name} className="rounded-lg overflow-hidden shadow-md">
                <img src={uni.img} alt={uni.name} className="w-full h-32 object-cover" />
                <p className="p-2 text-center font-medium text-gray-700">{uni.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
