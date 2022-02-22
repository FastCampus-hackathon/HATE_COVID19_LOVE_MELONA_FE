import React from "react";
import GlobalStyle from "./GlobalStyle";
import { NativeBar, NativeFooter } from "./component";
import { MapPage } from "./page/index";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <NativeBar />
      <MapPage />
      <NativeFooter />
    </>
  );
};

export default App;
