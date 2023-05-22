import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let a = navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler
    );
  }, []);
  const successHandler = response => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = error => {
    console.log("현재위치를 불러오지 못했습니다. 다시 시도해주세요.");
  };
  return (
    <>
      {location && (
        <Map // 지도를 표시할 Container
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "700px",
          }}
          level={3} // 지도의 확대 레벨
        />
      )}
    </>
  );
};

export default KakaoMap;
