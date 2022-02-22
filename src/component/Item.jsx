import React from "react";
import styled from "styled-components";
import KeywordAccent from "./KeywordAccent";

const Container = styled.div`
	margin-left: 7.5px;
	margin-right: 7.5px;
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 20px;
	span {
		line-height: 24px;
	}
	display: flex;
	flex-direction: column;

	border-bottom: 0.6px solid #f1f1f1;
`;

const TopBox = styled.div``;

const Name = styled.span`
	font-weight: bold;
	font-size: 16px;
	margin-right: 6px;
`;
const Subject = styled.span`
	font-size: 10px;
	color: #909090;
`;
const BottomBox = styled.div``;

const Distance = styled.span`
	font-size: 12px;
	margin-right: 6px;
	color: #2c4eb2;
`;
const Address = styled.span`
	font-size: 12px;
	color: #919191;
`;

const Item = ({ data: { name, subject, address, distance }, keyword = "" }) => {
	return (
		<Container>
			<TopBox>
				<Name>
					{name ? <KeywordAccent text={name} keyword={keyword} /> : name}
				</Name>
				<Subject>{subject}</Subject>
			</TopBox>
			<BottomBox>
				<Distance>{distance}</Distance>
				<Address>{address.replace(/\([^)]*\)/gi, "")}</Address>
			</BottomBox>
		</Container>
	);
};

export default Item;
