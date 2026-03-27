import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { AskedQuestion } from '../types';

interface QuestionLogProps {
  askedQuestions: AskedQuestion[];
}

export function QuestionLog({ askedQuestions }: QuestionLogProps) {
  if (askedQuestions.length === 0) return null;

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
        {askedQuestions.map((aq, i) => (
          <div key={i} className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border ${aq.answer ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            <span className="text-slate-700">{aq.question.text}</span>
            {aq.answer ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
          </div>
        ))}
      </div>
    </div>
  );
}
