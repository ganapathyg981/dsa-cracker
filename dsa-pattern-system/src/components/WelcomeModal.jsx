import React, { useState } from 'react';
import { Rocket, Users, Target, Trophy, UserPlus, LogIn, ChevronDown, Loader2, AlertCircle, RefreshCw, Eye, EyeOff, Lock } from 'lucide-react';
import { getAllUsers, createUserGist, getUserProgress, verifyUserPassword, isConfigured } from '../services/gistService';

const WelcomeModal = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [availableUsers, setAvailableUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);

  const loadUsers = async () => {
    if (loadingUsers) return;
    setLoadingUsers(true);
    setError(null);
    setUsersLoaded(false);
    try {
      const users = await getAllUsers();
      setAvailableUsers(users);
      setUsersLoaded(true);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error(err);
      setUsersLoaded(false);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleReturningUserClick = async () => {
    setMode('returning');
    setStep(2);
    setPassword('');
    // Always load users when going to returning user screen
    // Set loading state synchronously before async operation
    if (!usersLoaded) {
      setLoadingUsers(true);
      try {
        const users = await getAllUsers();
        setAvailableUsers(users);
        setUsersLoaded(true);
      } catch (err) {
        setError('Failed to load users. Please try again.');
        console.error(err);
      } finally {
        setLoadingUsers(false);
      }
    }
  };

  const handleNewUser = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createUserGist(name.trim(), password);
      
      onComplete({
        userId: result.userId,
        gistId: result.gistId,
        name: result.profile.name,
        profile: result.profile,
        progress: result.progress,
        goals: result.goals,
        isNewUser: true,
      });
    } catch (err) {
      setError(err.message || 'Failed to create user. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturningUser = async () => {
    if (!selectedUserId) return;
    
    const user = availableUsers[selectedUserId];
    
    // Check if user has password protection
    const userHasPassword = user.hasPassword !== false;
    
    if (userHasPassword && !password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Only verify password if user has one set
      if (userHasPassword && password) {
        const isValid = await verifyUserPassword(selectedUserId, password);
        
        if (!isValid) {
          setError('Incorrect password');
          setLoading(false);
          return;
        }
      }

      const progressData = await getUserProgress(selectedUserId);
      
      onComplete({
        userId: selectedUserId,
        gistId: user.gistId,
        name: user.displayName,
        profile: progressData.profile,
        progress: progressData.progress,
        goals: progressData.goals,
        isNewUser: false,
      });
    } catch (err) {
      setError(err.message || 'Failed to load user data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isConfigured()) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-3 sm:p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
          <div className="bg-gradient-to-br from-red-500 to-orange-600 p-5 sm:p-8 text-white text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <AlertCircle size={32} className="sm:w-10 sm:h-10" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">Configuration Required</h1>
            <p className="text-red-100 text-sm sm:text-base">GitHub token not configured</p>
          </div>
          <div className="p-5 sm:p-8">
            <p className="text-gray-600 mb-4">
              To use DSA Cracker, please configure the <code className="bg-gray-100 px-2 py-1 rounded text-sm">VITE_GITHUB_TOKEN</code> environment variable with a GitHub Personal Access Token that has the <strong>gist</strong> scope.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Note:</strong> This app requires a GitHub token to store your progress in GitHub Gists.
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Cloud Sync & Study Groups</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Progress synced to cloud, collaborate with study groups</p>
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
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setMode('new');
                    setStep(2);
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
                >
                  <UserPlus size={20} />
                  I'm New Here
                </button>
                
                <button
                  onClick={handleReturningUserClick}
                  className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn size={20} />
                  I Have an Account
                </button>
              </div>
            </div>
          </>
        ) : mode === 'new' ? (
          <>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 sm:p-8 text-white text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <UserPlus size={32} className="sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">Create Your Profile</h1>
              <p className="text-violet-200 text-sm sm:text-base">Set up your account with a password</p>
            </div>
            
            <form onSubmit={handleNewUser} className="p-5 sm:p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-base"
                  autoFocus
                  disabled={loading}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password..."
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-base"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="mb-5 sm:mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password..."
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-base"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Password must be at least 4 characters
                </p>
              </div>
              
              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setMode(null);
                    setError(null);
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  disabled={loading}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all text-sm sm:text-base disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!name.trim() || !password || loading}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 sm:p-8 text-white text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <LogIn size={32} className="sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">Welcome Back!</h1>
              <p className="text-violet-200 text-sm sm:text-base">Select your profile and enter password</p>
            </div>
            
            <div className="p-5 sm:p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Profile
                </label>
                
                {loadingUsers ? (
                  <div className="flex items-center justify-center py-8 text-gray-500">
                    <Loader2 size={24} className="animate-spin mr-2" />
                    Loading users...
                  </div>
                ) : !usersLoaded ? (
                  <div className="text-center py-8">
                    <AlertCircle size={40} className="mx-auto mb-2 text-amber-400" />
                    <p className="text-gray-500 mb-3">Failed to load users</p>
                    <button
                      onClick={loadUsers}
                      className="inline-flex items-center gap-2 text-violet-600 font-medium hover:underline"
                    >
                      <RefreshCw size={16} />
                      Try again
                    </button>
                  </div>
                ) : Object.keys(availableUsers).length === 0 ? (
                  <div className="text-center py-8">
                    <Users size={40} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-gray-500 mb-2">No users found</p>
                    <button
                      onClick={() => {
                        setMode('new');
                        setError(null);
                      }}
                      className="text-violet-600 font-medium hover:underline"
                    >
                      Create a new account instead
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <select
                      value={selectedUserId}
                      onChange={(e) => {
                        setSelectedUserId(e.target.value);
                        setError(null);
                      }}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-base appearance-none bg-white"
                      disabled={loading}
                    >
                      <option value="">Choose your profile...</option>
                      {Object.entries(availableUsers).map(([userId, user]) => (
                        <option key={userId} value={userId}>
                          {user.displayName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                )}
              </div>

              {selectedUserId && usersLoaded && availableUsers[selectedUserId]?.hasPassword !== false && (
                <div className="mb-5 sm:mb-6">
                  <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="loginPassword"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                      }}
                      placeholder="Enter your password..."
                      className="w-full pl-10 pr-10 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-base"
                      disabled={loading}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && password) {
                          handleReturningUser();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setMode(null);
                    setError(null);
                    setSelectedUserId('');
                    setPassword('');
                  }}
                  disabled={loading}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all text-sm sm:text-base disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleReturningUser}
                  disabled={!selectedUserId || (availableUsers[selectedUserId]?.hasPassword !== false && !password) || loading}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Don't see your name?{' '}
                  <button
                    onClick={() => {
                      setMode('new');
                      setError(null);
                      setPassword('');
                    }}
                    className="text-violet-600 font-medium hover:underline"
                  >
                    Create a new account
                  </button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomeModal;
