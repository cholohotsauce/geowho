import React from 'react';
// motion and AnimatePresence are from the Framer Motion library.
// They handle the card animations — sliding in when added, fading out when eliminated,
// and smoothly reordering the grid when cards move. No animation logic is written manually.
import { motion, AnimatePresence } from 'motion/react';
import { GameCard, Deck } from '../types';
import { GameCardUI } from './ui/CityCard';

interface GameBoardProps {
  cards: GameCard[];
  deck: Deck;
  eliminatedCardIds: Set<string>;
  onCardClick: (cardId: string) => void;
}

export function GameBoard({ cards, deck, eliminatedCardIds, onCardClick }: GameBoardProps) {
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto pb-24">
      <AnimatePresence mode="popLayout">
        {cards.map(card => {
          const eliminated = eliminatedCardIds.has(card.id);
          return (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
            >
              <GameCardUI 
                card={card} 
                deck={deck}
                eliminated={eliminated} 
                onClick={() => onCardClick(card.id)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
