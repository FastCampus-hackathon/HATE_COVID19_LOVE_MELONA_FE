import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
// import speech from "../assets/speech.png";
import { ReactComponent as X } from "../assets/x.svg";
import { ReactComponent as Speech } from "../assets/speech.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Background = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	background: ${(props) =>
		props.state ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.0);"};
	z-index: ${(props) => (props.state ? 102 : 0)};
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	border-radius: 20px 20px 0px 0px;
	width: 100%;
	height: 260px;
	position: absolute;
	bottom: ${(props) => (props.state ? "0px" : "-260px")};
	transition: bottom 0.5s;
	background-color: white;
	z-index: 102;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const IconBox = styled.div`
	text-align: right;
	padding-top: 20px;
	padding-right: 20px;
	align-self: flex-end;
`;
const Title = styled.div`
	font-weight: bold;
	font-size: 22px;
	line-height: 26px;
	margin-top: -8px;
	align-items: center;
	text-align: center;
	letter-spacing: -1px;
`;
const Desc = styled.div`
	background: #d6d8dc;
	margin: 20px 88px;
	border-radius: 30px;
	font-weight: 500;
	font-size: 16px;
	line-height: 26px;
	align-items: center;
	text-align: center;
	letter-spacing: -1px;
	padding: 8px 12px;

	color: #2c4eb2;
`;
const Recog = styled.div`
	background-color: #2c4eb2;
	width: 60px;
	height: 60px;
	text-align: center;
	display: flex;
	border-radius: 60px;
	align-items: center;
	justify-content: center;
	border: 4px solid #d6d8dc;
	box-shadow: 0px 3.75px 3.75px rgba(0, 0, 0, 0.25);
`;

const Pulse = styled.div`
	content: "";
	width: 60px;
	height: 60px;
	background: #2c4eb2;
	border: 5px solid #2c4eb2;
	border-radius: 50%;
	top: 150px;
	position: absolute;
	animation: pulsate infinite 1.5s;
	background: transparent;
	@keyframes pulsate {
		0% {
			-webkit-transform: scale(1, 1);
			opacity: 1;
		}
		100% {
			-webkit-transform: scale(1.3, 1.3);
			opacity: 0;
		}
	}
`;

const Recognition = ({ state, set }) => {
	const { transcript, listening } = useSpeechRecognition();
	const navigate = useNavigate();

	useEffect(() => {
		if (state) {
			SpeechRecognition.startListening();
		}
	}, [state]);

	useEffect(() => {
		if (!listening && transcript) {
			navigate("/search", { state: { keyword: transcript } });
		}
	}, [transcript, listening, navigate]);

	return (
		<Background state={state}>
			<Container state={state}>
				<IconBox>
					<X onClick={() => set(false)} />
				</IconBox>
				<Title>이렇게 말해보세요</Title>
				<Desc>
					{transcript ? `"${transcript}"` : '"주변 이비인후과 찾아줘"'}
				</Desc>
				<Recog>
					<Speech />
				</Recog>
				<Pulse />
			</Container>
		</Background>
	);
};

export default Recognition;
