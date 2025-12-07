import React, { useState } from 'react';
import { Rocket, Users, Target, Trophy } from 'lucide-react';

const WelcomeModal = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name: name.trim() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {step === 1 ? (
          <>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Rocket size={40} />
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome to DSA Cracker</h1>
              <p className="text-violet-200">Master Data Structures & Algorithms together</p>
            </div>
            
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="text-violet-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Track Your Progress</h3>
                    <p className="text-sm text-gray-500">Mark problems as complete and watch your mastery grow</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Study Group Features</h3>
                    <p className="text-sm text-gray-500">Export & share progress with your study group</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Trophy className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Stay Accountable</h3>
                    <p className="text-sm text-gray-500">Streaks, weekly goals, and leaderboards</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200"
              >
                Get Started
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={40} />
              </div>
              <h1 className="text-2xl font-bold mb-2">What should we call you?</h1>
              <p className="text-violet-200">Your name will appear on the leaderboard</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-lg"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Start Learning
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomeModal;

