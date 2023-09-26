import { useState, useEffect } from 'react';
import { Container as MapDiv, NaverMap, useNavermaps, InfoWindow } from 'react-naver-maps';


const Map = () => {

  const navermaps = useNavermaps(null)
  const [map, setMap] = useState(null)
  const [infowindow, setInfoWindow] = useState(null)

  function onSuccessGeolocation ( position ) {
    if( !map || !infowindow ) return

    const location = new navermaps.LatLng(
      position.coords.latitude,
      position.coords.longitude,
    )

    map.setCenter(location)
    map.setZoom(15)

    infowindow.setContent(
      '<div style="padding:10px;">' +
        '내 위치' +
        '</div>',
    )
    
    infowindow.open(map, location)
    console.log('Coordinates: ' + location.toString())
  }

  function onErrorGeolocation() {
    if (!map || !infowindow) return

    const center = map.getCenter()
    infowindow.setContent(
      '<div style="padding:10px;">' +
        '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>' +
        'latitude: ' +
        center.lat() +
        '<br />longitude: ' +
        center.lng() +
        '</div>',
    )
    infowindow.open(map, center)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation,
      )
    } else {
      const center = map.getCenter()
      infowindow.setContent(
        '<div style="padding:10px;"><h5 style="margin-bottom:5px;color:#f00;">지원하지 않는 위치</h5></div>',
      )
      infowindow.open(map, center)
    }
  }

  useEffect(() => {
    if (!map || !infowindow) return

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation,
      )

      console.log(navigator.geolocation.getCurrentPosition( onSuccessGeolocation, onErrorGeolocation))
    } else {
      const center = map.getCenter()
      infowindow.setContent(
        '<div style="padding:10px;"><h5 style="margin-bottom:5px;color:#f00;">지원하지 않는 위치</h5></div>',
      )
      infowindow.open(map, center)
    }
  }, [map, infowindow])

  return (
    <>
      <MapDiv
        style={{
          position: 'relative',
          width: '100%',
          height: '600px',
        }}
      >
        <NaverMap
          // uncontrolled KVO
          defaultZoom={20}
          defaultCenter={new navermaps.LatLng(37.498095, 127.027610)}
          // controlled KVO
          defaultMapTypeId={navermaps.MapTypeId.NORMAL}
          ref={setMap}
        >
          <InfoWindow ref={setInfoWindow} />
        </NaverMap>
      </MapDiv>
    </>

  );

};

export default Map;