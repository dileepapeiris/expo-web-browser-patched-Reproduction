/*
Copyright (c) 2025 dileepapeiris (GitHub: dileepapeiris)
All rights reserved.
*/

import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [status, setStatus] = useState("Starting...");

  useEffect(() => {
    runTest();
  }, []);

  const runTest = async () => {
    try {
      setStatus("Attempting to open popup automatically...");
      console.log("Calling openBrowserAsync...");

      const result = await WebBrowser.openBrowserAsync("https://google.com");
      console.log("Result:", result);
      setStatus(
        "FAILED TO BLOCK: The browser allowed it. Result: " +
          JSON.stringify(result)
      );
    } catch (error) {
      console.error("Error caught:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorCode = (error as any)?.code;
      setStatus("BLOCKED! Error caught: " + errorCode);
      Alert.alert("Error Caught", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ padding: 20, fontSize: 16, textAlign: "center" }}>
        {status}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
