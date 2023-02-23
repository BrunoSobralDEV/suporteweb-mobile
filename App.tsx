import { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";

import { Home } from "./src/screens/Home";

export default function App() {
return (
    <NativeBaseProvider>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Home />
    </NativeBaseProvider>
  )
}