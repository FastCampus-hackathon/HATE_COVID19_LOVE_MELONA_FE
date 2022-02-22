import React from "react";
import GlobalStyle from "./GlobalStyle";
import { NativeBar } from "./component";
import { MapPage, Search, Info, Splash, Detail } from "./page/index";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	Outlet,
} from "react-router-dom";
import styled from "styled-components";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<NativeBar />
			<Router>
				<Routes>
					<Route path="/" element={<Splash />} />
					<Route
						path="home"
						element={
							<>
								<MapPage />
								<Outlet />
							</>
						}
					>
						<Route path="detail" element={<Detail />} />
					</Route>
					<Route path="info" element={<Info />} />
					<Route path="search" element={<Search />} />
				</Routes>
			</Router>
		</>
	);
};
export default App;
