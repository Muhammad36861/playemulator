import React, { useState, useEffect, useMemo } from 'react';
import { LogIn, Gamepad, Folder, Controller, Power, Settings, ChevronLeft, Search, Wifi } from 'lucide-react';

// === MOCK DATA ===
const mockLocalGames = [
  { id: 'l1', title: 'Cyberpunk 2077 (Local)', path: 'C:/Games/CP77', genre: 'RPG' },
  { id: 'l2', title: 'The Witcher 3 (Local)', path: 'C:/Games/Witcher3', genre: 'RPG' },
  { id: 'l3', title: 'Hades (Local)', path: 'C:/Games/Hades', genre: 'Roguelite' },
];

const mockSteamGames = [
  { id: 's1', title: 'Dota 2', playtime: 500, genre: 'MOBA' },
  { id: 's2', title: 'Apex Legends', playtime: 200, genre: 'FPS' },
  { id: 's3', title: 'Terraria', playtime: 120, genre: 'Sandbox' },
];

const App = () => {
  // State for user session (mocked)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [steamConnected, setSteamConnected] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [isStreaming, setIsStreaming] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulates a loading state for a game launch
  const [launchingGame, setLaunchingGame] = useState(null);

  // Filtered lists for the library view
  const filteredLocalGames = useMemo(() => {
    return mockLocalGames.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredSteamGames = useMemo(() => {
    return mockSteamGames.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Handler for connecting to the PC and starting the game
  const handleLaunchGame = (gameTitle) => {
    setLaunchingGame(gameTitle);
    setIsStreaming(true);

    // In a real Android app:
    // 1. Establish secure network connection (WebSockets/UDP) to PC companion app.
    // 2. Send command to PC to launch the game executable or Steam link.
    // 3. Start receiving video stream (e.g., using WebRTC or custom video codec).
    // 4. Begin sending control inputs (Android buttons/touch events).

    setTimeout(() => {
      // After a simulated delay, assume streaming has started
      console.log(`Successfully launched and streaming: ${gameTitle}`);
      setLaunchingGame(null);
    }, 2000);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    console.log('Streaming session terminated.');
  };

  // --- Utility Components ---

  const Header = ({ title, showBack = false }) => (
    <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700 text-white shadow-md">
      <div className="flex items-center space-x-2">
        {showBack && (
          <button onClick={() => setCurrentScreen('Home')} className="p-2 rounded-full hover:bg-gray-700">
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex space-x-3 items-center">
          <Wifi size={18} className="text-green-400" />
          <Settings size={20} onClick={() => setCurrentScreen('Settings')} className="cursor-pointer hover:text-blue-400" />
      </div>
    </div>
  );

  const GameCard = ({ game, source, onClick }) => (
    <div
      onClick={onClick}
      className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-40"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white truncate">{game.title}</h2>
        {source === 'Steam' ? <Controller size={20} className="text-gray-400" /> : <Folder size={20} className="text-gray-400" />}
      </div>
      <p className="text-sm text-gray-400 mt-1">{game.genre}</p>
      <div className="mt-4">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-150"
          disabled={!!launchingGame}
        >
          {launchingGame === game.title ? 'Connecting...' : 'Play'}
        </button>
      </div>
    </div>
  );

  // --- Screen Components ---

  const HomeScreen = () => (
    <div className="p-4 space-y-6">
      <div className="p-5 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-extrabold text-green-400 mb-2">GameHub Status</h2>
        <p className="text-gray-300 flex items-center">
          <Power size={18} className="mr-2 text-red-500" />
          PC Companion App: <span className="font-semibold text-red-400 ml-1">Offline</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          (A real-time connection check to your designated gaming PC would happen here.)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setCurrentScreen('SteamLibrary')}
          className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition duration-200 shadow-md h-32"
        >
          <Controller size={32} className="text-white mb-2" />
          <span className="text-white font-medium">Steam Library</span>
          <span className="text-xs text-gray-400 mt-1">({mockSteamGames.length} Games)</span>
        </button>

        <button
          onClick={() => setCurrentScreen('LocalLibrary')}
          className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition duration-200 shadow-md h-32"
        >
          <Folder size={32} className="text-white mb-2" />
          <span className="text-white font-medium">Local PC Games</span>
          <span className="text-xs text-gray-400 mt-1">({mockLocalGames.length} Games)</span>
        </button>
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-bold text-white mb-4">Latest Activity</h2>
        <div className="space-y-3">
          <div className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
            <span className="text-gray-300">Played Cyberpunk 2077</span>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
            <span className="text-gray-300">Steam account synced</span>
            <span className="text-xs text-gray-500">5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const LibraryScreen = ({ title, games, source }) => (
    <div className="p-4 space-y-4">
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${title}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {games.length > 0 ? (
          games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              source={source}
              onClick={() => handleLaunchGame(game.title)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">No games found or library is empty.</p>
        )}
      </div>
    </div>
  );

  const StreamingScreen = ({ gameTitle }) => (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-2xl font-bold mb-4">{gameTitle}</h1>
      <p className="text-lg mb-8">Streaming Live from PC...</p>
      
      {/* This is where the video feed (e.g., WebRTC canvas) would be rendered,
        and touch overlay controls for the Android device would be placed.
        
        Example Android Control Button (A-Button equivalent):
      */}
      <div className="absolute bottom-5 right-5 z-10">
        <button className="w-16 h-16 bg-red-600 rounded-full shadow-2xl flex items-center justify-center font-bold text-2xl opacity-75 active:opacity-100 transition-opacity">
          A
        </button>
      </div>

      <button
        onClick={handleStopStream}
        className="absolute top-5 left-5 bg-red-600 text-white p-3 rounded-xl flex items-center space-x-2 shadow-lg hover:bg-red-700 transition"
      >
        <Power size={20} />
        <span>End Stream</span>
      </button>
    </div>
  );

  // --- Main Render Logic ---

  if (isStreaming) {
    return <StreamingScreen gameTitle={launchingGame || 'Your Game'} />;
  }

  let screenContent;
  let headerTitle;
  let showBack = true;

  switch (currentScreen) {
    case 'Home':
      screenContent = <HomeScreen />;
      headerTitle = 'GameHub';
      showBack = false;
      break;
    case 'SteamLibrary':
      screenContent = <LibraryScreen title="Steam" games={filteredSteamGames} source="Steam" />;
      headerTitle = 'Steam Library';
      break;
    case 'LocalLibrary':
      screenContent = <LibraryScreen title="Local PC Games" games={filteredLocalGames} source="Local" />;
      headerTitle = 'Local PC Games';
      break;
    case 'Settings':
      screenContent = (
        <div className="p-4 space-y-6">
          <h2 className="text-2xl font-bold text-white">Application Settings</h2>
          <div className="bg-gray-800 p-4 rounded-xl space-y-3">
            <h3 className="text-xl text-white font-semibold">Account Linking</h3>
            <button
              onClick={() => setSteamConnected(!steamConnected)}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition duration-150 ${
                steamConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              <Controller size={20} className="mr-2" />
              {steamConnected ? 'Steam Connected (Disconnect)' : 'Connect Steam Account'}
            </button>
            <p className="text-sm text-gray-400">
              Note: Connecting Steam requires an API key and a trusted connection to your PC.
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl space-y-3">
            <h3 className="text-xl text-white font-semibold">PC Connection</h3>
            <p className="text-gray-300">PC IP Address: 192.168.1.100</p>
            <p className="text-gray-300">Status: <span className="text-red-400">Disconnected</span></p>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-150">
              Test Connection
            </button>
          </div>
        </div>
      );
      headerTitle = 'Settings';
      break;
    default:
      screenContent = <HomeScreen />;
      headerTitle = 'GameHub';
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col font-sans">
      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Main App Container */}
      <div className="max-w-md mx-auto w-full min-h-screen border-x border-gray-700 shadow-2xl flex flex-col">
        <Header title={headerTitle} showBack={showBack} />
        <main className="flex-grow overflow-y-auto pb-20">
          {screenContent}
        </main>

        {/* Mock Android Navigation/Controls Footer - Stays fixed on screen */}
        <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-gray-900 border-t border-gray-700 p-3 flex justify-around shadow-inner-top">
          <button onClick={() => setCurrentScreen('Home')} className="flex flex-col items-center text-sm transition duration-150 transform hover:scale-105">
            <Gamepad size={24} className={currentScreen === 'Home' ? 'text-green-400' : 'text-gray-500'} />
            <span className={currentScreen === 'Home' ? 'text-green-400' : 'text-gray-500'}>Home</span>
          </button>
          <button onClick={() => setCurrentScreen('LocalLibrary')} className="flex flex-col items-center text-sm transition duration-150 transform hover:scale-105">
            <Folder size={24} className={currentScreen === 'LocalLibrary' ? 'text-green-400' : 'text-gray-500'} />
            <span className={currentScreen === 'LocalLibrary' ? 'text-green-400' : 'text-gray-500'}>Local</span>
          </button>
          <button onClick={() => setCurrentScreen('Settings')} className="flex flex-col items-center text-sm transition duration-150 transform hover:scale-105">
            <Settings size={24} className={currentScreen === 'Settings' ? 'text-green-400' : 'text-gray-500'} />
            <span className={currentScreen === 'Settings' ? 'text-green-400' : 'text-gray-500'}>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
