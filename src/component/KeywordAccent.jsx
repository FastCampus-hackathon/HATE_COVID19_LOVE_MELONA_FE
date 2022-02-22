import { Fragment } from "react";
import styled from "styled-components";

const AccentSpan = styled.p`
	color: #3178ff;
	display: inline;
	white-space: nowrap;
`;

const KeywordAccent = ({ text, keyword }) => {
	const frontSlash = /([&%$#_{}()'"+])/g;
	const addSlash = keyword.replace(frontSlash, "\\$1");
	const splited = text.split(RegExp(addSlash, "i"));
	const saveStr = RegExp(addSlash, "i").exec(text);

	return (
		<span>
			{splited.map((str, idx) => {
				return (
					<Fragment key={idx}>
						{str}
						{idx + 1 !== splited.length && (
							<AccentSpan>{saveStr[0]}</AccentSpan>
						)}
					</Fragment>
				);
			})}
		</span>
	);
};

export default KeywordAccent;
