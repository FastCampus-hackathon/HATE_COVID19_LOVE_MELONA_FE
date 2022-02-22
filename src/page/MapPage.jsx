import React, { useEffect } from "react";
const { naver } = window;

const mapOptions = {
  center: new naver.maps.LatLng(37.3595704, 127.105399),
  zoom: 10,
};

const MainPage = () => {
  useEffect(() => {
    const map = new naver.maps.Map("map", mapOptions);
  }, []);

  return (
    <div id='map' style={{ width: "100%", height: "calc(100vh - 24em)" }}></div>
  );
};

export default MainPage;