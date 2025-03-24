import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import "../global.css";

import circle from "../assets/circle.png";
import cross from "../assets/cross.png";

function LandingPage() {
  return (
    <SafeAreaView className="bg-[#b92c48] h-full items-center justify-center">
      <View className="bg-[#b92c48] ">
        <View>
          <Image source={circle} className="size-7 " />
          <Image source={cross} className="size-7" />
        </View>

        <Text className="font-black text-white text-5xl mb-11">
          Tic Tac Toe
        </Text>

        <CustomButton title="Play" onClick={() => router.push("/game")} />
      </View>
    </SafeAreaView>
  );
}

export default LandingPage;
