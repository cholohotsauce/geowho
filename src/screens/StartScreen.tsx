import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import { Globe2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function StartScreen() {
  const { startGame, stats, decks } = useGameStore();
  const navigate = useNavigate();

  const handleStart = () => {
    startGame();
    navigate('/play');
  };

  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center space-y-8">
        <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
          <Globe2 className="w-10 h-10 text-indigo-600" />
        </div>
        
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">GeoWho?</h1>
          <p className="text-slate-500 text-lg">The geographic guessing game.</p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Your Stats</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-slate-900">{stats.gamesPlayed}</div>
              <div className="text-xs text-slate-500 font-medium">Played</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">{stats.wins}</div>
              <div className="text-xs text-slate-500 font-medium">Wins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">{winRate}%</div>
              <div className="text-xs text-slate-500 font-medium">Win Rate</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="text-sm font-medium text-slate-500">Deck: World Capitals ({decks[0]?.cards.length || 0} cities)</div>
          <Button size="lg" className="w-full text-lg shadow-md" onClick={handleStart}>
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
}
