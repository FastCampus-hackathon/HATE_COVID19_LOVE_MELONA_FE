import styled from "styled-components";
import infotop from "../assets/infotop.png";
import infoexam from "../assets/infoexam.png";
import { ReactComponent as Back } from "../assets/back.svg";
import { ReactComponent as Icon1 } from "../assets/icon1.svg";
import { ReactComponent as Icon2 } from "../assets/icon2.svg";
import { ReactComponent as Icon3 } from "../assets/icon3.svg";
import { useNavigate } from "react-router-dom";

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

const ContentConatiner = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0px 20px 0px 16px;
`;

const TopImage = styled.img`
	width: 100%;
	height: 200px;
`;

const Title = styled.div`
	font-weight: bold;
	font-size: 24px;
	line-height: 35px;
	padding-top: 30px;
`;

const Date = styled.div`
	font-size: 14px;
	line-height: 20px;
	margin-top: 12px;
	color: #888888;
`;

const ContentTitle = styled.div`
	font-size: 20px;
	line-height: 27px;
	color: #2c4eb2;
	font-weight: bold;
	margin-top: 31px;
	display: flex;
	align-items: center;
`;
const ContentText = styled.span`
	margin-top: 8px;
	margin-bottom: 25px;
	font-weight: 500;
	font-size: 16px;
	line-height: 23px;
`;

const InfoImage = styled.div`
	width: 100%;
	height: 98px;
	margin-bottom: 17px;
`;

const Info = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<Header>
				<IconBox onClick={() => navigate(-1)}>
					<Back />
				</IconBox>
			</Header>
			<TopImage style={{ backgroundImage: `url(${infotop})` }} />
			<ContentConatiner>
				<Title>
					코로나이슈
					<br />
					병원 방문전 알아두면 좋을 용어
				</Title>
				<Date>2월 22일 2022년</Date>
				<ContentTitle>
					호흡기전담진료
					<Icon1 style={{ marginLeft: "4px" }} />
				</ContentTitle>
				<ContentText>
					코로나19 감염으로부터 안전한 환경을 갖추고 발열 또는 호흡기 증상의
					환자를 진료하는 곳입니다. 의심 증상이 있을 시 방문 가능한 병원입니다.{" "}
				</ContentText>
				<InfoImage style={{ backgroundImage: `url(${infoexam})` }} />
				<ContentTitle>
					신속항원검사기관
					<Icon2 style={{ marginLeft: "4px" }} />
				</ContentTitle>
				<ContentText>
					스스로 콧물 등을 채취해 진단키트에 넣어 코로나19 확진여부를 30여분
					내에 알 수 있는 진단검사방식입니다.
				</ContentText>
				<ContentTitle>
					코로나 전화진료
					<Icon3 style={{ marginLeft: "4px" }} />
				</ContentTitle>
				<ContentText>증상에 대해 전화로 상담이 가능한 병원입니다.</ContentText>
			</ContentConatiner>
		</Container>
	);
};

export default Info;
