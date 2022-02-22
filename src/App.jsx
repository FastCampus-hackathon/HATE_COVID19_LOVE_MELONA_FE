import React from "react";
import GlobalStyle from "./GlobalStyle";
import { NativeBar } from "./component";
import { MapPage, Search, Info, Splash } from "./page/index";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<NativeBar />
			<Router>
				<Routes>
					<Route path="/" element={<Splash />} />
					<Route path="home" element={<MapPage />} />
					<Route path="info" element={<Info />} />
					<Route path="search" element={<Search />} />
				</Routes>
			</Router>
		</>
	);
};
export default App;
