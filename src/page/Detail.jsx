import styled from "styled-components";
import { ReactComponent as More } from "../assets/img/More.svg";
import { ReactComponent as Clock } from "../assets/img/Clock.svg";
import { ReactComponent as Mappin } from "../assets/img/Mappin.svg";
import { ReactComponent as Phone } from "../assets/img/Phone.svg";
import { ReactComponent as Question } from "../assets/img/Question.svg";
import { ReactComponent as Medicons } from "../assets/img/Medicons.svg";
import { useLocation } from "react-router-dom";
import convertDistance from "../utils/convertDistance";
import getDistance from "../utils/getDistance";

const Detail = () => {
	const { state } = useLocation();

	const {
		address,
		isContact,
		isRat,
		latitude,
		longitude,
		name,
		sat,
		status,
		subject,
		sun,
		tel,
		week,
	} = state.data;
	return state ? (
		<Background>
			<div className="infoWrap">
				<InfoBg className="info">
					<div className="dargArea">
						<More className="more" />
					</div>
					<Tag>
						{status === "진료중" && <div className="open">{status}</div>}
						{isContact && <div className="phoneCare">코로나 전화진료</div>}
						{isRat && (
							<div className="AntigenRapidTest">
								신속항원검사
								<Question />
							</div>
						)}
					</Tag>
					<Clinic className="clinicDetail">
						<h3>
							{name}
							<Medicons />
						</h3>
						<div className="timeAndDistance">
							<div className="time">
								<strong>오늘</strong>
								{week}
							</div>
							<div className="distance">
								현재 위치에서{" "}
								{convertDistance(
									getDistance(
										state.latlng.lat,
										state.latlng.long,
										latitude,
										longitude
									)
								)}{" "}
								| {subject}
							</div>
						</div>
						<h4>병원정보</h4>
						<div className="timetableAndLocation">
							<div className="timetable">
								<div className="left">
									<div className="leftCont">
										<Clock />
										진료시간
									</div>
								</div>
								<div className="right">
									<div className="weekday">평일 {week}</div>
									<div className="saturday">토요일 {sat}</div>
									<div className="sundayAndholiday">일요일/공휴일 {sun}</div>
									<div></div>
								</div>
							</div>
							<div className="location">
								<div className="left">
									<div className="leftCont">
										<Mappin />
										위치
									</div>
								</div>
								<div className="right">
									<div className="address">{address}</div>
								</div>
							</div>
						</div>
					</Clinic>
					<a className="phoneConnect" href={`tel:${tel}`}>
						<Phone />
						전화하기
					</a>
				</InfoBg>
			</div>
		</Background>
	) : (
		<h1>404 NOT FOUND</h1>
	);
};

export default Detail;

styled.body`
	@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

	height: 800px;
	width: 360px;
`;
const IconMenu = styled.div`
	position: absolute;
	bottom: 241px;
	margin-bottom: 20px;

	.mikeIcon {
		margin-left: 220px;
	}
`;
const InfoBg = styled.section`
	width: 100%;
	height: 465px;
	bottom: -197px;
	/* bottom: 0; */
	left: 0;
	background-color: #fff;
	box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2);
	border-radius: 20px 20px 0 0;
	transition: transform 150ms ease-out;
	position: fixed;
	.dargArea {
		text-align: center;
	}
	.phoneConnect {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 52px;
		width: 320px;
		border-radius: 6px;
		background-color: #2c4eb2;
		border: 0;
		box-shadow: 0 4px 4px -4px black;
		font-weight: 700;
		font-size: 18px;
		color: #fff;
		position: fixed;
		bottom: 14px;
		left: 0;
		margin: auto;
		right: 0;
	}
	.phoneConnect svg {
		margin-bottom: -4px;
	}
	.more {
		margin-top: 10px;
		margin-bottom: 10px;
	}
`;

const Tag = styled.div`
	margin-left: 20px;
	margin-top: -5px;
	font-size: 14px;
	font-weight: 700;
	display: flex;
	text-align: center;

	.open {
		color: #ff645e;
		width: 58px;
		height: 28px;
		background-color: rgba(252, 236, 235, 1);
		border-radius: 222px;
		margin-right: 8px;
		margin-left: 0;
		line-height: 2;
	}

	.phoneCare {
		width: 110px;
		height: 28px;
		background-color: #e8f3fe;
		border-radius: 222px;
		margin-right: 8px;
		margin-left: 0;
		color: rgba(37, 87, 255, 1);
		line-height: 2;
	}

	.AntigenRapidTest {
		width: 121px;
		height: 28px;
		background-color: rgba(255, 100, 94, 1);
		border-radius: 222px;
		margin-left: 0;
		color: #fff;
		line-height: 2;
	}
	.AntigenRapidTest svg {
		margin-left: 2px;
		margin-bottom: -3px;
	}
`;

const Clinic = styled.div`
	margin: 30px 20px 0 20px;
	text-align: left;
	font-size: 16px;
	font-weight: 400;
	h3 {
		font-size: 24px;
		margin-bottom: 0px;
	}

	h3 svg {
		margin-left: 2px;
		margin-bottom: -2px;
	}
	.timeAndDistance {
		color: #828282;
		margin-top: 8px;
	}
	.timeAndDistance .time strong {
		color: #3178ff;
		margin-right: 5px;
		font-weight: 400;
	}
	.distance {
		margin-top: 4px;
	}
	h4 {
		font-size: 20px;
		margin-top: 34px;
		margin-bottom: 16px;
	}
	.timetableAndLocation {
		margin-top: 16px;
		font-size: 16px;
	}
	.location,
	.timetable {
		display: inline-flex;
	}
	.location {
		margin-top: 23px;
	}
	.left {
		border-radius: 30px;
		height: 26px;
		padding: 0 8px 0 8px;
		background-color: #f7f8fa;
	}
	.right {
		margin-top: 4px;
		margin-left: 14px;
		color: #828282;
	}
	.saturday,
	.sundayAndholiday {
		margin-top: 6px;
	}

	.location > .right {
		margin-left: 43px;
	}
	.location > .left > .leftCont {
		width: 49px;
	}
	.leftCont > svg {
		margin-bottom: -3px;
	}
`;

const Background = styled.div`
	width: 100%;
	/* height: 100%; */
	position: fixed;
	background: rgba(0, 0, 0, 0.4);
	z-index: 101;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;
