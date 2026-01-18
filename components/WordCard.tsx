
import React, { useState } from 'react';
import { Word } from '../types';
import { Lightbulb, CheckCircle, Info, Volume2, Bookmark, Star } from 'lucide-react';

interface WordCardProps {
  word: Word;
  isLearned: boolean;
  isFavorite: boolean;
  onToggleLearned: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  viewMode: 'grid' | 'list';
}

const WordCard: React.FC<WordCardProps> = ({ 
  word, 
  isLearned, 
  isFavorite, 
  onToggleLearned, 
  onToggleFavorite,
  viewMode 
}) => {
  const [showMnemonic, setShowMnemonic] = useState(false);

  const handleMnemonic = () => {
    setShowMnemonic(!showMnemonic);
  };

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word.spanish);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
  };

  if (viewMode === 'list') {
    return (
      <div className={`flex items-center justify-between p-4 bg-white border rounded-xl transition-all hover:shadow-sm ${isLearned ? 'border-yellow-300 bg-yellow-50/30' : 'border-yellow-200'}`}>
        <div className="flex items-center gap-6">
          <div className="w-16 text-2xl font-bold spanish-font text-yellow-900">{word.spanish}</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-yellow-600">{word.transliteration}</span>
            {word.malaysian && <span className="text-xs text-yellow-600 italic">MY: {word.malaysian}</span>}
          </div>
          <div className="text-yellow-800 font-medium">{word.meaning}</div>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={speak} className="p-2 text-yellow-500 hover:text-yellow-700 transition-colors">
            <Volume2 size={18} />
          </button>
          <button 
            onClick={() => onToggleLearned(word.id)}
            className={`p-2 transition-colors ${isLearned ? 'text-yellow-600' : 'text-gray-300 hover:text-yellow-500'}`}
          >
            <CheckCircle size={20} fill={isLearned ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={() => onToggleFavorite(word.id)}
            className={`p-2 transition-colors ${isFavorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
          >
            <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isLearned ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-yellow-200'}`}>
      <div className="absolute top-4 right-4 flex gap-2">
         <button 
          onClick={() => onToggleFavorite(word.id)}
          className={`transition-colors ${isFavorite ? 'text-yellow-500' : 'text-gray-300 group-hover:text-yellow-300'}`}
        >
          <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button 
          onClick={() => onToggleLearned(word.id)}
          className={`transition-colors ${isLearned ? 'text-yellow-600' : 'text-gray-300 group-hover:text-yellow-400'}`}
        >
          <CheckCircle size={20} fill={isLearned ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center space-y-3">
        <span className="text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full uppercase tracking-wider">{word.category}</span>
        
        <h2 className="text-4xl font-bold spanish-font text-yellow-900 cursor-pointer" onClick={speak}>{word.spanish}</h2>
        
        <div className="space-y-1">
          <p className="text-lg font-medium text-yellow-600">{word.transliteration}</p>
          {word.malaysian && <p className="text-sm text-yellow-600 italic">MY: {word.malaysian}</p>}
        </div>

        <div className="w-full h-px bg-yellow-200 my-2"></div>
        
        <p className="text-lg text-yellow-800 font-semibold">{word.meaning}</p>
        
        <div className="flex gap-4 pt-2">
          <button 
            onClick={speak}
            className="flex items-center gap-1 text-xs text-yellow-600 font-medium hover:underline"
          >
            <Volume2 size={14} /> Listen
          </button>
          {word.mnemonic && (
            <button 
              onClick={handleMnemonic}
              className="flex items-center gap-1 text-xs text-yellow-600 font-medium hover:underline"
            >
              <Lightbulb size={14} /> Mnemonic
            </button>
          )}
        </div>

        {showMnemonic && word.mnemonic && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
            <p>{word.mnemonic}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordCard;
