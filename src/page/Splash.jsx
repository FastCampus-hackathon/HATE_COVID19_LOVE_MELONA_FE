import { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SplashMap } from "../assets/splash1.svg";
import { ReactComponent as SplashPeople } from "../assets/splash2.svg";
import { ReactComponent as SplashLight } from "../assets/splash3.svg";
import { ReactComponent as Mic } from "../assets/mic.svg";
import { ReactComponent as Geo } from "../assets/geo.svg";

const Background = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(16, 16, 16, 0.7);
	z-index: 1;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	background-color: #2c4eb2;
	margin-top: -25em;
	width: 100vw;
	height: 100vh;
`;

const Title = styled.div`
	font-size: 28px;
	font-weight: 400;

	font-style: normal;
	line-height: 41px;
	padding: 0px 40px;
	padding-top: 120px;
	color: #ffffff;
	letter-spacing: -0.02em;
`;

const Accent = styled.span`
	font-weight: 600;
`;

const Line = styled.div`
	width: 0px;
	height: 84px;
	margin-left: 43px;
	margin-top: 10px;
	margin-bottom: 10px;
	border-left: 1px solid #ffffff;
`;

const Name = styled.div`
	font-weight: bold;
	font-size: 28px;
	line-height: 41px;
	margin-left: 40px;
	color: #ffffff;
`;

const SvgBox = styled.div`
	padding-left: 10px;
	margin-top: 40px;
	padding-right: 20px;
	display: flex;
`;

const LoginBox = styled.div`
	position: absolute;
	margin-top: -100px;
	margin-left: 41px;
	margin-right: 41px;
`;

const NotLogin = styled.div`
	height: 46px;

	font-weight: 400;
	font-size: 16px;
	line-height: 23px;
	text-decoration-line: underline;

	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	margin-bottom: 10px;
`;
const LoginBtn = styled.div`
	height: 46px;
	font-weight: bold;
	font-size: 16px;
	line-height: 16px;

	display: flex;

	letter-spacing: -0.04em;

	/* 코로나메인컬러 */

	background: #ffffff;
	border-radius: 4px;
	justify-content: center;
	align-items: center;
	text-align: center;

	padding: 0px 103px;
	color: #2c4eb2;
`;

const ModalContainer = styled.div`
	background-color: white;
	width: 310px;
	height: 341px;
	border-radius: 6px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
`;

const ModalTitle = styled.div`
	font-weight: bold;
	font-size: 20px;
	line-height: 24px;
	margin-top: 38px;
	margin-left: 19px;
	color: #2d2d2d;
`;

const ModalDesc = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	margin-left: 19px;
	margin-right: 56px;
	margin-bottom: 15px;
	/* or 143% */

	/* Gray scale/Secondary text */

	color: #888888;
`;

const PermissionBox = styled.div`
	display: flex;
	margin-left: 20px;
`;
const PermissionTextBox = styled.div`
	margin-left: 14px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;
const PermissionTitle = styled.div`
	font-size: 14px;
	line-height: 14px;

	font-weight: bold;
	/* identical to box height, or 100% */

	/* 코로나메인컬러 */

	color: #2c4eb2;
`;

const PermissionDesc = styled.div`
	font-weight: 500;
	font-size: 12px;
	line-height: 12px;
	/* identical to box height, or 100% */

	align-items: center;

	color: #7d7d7d;
`;
const Button = styled.div`
	height: 46px;
	border-radius: 4px;
	background-color: #2c4eb2;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	font-size: 14px;
	line-height: 16px;
	margin: 20px 16px;

	letter-spacing: -0.04em;

	/* White */

	color: #ffffff;
`;

const Splash = () => {
	const [modal, setModal] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setModal(true);
		}, 2000);
	}, []);

	return (
		<Container>
			{modal && (
				<Background>
					<ModalContainer>
						<ModalTitle>위치 정보 사용 알림</ModalTitle>
						<ModalDesc>
							서비스를 이용하기 위해 다음 권한에 대한 접근 동의가 필요합니다.
						</ModalDesc>
						<PermissionBox>
							<Mic />
							<PermissionTextBox>
								<PermissionTitle>마이크</PermissionTitle>
								<PermissionDesc>음성인식 검색에 사용</PermissionDesc>
							</PermissionTextBox>
						</PermissionBox>
						<PermissionBox>
							<Geo />
							<PermissionTextBox>
								<PermissionTitle>위치</PermissionTitle>
								<PermissionDesc>주변시설 검색 시 사용</PermissionDesc>
							</PermissionTextBox>
						</PermissionBox>
						<Button>다음</Button>
					</ModalContainer>
				</Background>
			)}
			<Title>
				<Accent>
					서울시 지정
					<br />
					호흡기진료병원
				</Accent>
				<br />
				한눈에 확인하세요
			</Title>
			<Line />
			<Name>메로나</Name>
			<SvgBox>
				<SplashMap style={{ flexGrow: 1, flexShrink: 0 }} />
				<SplashLight style={{ marginLeft: "-56px", marginTop: "85px" }} />
				<SplashPeople style={{ marginTop: "90px", marginLeft: "-10px" }} />
			</SvgBox>
			<LoginBox>
				<NotLogin>둘러볼게요</NotLogin>
				<LoginBtn>로그인하기</LoginBtn>
			</LoginBox>
		</Container>
	);
};

export default Splash;
