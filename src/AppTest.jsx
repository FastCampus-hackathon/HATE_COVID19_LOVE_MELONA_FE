import React, { useEffect, useState } from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps"; // 패키지 불러오기

const NaverMapAPI = ({ myLocation }) => {
  return (
    <NaverMap
      mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
      style={{
        width: "100vw", // 네이버지도 가로 길이
        height: "100vh", // 네이버지도 세로 길이
      }}
      defaultCenter={
        !myLocation ? { lat: 37.554722, lng: 126.970833 } : { lat, lng }
      } // 지도 초기 위치
      defaultZoom={13} // 지도 초기 확대 배율
    />
  );
};

const App = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    let lat, lng;
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          setLocation({ lat, lng });
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

  useEffect(() => {}, []);

  return (
    <>
      <button
        onClick={() => {
          getLocation();
        }}>
        내 위치
      </button>
      <RenderAfterNavermapsLoaded
        ncpClientId={"74yl0sp2v9"} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}>
        <NaverMapAPI myLocation={location} />
      </RenderAfterNavermapsLoaded>
    </>
  );
};

export default App;
