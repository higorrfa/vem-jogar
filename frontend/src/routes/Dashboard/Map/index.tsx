/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-no-useless-fragment */

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface GroupsInterface {
  id: number;
  name: string;
  sport: string;
  minimumAge: number;
  isPrivate: boolean;
  isFree: boolean;
  value: number;
  address: string;
  additionalInformation: string;
  adminId: number;
}

interface MapProps {
  groups: GroupsInterface[] | undefined;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Map: React.FC<MapProps> = ({ groups }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDwNkVbS7FwWalNDlV72vNiXv0gzl-haeU',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<JSX.Element[]>([]);
  const [center, setCenter] = useState({ lat: -7.23072, lng: -35.8817 });

  const onLoad = (mapInstance: google.maps.Map | null) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log('Erro ao obter a localização');
        },
      );
    } else {
      console.log('Geolocalização não suportada pelo navegador');
    }
  }, []);

  useEffect(() => {
    if (isLoaded && map && groups) {
      const geocoder = new google.maps.Geocoder();
      const promises: Promise<JSX.Element | null>[] = [];

      groups.forEach(group => {
        promises.push(
          new Promise(resolve => {
            geocoder.geocode({ address: group.address }, (results, status) => {
              if (status === 'OK' && results?.[0]?.geometry?.location) {
                const position = {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                };
                const marker = (
                  <Marker
                    key={group.id}
                    position={position}
                    onLoad={marker => {
                      const infowindow = new google.maps.InfoWindow({
                        content: `
                        <div>
                          <h2>${group.name}</h2>
                          <p><b>Esporte:</b> ${group.sport}</p>
                          <p><b>Valor:</b> ${group.value} reais</p>
                          <p><b>Idade Mínima:</b> ${group.minimumAge} anos</p>
                        </div>
                      `,
                      });
                      marker.addListener('click', () => {
                        infowindow.open(map, marker);
                      });
                    }}
                  />
                );
                resolve(marker);
              } else {
                resolve(null);
              }
            });
          }),
        );
      });

      Promise.all(promises).then(newMarkers => {
        const filteredMarkers = newMarkers.filter(
          marker => marker !== null,
        ) as JSX.Element[];
        setMarkers(filteredMarkers);
      });
    } else {
      setMarkers([]);
    }
  }, [isLoaded, map, groups]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeId: 'roadmap',
      }}
    >
      {markers}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
