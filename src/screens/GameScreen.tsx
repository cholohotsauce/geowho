import React, { useState, useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';
import { GameBoard } from '../components/GameBoard';
import { QuestionModal } from '../components/QuestionModal';
import { ActionBar } from '../components/ActionBar';
import { QuestionLog } from '../components/QuestionLog';
import { generateQuestions } from '../utils/gameLogic';
import { ResultScreen } from './ResultScreen';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function GameScreen() {
  const {
    decks, selectedDeckId, secretCard, eliminatedCardIds, askedQuestions,
    askQuestion, guessCard, gameState, resetGame
  } = useGameStore();
  const navigate = useNavigate();

  const deck = useMemo(() => decks.find(d => d.id === selectedDeckId) || decks[0], [decks, selectedDeckId]);
  const cards = deck.cards;

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isGuessMode, setIsGuessMode] = useState(false);

  const remainingCards = useMemo(() => cards.filter(c => !eliminatedCardIds.has(c.id)), [cards, eliminatedCardIds]);

  const sortedCards = useMemo(() => {
    return [...cards].sort((a, b) => {
      const aEliminated = eliminatedCardIds.has(a.id);
      const bEliminated = eliminatedCardIds.has(b.id);
      if (aEliminated === bEliminated) return 0;
      return aEliminated ? 1 : -1;
    });
  }, [cards, eliminatedCardIds]);

  const allQuestions = useMemo(() => generateQuestions(deck), [deck]);
  const availableQuestions = useMemo(() =>
    allQuestions.filter(q => !askedQuestions.some(aq => aq.question.id === q.id)),
  [allQuestions, askedQuestions]);

  React.useEffect(() => {
    if (gameState === 'start') {
      navigate('/');
    }
  }, [gameState, navigate]);

  if (gameState === 'start') {
    return null;
  }

  if (gameState === 'won' || gameState === 'lost') {
    return (
      <ResultScreen
        gameState={gameState}
        secretCard={secretCard}
        askedQuestions={askedQuestions}
        onPlayAgain={() => { resetGame(); navigate('/'); }}
      />
    );
  }

  const handleAskQuestion = (q: any) => {
    askQuestion(q);
    setIsQuestionModalOpen(false);
  };

  const handleCardClick = (cardId: string) => {
    if (isGuessMode) {
      guessCard(cardId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-3 flex items-center justify-between">
        <button onClick={() => { resetGame(); navigate('/'); }} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="text-sm font-bold text-slate-900">{remainingCards.length} Cards Left</div>
          <div className="text-xs text-slate-500">{askedQuestions.length} Questions Asked</div>
        </div>
        <div className="w-9" /> {/* Spacer */}
      </header>

      {/* Question Log */}
      <QuestionLog askedQuestions={askedQuestions} />

      {/* Board */}
      <main className="flex-1 p-4 overflow-y-auto">
        <GameBoard
          cards={sortedCards}
          deck={deck}
          eliminatedCardIds={eliminatedCardIds}
          onCardClick={handleCardClick}
        />
      </main>

      {/* Bottom Actions */}
      <ActionBar
        isGuessMode={isGuessMode}
        onAsk={() => setIsQuestionModalOpen(true)}
        onGuess={() => setIsGuessMode(true)}
        onCancelGuess={() => setIsGuessMode(false)}
      />

      {/* Question Modal */}
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        availableQuestions={availableQuestions}
        onAskQuestion={handleAskQuestion}
      />
    </div>
  );
}
