import React from 'react';
import { Sparkles } from 'lucide-react';

const Menu = ({ topics, onTopicSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-yellow-500" size={40} />
            <h1 className="text-5xl font-bold text-gray-800">DSA Pattern Decision System</h1>
          </div>
          <p className="text-xl text-gray-600">Answer questions to find the exact pattern you need</p>
          <p className="text-lg text-gray-500 mt-2">Based on NeetCode roadmap • 100% FAANG coverage</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onTopicSelect(topic.id)}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-400"
            >
              <div className="text-5xl mb-4">{topic.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{topic.label}</h3>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 How to Use This System</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="font-semibold mb-1">Pick a Topic</h3>
              <p className="text-sm text-gray-600">Choose the data structure you&apos;re working with</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="font-semibold mb-1">Answer Questions</h3>
              <p className="text-sm text-gray-600">Follow the decision tree based on your problem</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="font-semibold mb-1">Get Pattern + Code</h3>
              <p className="text-sm text-gray-600">Receive template and practice problems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

