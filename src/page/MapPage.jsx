import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Input } from "../elements";

import Recognition from "../component/Recognition";

const { naver } = window;
const mapOptions = {
	center: new naver.maps.LatLng(37.3595704, 127.105399),
	zoom: 10,
};

const MainPage = () => {
	const navigate = useNavigate();
	const [recogToggle, setRecogToggle] = useState(false);

	useEffect(() => {
		const map = new naver.maps.Map("map", mapOptions);
	}, []);

	return (
		<>
			<div
				id="map"
				style={{
					width: "100%",
					height: "calc(100vh - 24em)",
				}}
			>
				<Input width="343em" _click={() => navigate("/search")} />
				{!recogToggle && (
					<div
						style={{
							width: "100px",
							height: "100px",
							backgroundColor: "red",
							position: "fixed",
							bottom: 0,
							zIndex: 2,
						}}
						onClick={() => setRecogToggle(true)}
					/>
				)}
				<Recognition state={recogToggle} set={setRecogToggle} />
			</div>
		</>
	);
};

export default MainPage;
