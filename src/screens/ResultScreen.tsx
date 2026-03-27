import React from 'react';
import { Button } from '../components/ui/Button';
import { Target, X } from 'lucide-react';
import { GameCard, AskedQuestion } from '../types';

interface ResultScreenProps {
  gameState: 'won' | 'lost';
  secretCard: GameCard | null;
  askedQuestions: AskedQuestion[];
  onPlayAgain: () => void;
}

export function ResultScreen({ gameState, secretCard, askedQuestions, onPlayAgain }: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center space-y-6">
        <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${gameState === 'won' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
          {gameState === 'won' ? <Target className="w-12 h-12" /> : <X className="w-12 h-12" />}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {gameState === 'won' ? 'You got it!' : 'Game Over'}
          </h1>
          <p className="text-slate-600">
            The secret card was <span className="font-bold text-slate-900">{secretCard?.name}, {secretCard?.subtitle}</span>.
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 flex justify-around">
          <div>
            <div className="text-xl font-bold text-slate-900">{askedQuestions.length}</div>
            <div className="text-xs text-slate-500">Questions Asked</div>
          </div>
        </div>

        <Button size="lg" className="w-full" onClick={onPlayAgain}>
          Play Again
        </Button>
      </div>
    </div>
  );
}
