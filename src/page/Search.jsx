import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Item from "../component/Item";
import { ReactComponent as Back } from "../assets/back.svg";
import { ReactComponent as ErrorIcon } from "../assets/warning.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div``;

const Header = styled.div`
	height: 48px;
	border-bottom: 0.5px solid #e3e7ed;
	padding: 11px 16px;
	display: flex;
	align-items: center;
`;

const IconBox = styled.div`
	width: 30px;
	height: 30px;
	margin-right: 8px;
	display: flex;
	align-items: center;
`;

const InputBox = styled.div`
	width: 100%;
	height: 48px;
	background-color: red;
	background: #ededed;
	border-radius: 10px;
	flex-grow: 1;
	input {
		width: 70%;
		outline: none;
		font-size: 16px;
		line-height: 24px;
		color: #3178ff;
		height: 24px;
		background-color: rgba(0, 0, 0, 0);
		padding: 12px 20px;
	}
`;

const Main = styled.div``;

const ErrorBox = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 57px;
`;

const ErrorText = styled.span`
	padding-top: 15px;
	font-weight: bold;
	font-size: 14px;
	line-height: 24px;
	color: #909090;
`;

const Background = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0, 0, 0, 0.4);
	z-index: 1;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const keywordFiltering = (data, keyword) => {
	return data.filter(
		(item) =>
			item.name && item.name.toLowerCase().includes(keyword.toLowerCase())
	);
};

const Search = ({ lat = 37.565781556072295, lon = 127.11763398409565 }) => {
	const navigate = useNavigate();
	const { state } = useLocation();

	const [results, setResults] = useState({ isLoading: true, data: [] });
	const [keyword, setKeyword] = useState(state ? state.keyword : "");

	const get = useCallback(async () => {
		if (state.latlng) {
			const loaded = await axios(
				`https://hello-hackathon-server.herokuapp.com/v1/search/${state.latlng.lat}/${state.latlng.long}`
			);
			if (loaded) setResults({ isLoading: false, data: loaded.data.data });
		} else {
			const loaded = await axios(
				`https://hello-hackathon-server.herokuapp.com/v1/search/${lat}/${lon}`
			);
			if (loaded) setResults({ isLoading: false, data: loaded.data.data });
		}
	}, [lat, lon, state.latlng]);

	useEffect(() => {
		get();
	}, [get]);

	const resultArray = useMemo(() => {
		if (keyword?.length > 1 && results.data) {
			return {
				...results,
				data: keywordFiltering(results.data, keyword),
				keyword,
			};
		}
	}, [keyword, results]);

	return (
		<Container>
			<Header>
				<IconBox>
					<Back onClick={() => navigate(-1)} />
				</IconBox>
				<InputBox>
					<input
						type="text"
						autoFocus
						defaultValue={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
				</InputBox>
			</Header>
			{results.isLoading ? (
				<Background />
			) : (
				<Main>
					{!resultArray || resultArray?.data.length < 1 ? (
						<ErrorBox>
							<ErrorIcon />
							<ErrorText>검색 결과가 없습니다</ErrorText>
						</ErrorBox>
					) : (
						resultArray?.data.map((item, index) => (
							<Item key={index} data={item} keyword={keyword} />
						))
					)}
				</Main>
			)}
		</Container>
	);
};

export default Search;
