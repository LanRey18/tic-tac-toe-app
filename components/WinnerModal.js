import { View, Text, Modal, Pressable, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import crossRed from "../assets/cross-red.png";
import CustomButton from "./CustomButton";
import { useGame } from "../app/context/GameContext";

const WinnerModal = ({ visible, animation, onBack }) => {
  const { playerXWins, playerOWins } = useGame();

  return (
    <Modal
      visible={visible}
      animation={animation}
      className="bg-[#b92c48] justify-center items-center"
    >
      <View className="bg-[#b92c48] justify-center items-center h-full">
        <View className="bg-[#b92c48] w-auto mt-7 py-3 px-5 rounded-lg">
          <Text className="text-center font-semibold text-5xl text-white">
            Winner!
          </Text>
        </View>

        <View className="items-end justify-end flex flex-row gap-5 mt-7">
          <View>
            <View className="h-[13rem] w-[12rem] bg-[#F8D559] rounded-lg items-center justify-top">
              <Text className="mb-3 mt-4 font-bold">Player</Text>
              <Image
                source={playerXWins > playerOWins ? crossRed : circle}
                className="bg-contain size-[7rem]"
              />

              <Text className="font-semibold text-gray-500/50 mt-2">
                {playerXWins > playerOWins ? playerXWins : playerOWins} Wins
              </Text>
            </View>
          </View>

          <View>
            <View className="h-[10rem] w-[10rem] bg-white/25 rounded-lg items-center justify-top">
              <Text className="mb-3 mt-4 font-bold">Player</Text>
              <Image
                source={playerXWins < playerOWins ? cross : circle}
                className="bg-contain size-16"
              />
              <Text className="font-semibold text-white/50 mt-2">
                {playerXWins < playerOWins ? playerXWins : playerOWins} Wins
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-10">
          <CustomButton title="Go Back" onClick={onBack} />
        </View>
      </View>
    </Modal>
  );
};

export default WinnerModal;
