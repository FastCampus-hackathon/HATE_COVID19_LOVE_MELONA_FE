import React from "react";
import styled from "styled-components";
import { ImageBox } from "./index";

const Wrapper = ({ text, image, select, _onClick }) => {
	return (
		<Container onClick={_onClick} select={select}>
			<ImageBox image={image} width="24em" />
			<Typho>{text}</Typho>
		</Container>
	);
};

export default Wrapper;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 20em;
	padding: 8em 10em 8em 10em;
	background: ${(props) => (props.select ? "#E7EFFF" : "#ffffff")};
	color: ${(props) => (props.select ? "#2C4EB2" : "#000")};
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
	border-radius: 20em;
	margin-right: 10em;
`;

const Typho = styled.b`
	font-family: "Noto Sans KR";
	font-size: 16em;
	font-style: normal;
	font-weight: 700;
	line-height: 22px;
	letter-spacing: 0em;
	white-space: nowrap;
	margin-left: 4rem;
`;
