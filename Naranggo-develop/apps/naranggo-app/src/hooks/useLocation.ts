import { useEffect, useState } from 'react';
import GeoLocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

const useLocation = () => {
  const [latestLatitude, setLatestLatitude] = useState(0);
  const [latestLongitude, setLatestLongitude] = useState(0);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }, []);

  useEffect(() => {
    setInterval(() => {
      GeoLocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;

        setLatestLatitude(latitude);
        setLatestLongitude(longitude);
      });
    }, 3000);
  }, []);

  return { latitude: latestLatitude, longitude: latestLongitude };
};

export default useLocation;
