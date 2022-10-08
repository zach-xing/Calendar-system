import { StyleSheet, View } from "react-native";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import Main from "./main";

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Main />
    </ApplicationProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
