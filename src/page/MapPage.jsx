import React, { useState, useEffect } from "react";
import { NaverMap, Marker } from "react-naver-maps"; // 패키지 불러오기
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { ReactComponent as Tri } from "../assets/tri.svg";
import { Input, Wrapper, ImageBox } from "../elements";
import Recognition from "../component/Recognition";
import {
	Hospital,
	Phone,
	Check,
	Cross,
	Micro,
	HpMark,
	Current,
	Think,
	Chev,
	Plus,
	Minus,
	ClickedHospital,
	ClickedPCR,
	ClickedPhone,
	ClickedCheck,
} from "../assets";

const navermaps = window.naver.maps;

const MapPage = () => {
	const [location, setLocation] = useState(null);
	const [nowLoca, setNowLoca] = useState(null);
	const [data, setData] = useState([]);
	const [level, setLevel] = useState(15);
	const [filtered, setFilter] = useState(null);
	const [open, setOpen] = useState(false);
	const [pcr, setPcr] = useState(false);
	const [phone, setPhone] = useState(false);
	const [selection, setSelection] = useState(null);

	// by Jinsoo
	const navigate = useNavigate();
	const { pathname, state } = useLocation();
	const includesDetail = pathname.includes("detail");
	const [recogToggle, setRecogToggle] = useState(false);
	const [notiToggle, setNotiToggle] = useState(state?.first);
	const [coach, setCoach] = useState(state?.first);

	const getLocation = () => {
		let lat, long;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					lat = position.coords.latitude;
					long = position.coords.longitude;
					setLocation({ lat, long });
					setNowLoca({ lat, long });
				},
				function (error) {
					console.error(error);
				},
				{
					enableHighAccuracy: false,
					maximumAge: 0,
					timeout: Infinity,
				}
			);
		} else {
			alert("GPS를 지원하지 않습니다");
			return;
		}
	};

	const getData = () => {
		const url = "https://hello-hackathon-server.herokuapp.com/v1/hospital/list";
		axios
			.get(url)
			.then(function (response) {
				setData(response.data.data.slice(0, 300));
			})
			.catch(function (error) {
				throw error;
			});
	};

	useEffect(() => {
		if (!location) {
			getLocation();
		}
		getData();
	}, [location]);

	return (
		<>
			<NaverMap
				mapDivId={"maps-getting-started-uncontrolled"}
				style={{
					width: "100%",
					height: `calc(100vh - ${includesDetail ? "200em" : "24em"})`,
				}}
				defaultCenter={{ lat: 37.5666805, lng: 126.9784147 }}
				center={location && new navermaps.LatLng(location.lat, location.long)}
				animation={4}
				defaultZoom={level}
				zoom={level}
				onClick={() => {
					setSelection(null);
				}}
			>
				{!filtered &&
					data.length &&
					data.map((d, idx) => {
						const { latitude, longitude, name } = d;
						const findIcon = () => {
							if (selection) {
								if (selection.name === name) return selection.type;
							}
							return HpMark;
						};
						const icon = findIcon();
						return (
							<Marker
								key={idx}
								position={new navermaps.LatLng(latitude, longitude)}
								onClick={(e) => {
									setSelection({ name, type: ClickedHospital });
									// 누르면 페이지 이동
									setLocation({ lat: latitude, long: longitude });
									navigate("detail", { state: { data: d, latlng: nowLoca } });
								}}
								icon={icon}
							/>
						);
					})}
				{filtered &&
					filtered.data.map((d, idx) => {
						const { latitude, longitude, name } = d;

						const findIcon = () => {
							if (selection) {
								if (selection.name === name) {
									if (selection.type === Check) {
										return ClickedCheck;
									}

									if (selection.type === Phone) {
										return ClickedPhone;
									}

									if (selection.type === Hospital) {
										return ClickedPCR;
									}
								}
							}
							return filtered.type;
						};
						const icon = findIcon();
						return (
							<Marker
								key={idx}
								position={new navermaps.LatLng(latitude, longitude)}
								onClick={(e) => {
									setSelection({ name, type: filtered.type });
									// 누르면 페이지 이동
									setLocation({ lat: latitude, long: longitude });
									navigate("detail", { state: { data: d, latlng: nowLoca } });
								}}
								icon={icon}
							/>
						);
					})}
				{nowLoca && (
					<Marker
						key={"current"}
						position={new navermaps.LatLng(nowLoca.lat, nowLoca.long)}
						animation={0}
						icon={Current}
					/>
				)}
				<Input
					width="328em"
					_click={() => navigate("/search", { state: { latlng: nowLoca } })}
				/>
				<Container>
					<Wrapper
						image={Check}
						text="진료 중"
						select={open}
						_onClick={() => {
							if (open) {
								setOpen(false);
								setFilter((d) => null);
							} else {
								setOpen(true);
								setPcr(false);
								setPhone(false);
								setFilter({ data, type: Check });
							}
						}}
					/>
					<Wrapper
						image={Hospital}
						text="PCR"
						select={pcr}
						_onClick={() => {
							if (pcr) {
								setPcr(false);
								setFilter((d) => null);
							} else {
								setOpen(false);
								setPcr(true);
								setPhone(false);
								const p = data.filter((d) => d.isPcr);
								setFilter({ data: p, type: Hospital });
							}
						}}
					/>
					<Wrapper
						image={Phone}
						text="코로나 전화진료"
						select={phone}
						_onClick={() => {
							if (phone) {
								setPhone(false);
								setFilter((d) => null);
							} else {
								setOpen(false);
								setPcr(false);
								setPhone(true);
								const p = data.filter((d) => d.isContact);
								setFilter({ data: p, type: Phone });
							}
						}}
					/>
				</Container>
				{!recogToggle && (
					<Mic onClick={() => setRecogToggle(true)} state={includesDetail}>
						<ImageBox width="30em" height="30em" image={Micro} />
					</Mic>
				)}
				<FindLocation
					onClick={() => {
						getLocation();
					}}
				>
					<ImageBox width="26em" height="26em" image={Cross} />
				</FindLocation>
				<MoreInfo onClick={() => navigate("/info")}>
					<ImageBox
						position="absolute"
						left="5em"
						image={Think}
						width="18em"
						height="18em"
					/>
					<Typo>‘호흡기전담진료’ 알아보기</Typo>
					<ImageBox
						image={Chev}
						position="absolute"
						right="-3.5em"
						width="24em"
						height="24em"
					/>
				</MoreInfo>
				<BtnContainer>
					<Upper
						onClick={() => {
							setLevel(level + 1);
						}}
					>
						<ImageBox image={Plus} width="22.58em" height="22.58em" />
					</Upper>
					<Down
						onClick={() => {
							setLevel(level - 1);
						}}
					>
						<ImageBox image={Minus} width="22.58em" />
					</Down>
				</BtnContainer>
				<Recognition
					state={recogToggle}
					set={setRecogToggle}
					latlng={nowLoca}
				/>
			</NaverMap>
			{notiToggle && (
				<Background>
					<ModalContainer>
						<ModalTitle>서비스 이용 알림</ModalTitle>
						<ModalDesc>
							필수 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서
							반드시 허용해 주세요.
						</ModalDesc>
						<ModalButtonBox>
							<ModalButtonClose onClick={() => setNotiToggle(false)}>
								닫기
							</ModalButtonClose>
							<ModalButton onClick={() => setNotiToggle(false)}>
								설정
							</ModalButton>
						</ModalButtonBox>
					</ModalContainer>
				</Background>
			)}
			{!notiToggle && coach && (
				<CoachBackground onClick={() => setCoach(false)}>
					<Tri style={{ position: "absolute", top: "194px", left: "50px" }} />
					<TextWindow>서울시에서 지정된 병원을 바로 찾아보세요.</TextWindow>
					<Tri
						style={{
							position: "absolute",
							top: "680px",
							right: "66px",
							transform: "rotate(90deg)",
						}}
					/>
					<MicWindow>음성인식으로 병원을 쉽게 검색하세요.</MicWindow>
				</CoachBackground>
			)}
		</>
	);
};

