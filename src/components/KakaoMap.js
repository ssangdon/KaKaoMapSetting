import React, { useEffect, useState } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";

const positions = [
  {
    title: "테스트1",
    latlng: { lat: 37.5436025, lng: 127.0774438 },
  },
  {
    title: "테스트2",
    latlng: { lat: 37.5435608, lng: 127.0774101 },
  },
  {
    title: "테스트3",
    latlng: { lat: 37.5435698, lng: 127.0774131 },
  },
  {
    title: "테스트4",
    latlng: { lat: 33.451393, lng: 126.570738 },
  },
  {
    title: "테스트5",
    latlng: { lat: 37.498407, lng: 127.1454097 },
  },
  {
    title: "테스트6",
    latlng: { lat: 37.500407, lng: 127.1453497 },
  },
  {
    title: "테스트7",
    latlng: { lat: 37.494407, lng: 127.1453297 },
  },
  {
    title: "테스트8",
    latlng: { lat: 37.499907, lng: 127.1453447 },
  },
  {
    title: "테스트9",
    latlng: { lat: 37.499207, lng: 127.1453537 },
  },
];

const KakaoMap = () => {
  const [location, setLocation] = useState(null);
  const [isDrawerInfoOpened, setIsDrawerInfoOpened] = useState(false);
  useEffect(() => {
    let a = navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler
    );
  }, []);
  const successHandler = response => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const lat = response.coords.latitude;
    const lng = response.coords.longitude;
    setLocation({ lat, lng });
  };

  const errorHandler = error => {
    console.log("현재위치를 불러오지 못했습니다. 다시 시도해주세요.");
  };
  return (
    <div style={{ padding: "3%" }}>
      {location && (
        <Map // 지도를 표시할 Container
          center={{ lat: location.lat, lng: location.lng }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100vh",
          }}
          level={3} // 지도의 확대 레벨
        >
          <MapMarker position={{ lat: location.lat, lng: location.lng }}>
            <div
              style={{
                color: "#000",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              여기에 계신가용가리?
            </div>
          </MapMarker>
          {positions.map((position, index) => (
            <MapMarker
              key={`${position.title}-${position.latlng}`}
              position={position.latlng} // 마커를 표시할 위치
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35,
                }, // 마커이미지의 크기입니다
              }}
              title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              onClick={() => {
                setLocation(position.latlng);
                setIsDrawerInfoOpened(true);
              }}
            />
          ))}
          {isDrawerInfoOpened && (
            <div style={{ position: "absolute", top: "200px", zIndex: "1000" }}>
              123123
            </div>
          )}
        </Map>
      )}
    </div>
  );
};

export default KakaoMap;
