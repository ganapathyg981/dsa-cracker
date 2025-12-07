import React from 'react';
import { Sparkles } from 'lucide-react';

const ProTips = () => {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Sparkles className="text-yellow-500" size={20} />
        Pro Tips
      </h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>• Master one pattern before moving to the next</li>
        <li>• Practice 5-10 problems per pattern for muscle memory</li>
        <li>• Focus on recognizing patterns, not memorizing solutions</li>
        <li>• Time yourself: aim for 15-20 min per medium problem</li>
      </ul>
    </div>
  );
};

export default ProTips;

