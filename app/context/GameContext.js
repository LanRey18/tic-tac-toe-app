import React, { useState, createContext, useContext, useEffect } from "react";

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [turns, setTurns] = useState(0); // Track turns
  const [playerXWins, setPlayerXWins] = useState(0); // Track X wins
  const [playerOWins, setPlayerOWins] = useState(0); // Track O wins

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);
    setTurns(turns + 1); // Increment turn count
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]); // Set winner
        if (board[a] === "X") setPlayerXWins(playerXWins + 1);
        if (board[a] === "O") setPlayerOWins(playerOWins + 1);
        return;
      }
    }

    // If all 9 turns are used and there's no winner, it's a draw
    if (turns === 9 && !winner) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setTurns(0); // Reset turn count
    setModalVisible(true);
  };

  return (
    <GameContext.Provider
      value={{
        board,
        handlePress,
        winner,
        resetGame,
        modalVisible,
        setModalVisible,
        setPlayerSymbol,
        currentPlayer,
        playerXWins,
        playerOWins,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
