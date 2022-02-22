import React from "react";
import GlobalStyle from "./GlobalStyle";
import { NativeBar } from "./component";
import { MapPage } from "./page/index";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <NativeBar />
      <MapPage />
    </>
  );
};

export default App;
