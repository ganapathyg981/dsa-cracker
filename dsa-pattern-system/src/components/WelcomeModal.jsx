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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[92vh] overflow-y-auto">
        {step === 1 ? (
          <>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 sm:p-8 text-white text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Rocket size={32} className="sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">Welcome to DSA Cracker</h1>
              <p className="text-violet-200 text-sm sm:text-base">Master Data Structures & Algorithms together</p>
            </div>
            
            <div className="p-5 sm:p-8">
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="text-violet-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Track Your Progress</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Mark problems as complete and watch your mastery grow</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-emerald-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Study Group Features</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Export & share progress with your study group</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Trophy className="text-amber-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Stay Accountable</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Streaks, weekly goals, and leaderboards</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setStep(2)}
                className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 sm:p-8 text-white text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users size={32} className="sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">What should we call you?</h1>
              <p className="text-violet-200 text-sm sm:text-base">Your name will appear on the leaderboard</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 sm:p-8">
              <div className="mb-5 sm:mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-base sm:text-lg"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-sm sm:text-base"
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

