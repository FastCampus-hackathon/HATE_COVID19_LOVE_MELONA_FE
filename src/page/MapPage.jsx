import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import styled from "styled-components";
import {
  Hospital,
  Phone,
  Check,
  Cross,
  Micro,
  HpMark,
  HpMarkClicked,
  Current,
  Think,
  Chev,
  Plus,
  Minus,
} from "../assets";
import { Input, Wrapper, ImageBox } from "../elements";

const { naver } = window;

let map;

const MapPage = () => {
  const [data, setData] = useState([]);
  const [level, setLevel] = useState(15);
  const [filtered, setFilter] = useState(null);
  const [location, setLocation] = useState(null);
  const [first, setFirst] = useState(true);
  const [open, setOpen] = useState(false);
  const [pcr, setPcr] = useState(false);
  const [phone, setPhone] = useState(false);

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

  const getLocation = () => {
    let lat, long;
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          setLocation({ lat, long });
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

  useEffect(() => {
    if (!location) {
      map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.5666805, 126.9784147),
        zoom: level,
      });
    }
    getData();
  }, []);

  const drawMarker = (type) => {
    if (location && data.length) {
      const { lat, long } = location;

      map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(lat, long),
        zoom: level,
      });

      var defaultMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, long),
        map: map,
        icon: {
          content: `<img src=${Current} draggable="false" unselectable="on" >`,
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35),
        },
      });

      if (filtered) {
        filtered.forEach((data) => {
          const { latitude, longitude } = data;

          if (latitude && longitude) {
            var defaultMarker = new naver.maps.Marker({
              position: new naver.maps.LatLng(latitude, longitude),
              map: map,
              icon: {
                content: `<img src=${
                  type ? type : HpMark
                } draggable="false" unselectable="on" >`,
                size: new naver.maps.Size(22, 35),
                anchor: new naver.maps.Point(11, 35),
              },
            });
          }
        });
      } else {
        data.forEach((data) => {
          const { latitude, longitude } = data;

          if (latitude && longitude) {
            var defaultMarker = new naver.maps.Marker({
              position: new naver.maps.LatLng(latitude, longitude),
              map: map,
              icon: {
                content: `<img src=${
                  type ? type : HpMark
                } draggable="false" unselectable="on" >`,
                size: new naver.maps.Size(22, 35),
                anchor: new naver.maps.Point(11, 35),
              },
            });
          }
        });
      }
    }

    if (!location && data.length) {
      map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.5666805, 126.9784147),
        zoom: level,
      });

      data.forEach((data) => {
        const { latitude, longitude } = data;

        if (latitude && longitude) {
          var defaultMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: map,
            icon: {
              content: `<img src=${
                type ? type : HpMark
              } draggable="false" unselectable="on" >`,
              size: new naver.maps.Size(22, 35),
              anchor: new naver.maps.Point(11, 35),
            },
          });
        }
      });
    }
  };

  if (first && !location && data.length) {
    map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.5666805, 126.9784147),
      zoom: level,
    });

    data.forEach((data) => {
      const { latitude, longitude } = data;

      if (latitude && longitude) {
        var defaultMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: map,
          icon: {
            content: `<img src=${HpMark} draggable="false" unselectable="on" >`,
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35),
          },
        });
      }
    });
  }

  if (first && location && data.length) {
    const { lat, long } = location;

    map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(lat, long),
      zoom: level,
    });

    var defaultMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, long),
      map: map,
      icon: {
        content: `<img src=${Current} draggable="false" unselectable="on" >`,
        size: new naver.maps.Size(22, 35),
        anchor: new naver.maps.Point(11, 35),
      },
    });

    data.forEach((data) => {
      const { latitude, longitude } = data;

      if (latitude && longitude) {
        var defaultMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: map,
          icon: {
            content: `<img src=${HpMark} draggable="false" unselectable="on" >`,
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35),
          },
        });
      }
    });
  }

  return (
    <>
      <div
        id='map'
        style={{
          width: "100%",
          height: "calc(100vh - 48em)",
        }}>
        <Input width='328em' />
        <Container>
          <Wrapper
            image={Check}
            text='진료 중'
            select={open}
            _onClick={() => {
              setFirst(false);
              if (open) {
                setOpen(false);
                setFilter((d) => null);
                drawMarker();
              } else {
                setOpen(true);
                setPcr(false);
                setPhone(false);
                drawMarker(Check);
              }
            }}
          />
          <Wrapper
            image={Hospital}
            text='PCR'
            select={pcr}
            _onClick={() => {
              setFirst(false);
              if (pcr) {
                setPcr(false);
                setFilter((d) => null);
                drawMarker();
              } else {
                setOpen(false);
                setPcr(true);
                setPhone(false);
                const p = data.filter((d) => d.isPcr);
                setFilter(p);

                drawMarker(Hospital);
              }
            }}
          />
          <Wrapper
            image={Phone}
            text='코로나 전화진료'
            select={phone}
            _onClick={() => {
              setFirst(false);
              if (phone) {
                setPhone(false);
                setFilter((d) => null);
                drawMarker();
              } else {
                setOpen(false);
                setPcr(false);
                setPhone(true);
                const p = data.filter((d) => d.isContact);
                setFilter(p);
                drawMarker(Phone);
              }
            }}
          />
        </Container>
        <Mic>
          <ImageBox width='30em' height='30em' image={Micro} />
        </Mic>
        <FindLocation
          onClick={() => {
            getLocation();
          }}>
          <ImageBox width='30em' height='30em' image={Cross} />
        </FindLocation>
        <MoreInfo>
          <ImageBox
            position='absolute'
            left='5em'
            image={Think}
            width='18em'
            height='18em'
          />
          <Typo>‘호흡기전담진료’ 알아보기</Typo>
          <ImageBox
            image={Chev}
            position='absolute'
            right='-3.5em'
            width='24em'
            height='24em'
          />
        </MoreInfo>
        <BtnContainer>
          <Upper
            onClick={() => {
              setLevel(level + 1);
            }}>
            <ImageBox image={Plus} width='22.58em' height='22.58em' />
          </Upper>
          <Down
            onClick={() => {
              setLevel(level - 1);
            }}>
            <ImageBox image={Minus} width='22.58em' />
          </Down>
        </BtnContainer>
      </div>
    </>
  );
};

export default MapPage;

const Container = styled.div`
  max-width: 342em;
  overflow-y: auto;
  display: flex;
  padding: 20em 0 20em 0;
  z-index: 10;
  position: absolute;
  top: 70.5em;
  left: 18em;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
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
  z-index: 10;
  position: absolute;
  bottom: 43.75em;
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
  bottom: 108em;
  left: 18em;
  background-color: #2c4eb2;
`;

const MoreInfo = styled.div`
  width: 264em;
  height: 48em;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 10;
  position: absolute;
  bottom: 42em;
  left: 18em;
  border-radius: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Typo = styled.p`
  color: #2c4eb2;
  font-family: Noto Sans;
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
  bottom: 172em;
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
