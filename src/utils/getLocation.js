const tell = (d) => {
  console.log(d);
};

function getLocation() {
  let lat, long;
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
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
}

export default getLocation;
