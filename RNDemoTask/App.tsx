import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./src/navigation";

import { Magic } from "@magic-sdk/react-native-expo";
import Web3 from "web3";
import { ENV, API_KEY } from "./src/config/env";
import { OAuthExtension } from "@magic-ext/react-native-expo-oauth";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [env, setEnv] = React.useState(ENV.PROD);

  const magic = new Magic(API_KEY[env], {
    extensions: [new OAuthExtension()],
  });

  const web3 = new Web3(magic.rpcProvider);

  const magicProps = {
    magic,
    web3,
    setEnv,
    env,
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
