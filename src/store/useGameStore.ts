import { create } from 'zustand';
import { GameCard, Question, GameStats, AskedQuestion, Deck } from '../types';
import { allDecks } from '../data/decks';
import { getNewEliminatedIds } from '../utils/gameLogic';

// This interface defines the shape of our game state —
// all the data the app needs to track, plus all the actions that can change it.
interface GameState {
  decks: Deck[];             // All available card decks the player can choose from
  selectedDeckId: string;    // The ID of whichever deck is currently selected
  secretCard: GameCard | null; // The card the player is trying to guess (null before a game starts)
  eliminatedCardIds: Set<string>; // IDs of cards that have been ruled out by questions
  askedQuestions: AskedQuestion[]; // History of every question asked and its yes/no answer
  gameState: 'start' | 'playing' | 'won' | 'lost'; // Which phase of the game we are in
  stats: GameStats;          // All-time win/loss record, loaded from localStorage

  selectDeck: (deckId: string) => void;
  startGame: () => void;
  askQuestion: (question: Question) => void;
  guessCard: (cardId: string) => void;
  resetGame: () => void;
}

// Reads the player's saved stats from the browser's localStorage.
// If no stats have been saved yet, it returns a fresh record with all zeros.
const loadStats = (): GameStats => {
  const s = localStorage.getItem('geoWhoStats');
  return s ? JSON.parse(s) : { gamesPlayed: 0, wins: 0, losses: 0 };
};

// Saves the player's stats to localStorage so they persist between sessions.
const saveStats = (stats: GameStats) => {
  localStorage.setItem('geoWhoStats', JSON.stringify(stats));
};

// create() from Zustand builds our global store.
// 'set' is used to update state. 'get' is used to read the current state inside an action.
export const useGameStore = create<GameState>((set, get) => ({
  // --- Initial state ---
  decks: allDecks,                        // Load all decks from our data file
  selectedDeckId: allDecks[0].id,         // Default to the first deck
  secretCard: null,                       // No secret card until a game starts
  eliminatedCardIds: new Set(),           // Empty set — no cards eliminated yet
  askedQuestions: [],                     // No questions asked yet
  gameState: 'start',                     // App opens on the start screen
  stats: loadStats(),                     // Pull saved stats from localStorage on startup

  // Updates which deck the player has selected.
  selectDeck: (deckId: string) => set({ selectedDeckId: deckId }),

  // Picks a random card from the selected deck as the secret, then resets all
  // in-game state (eliminations, questions, hints) and transitions to 'playing'.
  startGame: () => {
    const { decks, selectedDeckId } = get();
    const deck = decks.find(d => d.id === selectedDeckId) || decks[0];

    // Pick a random card — this is the answer the player is trying to guess.
    const secretCard = deck.cards[Math.floor(Math.random() * deck.cards.length)];

    set({
      secretCard,
      eliminatedCardIds: new Set(), // Clear any leftover eliminations from a previous game
      askedQuestions: [],           // Clear question history
      gameState: 'playing'
    });
  },

  // Processes a question the player has asked.
  // Checks the secret card to get a yes/no answer, then calls getNewEliminatedIds
  // to work out which cards are now ruled out.
  askQuestion: (question: Question) => {
    const { secretCard, decks, selectedDeckId, eliminatedCardIds, askedQuestions } = get();
    if (!secretCard) return;

    const deck = decks.find(d => d.id === selectedDeckId) || decks[0];

    // Check whether the secret card matches the question's value — this is the answer.
    const answer = secretCard.attributes[question.attribute] === question.value;

    set({
      eliminatedCardIds: getNewEliminatedIds(deck.cards, eliminatedCardIds, question, answer),
      // Append this question and its answer to the history log.
      askedQuestions: [...askedQuestions, { question, answer }]
    });
  },

  // Called when the player taps a card to make their final guess.
  // Checks if it matches the secret card, updates win/loss stats, and ends the game.
  guessCard: (cardId: string) => {
    const { secretCard, stats } = get();
    if (!secretCard) return;

    // true if the player guessed correctly, false if they got it wrong.
    const isWin = secretCard.id === cardId;

    const newStats = {
      ...stats,                                      // Keep all existing stat fields
      gamesPlayed: stats.gamesPlayed + 1,            // Always increment games played
      wins: stats.wins + (isWin ? 1 : 0),            // Add a win only if correct
      losses: stats.losses + (isWin ? 0 : 1)         // Add a loss only if incorrect
    };

    // Persist the updated stats to localStorage immediately.
    saveStats(newStats);

    set({
      gameState: isWin ? 'won' : 'lost',
      stats: newStats
    });
  },

  // Resets all in-game state back to defaults so the player can return to the start screen.
  // Does NOT clear the all-time stats — those persist in localStorage.
  resetGame: () => {
    set({ gameState: 'start', secretCard: null, eliminatedCardIds: new Set(), askedQuestions: [] });
  }
}));
