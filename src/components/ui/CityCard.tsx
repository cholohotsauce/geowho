import React from 'react';
import { GameCard, Deck } from '../../types';
import { Badge } from './Badge';
import { cn } from './Button';

// Defined outside the component so it's created once, not on every render.
// Tailwind requires complete class strings in the source — dynamic values like
// `bg-${color}-50` get purged at build time, so we map each color explicitly.
const colorClasses: Record<string, string> = {
  blue:    'bg-blue-50 text-blue-700 border-blue-200',
  indigo:  'bg-indigo-50 text-indigo-700 border-indigo-200',
  cyan:    'bg-cyan-50 text-cyan-700 border-cyan-200',
  orange:  'bg-orange-50 text-orange-700 border-orange-200',
  purple:  'bg-purple-50 text-purple-700 border-purple-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber:   'bg-amber-50 text-amber-700 border-amber-200',
  teal:    'bg-teal-50 text-teal-700 border-teal-200',
};

interface GameCardUIProps {
  card: GameCard;
  deck: Deck;
  eliminated?: boolean;
  onClick?: () => void;
}

export function GameCardUI({ card, deck, eliminated = false, onClick }: GameCardUIProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border p-4 transition-all duration-200',
        eliminated 
          ? 'border-slate-200 bg-slate-50 opacity-40 grayscale pointer-events-none' 
          : 'border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer'
      )}
    >
      <div className="mb-3">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">{card.name}</h3>
        <p className="text-sm text-slate-500 font-medium">{card.subtitle}</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {deck.attributeConfigs.map(config => {
          const value = card.attributes[config.key];
          const displayValue = config.valueFormat ? config.valueFormat(value) : value;
          
          if (displayValue === undefined || displayValue === null || displayValue === '') return null;

          const Icon = config.icon;
          
          return (
            <Badge 
              key={config.key}
              variant="outline" 
              className={cn(colorClasses[config.color] || 'bg-slate-50 text-slate-700 border-slate-200', 'flex items-center gap-1')}
            >
              <Icon className="w-3 h-3" /> {displayValue}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