export default MapPage;

const Container = styled.div`
	max-width: 342em;
	overflow-y: auto;
	display: flex;
	padding: 20em 0 20em 0;
	z-index: 12;
	position: absolute;
	top: 70.5em;
	left: 18em;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
`;

const Mic = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48em;
	height: 48em;
	border-radius: 24em;
	background-color: #2c4eb2;
	box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
	z-index: 12;
	position: absolute;
	bottom: ${(props) => (props.state ? "105em" : "35em")};
	right: 16em;
`;

const FindLocation = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	height: 48em;
	width: 52em;
	border-radius: 10em;
	position: absolute;
	bottom: 105em;
	left: 18em;
	background-color: #2c4eb2;
`;

const MoreInfo = styled.div`
	width: 264em;
	height: 48em;
	background-color: rgba(255, 255, 255, 0.85);
	z-index: 10;
	position: absolute;
	bottom: 35em;
	left: 18em;
	border-radius: 10em;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Typo = styled.p`
	color: #2c4eb2;
	font-family: "Noto Sans KR";
	font-size: 18rem;
	font-style: bold;
	font-weight: 700;
	line-height: 25rem;
	letter-spacing: 0em;
`;

const BtnContainer = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 10;
	position: absolute;
	bottom: 170em;
	left: 18em;
`;

