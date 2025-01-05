import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Loader } from "lucide-react-native";

const MyLoader = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // Durasi animasi (ms)
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.loadingContainer}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Loader size={100} color="gray" />
      </Animated.View>
    </View>
  );
};

export default MyLoader;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
