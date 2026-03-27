import { Globe, MapPin, Droplets, ThermometerSun, Users, Coins, Crown, Waves } from 'lucide-react';
import { Deck } from '../types';
import { defaultCities } from './cities';

// This file defines the "World Capitals" deck — the only deck in the game.
// Each entry in attributeConfigs describes one attribute that cities can have.
// It tells the game: what the attribute is called, how to display it as a badge,
// and how to turn it into a question the player can ask.
export const capitalsDeck: Deck = {
  id: 'capitals',
  name: 'World Capitals',
  description: 'Guess the capital city based on geography and demographics.',
  icon: Globe,
  attributeConfigs: [
    // 'questionFormat' is a function stored inside the config object.
    // It takes the attribute's value and returns the question text shown to the player.
    // For example: questionFormat('Europe') → "Is it in Europe?"
    { key: 'continent',       label: 'Continent',  icon: Globe,          color: 'blue',    type: 'string',  questionFormat: v => `Is it in ${v}?` },
    { key: 'hemisphere',      label: 'Hemisphere', icon: MapPin,         color: 'indigo',  type: 'string',  questionFormat: v => `Is it in the ${v} hemisphere?` },
    { key: 'coastal',         label: 'Coastal',    icon: Droplets,       color: 'cyan',    type: 'boolean', questionFormat: v => v ? 'Is it coastal?' : 'Is it landlocked?',             valueFormat: v => v ? 'Coastal' : 'Landlocked' },
    { key: 'climateZone',     label: 'Climate',    icon: ThermometerSun, color: 'orange',  type: 'string',  questionFormat: v => `Does it have a ${v} climate?` },
    { key: 'populationBucket',label: 'Population', icon: Users,          color: 'purple',  type: 'string',  questionFormat: v => `Is the population ${v}?` },
    { key: 'usesEuro',        label: 'Euro',       icon: Coins,          color: 'emerald', type: 'boolean', questionFormat: v => v ? 'Does it use the Euro?' : 'Does it not use the Euro?', valueFormat: v => v ? 'Euro' : 'No Euro' },
    { key: 'hasMonarchy',     label: 'Monarchy',   icon: Crown,          color: 'amber',   type: 'boolean', questionFormat: v => v ? 'Does it have a monarchy?' : 'Is it a republic/no monarchy?', valueFormat: v => v ? 'Monarchy' : 'No Monarchy' },
    { key: 'isIsland',        label: 'Island',     icon: Waves,          color: 'teal',    type: 'boolean', questionFormat: v => v ? 'Is it on an island?' : 'Is it on the mainland?',    valueFormat: v => v ? 'Island' : 'Mainland' },
  ],
  // Map each raw city object from cities.ts into the GameCard shape the game expects.
  cards: defaultCities.map(c => ({
    id: c.id,
    name: c.name,
    subtitle: c.country,
    attributes: {
      continent:       c.continent,
      hemisphere:      c.hemisphere,
      coastal:         c.coastal,
      climateZone:     c.climateZone,
      populationBucket:c.populationBucket,
      usesEuro:        c.usesEuro,
      hasMonarchy:     c.hasMonarchy,
      isIsland:        c.isIsland
    }
  }))
};

// allDecks is the list the store loads on startup.
// Adding a new deck later is as simple as creating it above and adding it to this array.
export const allDecks: Deck[] = [capitalsDeck];
