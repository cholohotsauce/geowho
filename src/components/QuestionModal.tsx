import React from 'react';
import { Button } from './ui/Button';
import { X } from 'lucide-react';
import { Question } from '../types';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableQuestions: Question[];
  onAskQuestion: (q: Question) => void;
}

export function QuestionModal({ isOpen, onClose, availableQuestions, onAskQuestion }: QuestionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">Ask a Question</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {availableQuestions.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No more questions available. Switch to Guess Mode.</p>
          ) : (
            availableQuestions.map(q => (
              <button
                key={q.id}
                onClick={() => onAskQuestion(q)}
                className="w-full text-left px-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
              >
                {q.text}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
