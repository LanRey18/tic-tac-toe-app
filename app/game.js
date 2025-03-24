import { View, Text, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGame } from "../app/context/GameContext";
import WinnerModal from "../components/WinnerModal";

import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import back from "../assets/arrow.png";

const Game = () => {
  const [visible, SetVisible] = useState(false);

  const onBack = () => {
    SetVisible(false);
    router.back();
  };

  const {
    board,
    handlePress,
    currentPlayer,
    winner,
    resetGame,
    playerXWins,
    playerOWins,
  } = useGame();

  // Ensure board is not null before rendering
  if (!board) return <Text>Loading...</Text>;

  return (
    <SafeAreaView className="bg-[#FFD7E1] h-full">
      <View className="mx-3 mt-5">
        <Pressable onPress={() => router.back()}>
          <Image source={back} className="size-5" />
        </Pressable>
      </View>
      <View className="flex flex-row gap-11 items-center justify-center mt-3 ">
        <View className="items-center justify-center">
          <View className="bg-white h-[10rem] w-[9rem] rounded-xl">
            <View className="items-center justify-center gap-5">
              <Text className="text-center mt-4 font-medium">Player X</Text>
              <View className="bg-[#b92c48] h-[5rem] w-[6rem] items-center justify-center rounded-lg">
                <Image source={cross} className="size-11" />
              </View>
            </View>
          </View>

          <View className="px-4 py-1 my-2 bg-white border-2 border-[#F8D559] rounded-lg">
            <Text className="font-bold text-[#F8D559] text-sm">
              {playerXWins} Wins
            </Text>
          </View>
        </View>

        <View className="items-center justify-center">
          <View className="bg-white h-[10rem] w-[9rem] rounded-xl">
            <View className="items-center justify-center gap-5">
              <Text className="text-center mt-4 font-medium">Player O</Text>
              <View className="bg-[#b92c48] h-[5rem] w-[6rem] items-center justify-center rounded-lg">
                <Image source={circle} className="size-12" />
              </View>
            </View>
          </View>
          <View className="px-4 py-1 my-2 bg-white border-2 border-[#F8D559] rounded-lg">
            <Text className="font-bold text-[#F8D559] text-sm">
              {playerOWins} Wins
            </Text>
          </View>
        </View>
      </View>

      <View className="items-center justify-center mt-3 mb-3 flex flex-row">
        <Text className={`font-bold text-lg text-[#b92c48]`}>
          {currentPlayer}
        </Text>
        <Text className="font-bold text-lg"> Turns</Text>
      </View>

      <View className="items-center justify-center">
        <View className="flex flex-row flex-wrap w-[23rem] justify-center items-center mt-4 rounded-lg border-2 border-[#b92c48] border-dashed p-2">
          {board.map((cell, index) => (
            <Pressable
              key={index}
              className="h-[7rem] w-[7rem] border border-white border-dashed flex items-center justify-center bg-[#b92c48]"
              onPress={() => handlePress(index)}
            >
              {cell && (
                <Image
                  source={cell === "X" ? cross : circle}
                  className="size-12"
                />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {winner && (
        <View className="items-center mt-5">
          <Text className="font-bold text-lg">
            {winner === "Draw" ? "Draw" : winner + " Wins!"}
          </Text>
          <View className="flex flex-row gap-2">
            <Pressable
              onPress={() => SetVisible(true)}
              onBack={onBack}
              className="bg-transparent border-2 border-[#b92c48] px-5 py-4 mt-3 rounded-full"
            >
              <Text className="font-bold text-[#b92c48]">Quit</Text>
            </Pressable>
            <Pressable
              onPress={resetGame}
              className="bg-[#F8D559] px-5 py-4 mt-3 rounded-full"
            >
              <Text className="font-bold">Restart Game</Text>
            </Pressable>
          </View>
        </View>
      )}

      <WinnerModal visible={visible} animation={"Slide"} onBack={onBack} />
    </SafeAreaView>
  );
};

export default Game;
