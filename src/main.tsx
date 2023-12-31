import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import "@rainbow-me/rainbowkit/styles.css";
// import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
// import {configureChains, createConfig, WagmiConfig} from "wagmi";
// import {mainnet, polygon, optimism, arbitrum, base, zora} from "wagmi/chains";
// import {publicProvider} from "wagmi/providers/public";
// const {chains, publicClient} = configureChains(
//   [mainnet, polygon, optimism, arbitrum, base, zora],
//   [publicProvider()]
// );
// const {connectors} = getDefaultWallets({
//   appName: "My RainbowKit App",
//   projectId: "YOUR_PROJECT_ID",
//   chains,
// });
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