const Upper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 52em;
	height: 52em;
	border-radius: 13em 13em 0 0;
	background-color: #ffffff;
`;

const Down = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 52em;
	height: 52em;
	border-radius: 0 0 13em 13em;
	background-color: #ffffff;
`;

const Background = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(16, 16, 16, 0.7);
	z-index: 13;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const CoachBackground = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(16, 16, 16, 0.7);
	z-index: 11;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContainer = styled.div`
	background-color: white;
	width: 310px;
	height: 189px;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ModalTitle = styled.div`
	font-weight: bold;
	font-size: 20px;
	line-height: 24px;
	margin-top: 18px;
	margin-left: 19px;
	color: #2d2d2d;
`;

const ModalDesc = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	margin-left: 19px;
	margin-right: 19px;
	margin-bottom: 15px;
	color: #888888;
`;

const ModalButtonBox = styled.div`
	display: flex;
	height: 44px;
	justify-content: space-around;
	margin-bottom: 17px;
	margin-left: 16px;
	margin-right: 16px;

	font-weight: bold;
	font-size: 14px;
	line-height: 16px;
	/* identical to box height, or 114% */

	letter-spacing: -0.04em;
`;
const ModalButtonClose = styled.div`
	color: #2c4eb2;
	display: flex;
	flex-grow: 1;
	margin-right: 4px;
	border-radius: 4px;
	justify-content: center;
	align-items: center;
	border: 1px solid #2c4eb2;
	box-sizing: border-box;
	border-radius: 4px;
`;
const ModalButton = styled.div`
	color: white;
	background-color: #2c4eb2;
	display: flex;
	flex-grow: 1;
	margin-left: 4px;
	border-radius: 4px;
	justify-content: center;
	align-items: center;
`;

const TextWindow = styled.div`
	font-weight: bold;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	color: #ffffff;
	font-size: 16px;
	line-height: 18px;
	width: 311px;
	height: 38px;
	top: 200px;
	background: #3178ff;
	position: absolute;
	border-radius: 30px;
`;
const MicWindow = styled.div`
	font-weight: bold;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	color: #ffffff;
	font-size: 16px;
	line-height: 18px;
	width: 277px;
	height: 38px;
	top: 664px;
	left: 10px;
	background: #3178ff;
	position: absolute;
	border-radius: 30px;
`;
