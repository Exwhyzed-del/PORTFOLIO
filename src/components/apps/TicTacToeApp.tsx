'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const playSound = (type: 'click' | 'win' | 'draw' | 'aiMove') => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  if (type === 'click') {
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } else if (type === 'win') {
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  } else if (type === 'draw') {
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(250, audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } else if (type === 'aiMove') {
    oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.08);
  }
};

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const checkWinner = (squares: string[]) => {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
};

// Minimax algorithm for unbeatable AI
const minimax = (squares: string[], depth: number, isMaximizing: boolean): number => {
  const result = checkWinner(squares);
  if (result.winner === 'O') return 10 - depth;
  if (result.winner === 'X') return depth - 10;
  if (squares.every((square) => square !== '')) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = 'O';
        const score = minimax(squares, depth + 1, false);
        squares[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = 'X';
        const score = minimax(squares, depth + 1, true);
        squares[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const findBestMove = (squares: string[]): number => {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      squares[i] = 'O';
      const score = minimax(squares, 0, false);
      squares[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
};

const TicTacToeApp = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<{ winner: string | null; line: number[] | null }>({ winner: null, line: null });
  const [gameMode, setGameMode] = useState<'select' | 'player' | 'ai'>('select');

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsXNext(true);
    setWinner({ winner: null, line: null });
    setGameMode('select');
  };

  const startGame = (mode: 'player' | 'ai') => {
    setGameMode(mode);
    setBoard(Array(9).fill(''));
    setIsXNext(true);
    setWinner({ winner: null, line: null });
  };

  const handleClick = (index: number) => {
    if (winner.winner || board[index] || (!isXNext && gameMode === 'ai')) return;

    playSound('click');
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result.winner) {
      playSound('win');
      setWinner(result);
    } else if (newBoard.every((square) => square !== '')) {
      playSound('draw');
      setWinner({ winner: 'Draw', line: null });
    } else {
      setIsXNext(!isXNext);
    }
  };

  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !winner.winner) {
      const timer = setTimeout(() => {
        const aiMove = findBestMove([...board]);
        if (aiMove !== -1) {
          playSound('aiMove');
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);

          const result = checkWinner(newBoard);
          if (result.winner) {
            playSound('win');
            setWinner(result);
          } else if (newBoard.every((square) => square !== '')) {
            playSound('draw');
            setWinner({ winner: 'Draw', line: null });
          } else {
            setIsXNext(true);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner.winner, gameMode]);

  if (gameMode === 'select') {
    return (
      <div className="h-full bg-[#050505] flex flex-col items-center justify-center p-4 overflow-hidden">
        <h1 className="text-3xl font-bold text-primary mb-8">Tic Tac Toe</h1>
        <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => startGame('player')}
            className="px-8 py-4 bg-primary hover:bg-primary/80 text-[#050505] font-bold text-xl rounded-lg transition-all hover:scale-105 active:scale-95"
          >
            2 Players
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => startGame('ai')}
            className="px-8 py-4 bg-secondary hover:bg-secondary/80 text-[#050505] font-bold text-xl rounded-lg transition-all hover:scale-105 active:scale-95"
          >
            vs AI (Unbeatable)
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#050505] flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {gameMode === 'ai' ? 'Tic Tac Toe vs AI' : 'Tic Tac Toe'}
        </h1>
        <div className="text-center text-xl text-secondary">
          {winner.winner ? (
            winner.winner === 'Draw' ? 'It\'s a Draw!' :
              winner.winner === 'X' ? 'Player X Wins!' : 'Player O Wins!'
          ) : (
            gameMode === 'ai' ?
              (isXNext ? 'Your Turn (X)' : 'AI is thinking...') :
              `Next Player: ${isXNext ? 'X' : 'O'}`
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {board.map((value, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleClick(index)}
            disabled={!!winner.winner || (!isXNext && gameMode === 'ai')}
            className={`w-24 h-24 text-5xl font-bold rounded-xl transition-all border-2 ${
              winner.line?.includes(index)
                ? 'bg-primary/30 border-primary shadow-[0_0_20px_rgba(0,255,136,0.5)]'
                : 'glass border-primary/30 hover:border-primary/60'
            } ${value === 'X' ? 'text-primary' : 'text-secondary'}`}
          >
            {value}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setGameMode('select')}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
        >
          Back
        </button>
        <button
          onClick={resetGame}
          className="px-8 py-3 bg-primary hover:bg-primary/80 text-[#050505] font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
        >
          {winner.winner ? 'Play Again' : 'Reset Game'}
        </button>
      </div>
    </div>
  );
};

export default TicTacToeApp;
