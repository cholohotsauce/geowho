import React from 'react';
import { Button } from './ui/Button';
import { HelpCircle, Target } from 'lucide-react';

interface ActionBarProps {
  isGuessMode: boolean;
  onAsk: () => void;
  onGuess: () => void;
  onCancelGuess: () => void;
}

export function ActionBar({ isGuessMode, onAsk, onGuess, onCancelGuess }: ActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-safe">
      <div className="max-w-md mx-auto flex gap-3">
        {isGuessMode ? (
          <>
            <Button variant="outline" className="flex-1" onClick={onCancelGuess}>
              Cancel Guess
            </Button>
            <div className="flex-1 flex items-center justify-center text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl">
              Tap a card to guess
            </div>
          </>
        ) : (
          <>
            <Button className="flex-1" onClick={onAsk}>
              <HelpCircle className="w-4 h-4 mr-2" /> Ask
            </Button>
            <Button variant="secondary" className="flex-1" onClick={onGuess}>
              <Target className="w-4 h-4 mr-2" /> Guess
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
