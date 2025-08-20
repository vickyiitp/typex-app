
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import Footer from './components/Footer';
import LevelSelector from './components/LevelSelector';
import Tutorial from './components/Tutorial';
import WorldwideStats from './components/WorldwideStats';
import { AppView, GameStats, Level, WorldwideStatsData } from './types';
import { TEXT_LEVELS, INITIAL_WORLDWIDE_STATS } from './constants';
import { getWorldwideStats, saveWorldwideStats } from './services/database';


interface ChallengeConfig {
  text: string;
  duration: number;
  difficulty: Level['difficulty'];
}

interface CustomTestConfig {
  text: string;
  duration: number;
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [view, setView] = useState<AppView>('levelSelector');
  const [gameStats, setGameStats] = useState<GameStats>({ wpm: 0, accuracy: 0, time: 0, errors: 0 });
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [challengeConfig, setChallengeConfig] = useState<ChallengeConfig | null>(null);
  const [customTestConfig, setCustomTestConfig] = useState<CustomTestConfig | null>(null);
  const [worldwideStats, setWorldwideStats] = useState<WorldwideStatsData>(INITIAL_WORLDWIDE_STATS);
  
  useEffect(() => {
    // Load stats from the simulated database on app start.
    const loadStats = async () => {
        let stats = await getWorldwideStats();
        if (stats) {
            setWorldwideStats(stats);
        } else {
            // This is the first time the user is visiting in this browser.
            // Count them as a new user and save the initial state.
            const initialStats = { ...INITIAL_WORLDWIDE_STATS, totalUsers: 1 };
            setWorldwideStats(initialStats);
            await saveWorldwideStats(initialStats);
        }
    };
    loadStats();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const handleLevelSelect = useCallback((levelIndex: number) => {
    setCurrentLevel(levelIndex);
    setChallengeConfig(null);
    setCustomTestConfig(null);
    setView('typingTest');
  }, []);

  const handleStartChallenge = useCallback((text: string, duration: number, difficulty: Level['difficulty']) => {
    setCurrentLevel(null);
    setChallengeConfig({ text, duration, difficulty });
    setCustomTestConfig(null);
    setView('typingTest');
  }, []);
  
  const handleStartCustomTest = useCallback((text: string, duration: number) => {
    setCurrentLevel(null);
    setChallengeConfig(null);
    setCustomTestConfig({ text, duration });
    setView('typingTest');
  }, []);

  const handleTestFinish = useCallback(async (stats: GameStats) => {
    setGameStats(stats);
    
    // Update worldwide stats and save to the simulated database
    const updatedStats = ((prevStats: WorldwideStatsData) => {
        const newTotalTests = prevStats.totalTests + 1;
        const newAverageWpm = Math.round(((prevStats.averageWpm * prevStats.totalTests) + stats.wpm) / newTotalTests);
        const newAverageAccuracy = Math.round(((prevStats.averageAccuracy * prevStats.totalTests) + stats.accuracy) / newTotalTests);
        
        return {
            ...prevStats,
            totalTests: newTotalTests,
            averageWpm: newAverageWpm,
            averageAccuracy: newAverageAccuracy,
        };
    })(worldwideStats);

    setWorldwideStats(updatedStats);
    await saveWorldwideStats(updatedStats);

    setView('results');
  }, [worldwideStats]);

  const handleReturnToLevels = useCallback(() => {
    setView('levelSelector');
    setGameStats({ wpm: 0, accuracy: 0, time: 0, errors: 0 });
    setCurrentLevel(null);
    setChallengeConfig(null);
    setCustomTestConfig(null);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'tutorial':
        return <Tutorial />;
      case 'worldwideStats':
        return <WorldwideStats stats={worldwideStats} />;
      case 'results':
        return <Results stats={gameStats} onRestart={handleReturnToLevels} />;
      case 'typingTest': {
        const testProps = currentLevel !== null 
          ? { text: TEXT_LEVELS[currentLevel].text, duration: 60 }
          : challengeConfig 
          ? { text: challengeConfig.text, duration: challengeConfig.duration }
          : customTestConfig
          ? { text: customTestConfig.text, duration: customTestConfig.duration }
          : null;
        
        if (!testProps) {
          setView('levelSelector');
          return null;
        }
        return (
          <TypingTest
            onFinish={handleTestFinish}
            text={testProps.text}
            duration={testProps.duration}
            worldwideStats={worldwideStats}
          />
        );
      }
      case 'levelSelector':
      default:
        return <LevelSelector onSelectLevel={handleLevelSelect} onStartChallenge={handleStartChallenge} onStartCustomTest={handleStartCustomTest} onShowTutorial={() => setView('tutorial')} />;
    }
  };

  return (
    <div className="min-h-screen font-rajdhani text-cyber-text bg-white dark:bg-cyber-bg flex flex-col items-center justify-between p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre-v2.png')] opacity-20 dark:opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-bg via-transparent to-cyber-bg"></div>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} currentView={view} setView={setView} />
      
      <main className="w-full max-w-5xl z-10 flex-grow flex items-center justify-center py-8">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
