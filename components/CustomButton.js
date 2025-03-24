import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

function CustomButton({ title, onClick }) {
  return (
    <TouchableOpacity
      className="h-[50px] w-[16rem] bg-[#f8d559] items-center justify-center rounded-lg"
      onPress={onClick}
    >
      <Text className="font-bold text-lg text-gray-800">{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
