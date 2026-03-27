import { GameCard, Question, Deck } from '../types';

// Takes the current set of eliminated card IDs and a question + answer,
// then returns a new set with any additional cards that are now ruled out.
// A card is eliminated if its answer to the question differs from the secret card's answer.
export function getNewEliminatedIds(
  cards: GameCard[],
  eliminatedCardIds: Set<string>,
  question: Question,
  answer: boolean
): Set<string> {
  // Copy the existing set — Zustand requires a new object to detect a state change.
  const newEliminated = new Set(eliminatedCardIds);
  cards.forEach(card => {
    if ((card.attributes[question.attribute] === question.value) !== answer) {
      newEliminated.add(card.id);
    }
  });
  return newEliminated;
}

// Looks at the deck's attribute configs and builds a list of every possible
// yes/no question the player can ask during the game.
export function generateQuestions(deck: Deck): Question[] {
  const questions: Question[] = [];

  deck.attributeConfigs.forEach(config => {
    if (config.type === 'boolean') {
      // Boolean attributes (e.g. coastal: true/false) produce exactly two questions.
      questions.push({ id: `${config.key}_true`, text: config.questionFormat(true), attribute: config.key, value: true });
      questions.push({ id: `${config.key}_false`, text: config.questionFormat(false), attribute: config.key, value: false });
    } else {
      // String attributes (e.g. continent) produce one question per unique value found in the deck.
      // Array.from(new Set(...)) collects all values and removes duplicates,
      // so we get one question per continent rather than one per city.
      const uniqueValues = Array.from(new Set(deck.cards.map(c => c.attributes[config.key])));
      uniqueValues.forEach(val => {
        questions.push({ id: `${config.key}_${val}`, text: config.questionFormat(val), attribute: config.key, value: val });
      });
    }
  });

  return questions;
}
