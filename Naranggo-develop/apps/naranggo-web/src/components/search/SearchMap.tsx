import { Stack, styled, IconButton } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Search from '@mui/icons-material/Search';
import { useRef, useCallback, useState } from 'react';
import MainMap from '../map/MainMap';
import RedMarker from '../common/map/RedMarker';

const SearchMap = () => {
  const searchBoxRef = useRef(null);
  const searchBox = useRef(null);
  const [searchData, setSearchData] = useState('');
  const [centerCoordinate, setCenterCoordinate] = useState<MapCoordinate>();
  const [searchResult, setSearchResult] = useState<
    google.maps.places.PlaceResult[]
  >([]);

  const onPlacesChanged = useCallback(
    (places: google.maps.places.PlaceResult[] | undefined) => {
      if (!places) {
        return;
      }

      setSearchResult(places);

      const selectedPlace = places[0];
      const place = selectedPlace?.geometry?.location;

      if (!place) {
        return;
      }

      setCenterCoordinate({
        lat: place.lat(),
        lng: place.lng()
      });
      setSearchData(selectedPlace.name || '');
    },
    []
  );

  const handleGoogleApiLoaded = (apiLoaded: HandleGoogleApiLoadedParam) => {
    initSeachBox(apiLoaded);
    addPlacesChangedListener();
  };

  const initSeachBox = ({ map, maps }: HandleGoogleApiLoadedParam) => {
    if (!map || !map.center) {
      return;
    }

    const center = map.center as google.maps.LatLng;

    //  0.001 -> 100m 내 결과 우선 검색
    const defaultBounds = {
      north: center.lat() + 0.001,
      south: center.lat() - 0.001,
      east: center.lng() + 0.001,
      west: center.lng() - 0.001
    };

    const option = {
      bounds: defaultBounds,
      componentRestrictions: { country: 'kr' },
      fields: ['geometry', 'name'],
      strictBounds: true
    };

    searchBox.current = new maps.places.SearchBox(searchBoxRef.current, option);
  };

  const addPlacesChangedListener = () => {
    if (!searchBox.current) {
      return;
    }

    (searchBox.current as google.maps.places.SearchBox).addListener(
      'places_changed',
      handleOnPlacesChanged
    );
  };

  const handleOnPlacesChanged = useCallback(() => {
    if (searchBox && searchBox.current) {
      onPlacesChanged(
        (searchBox.current as google.maps.places.SearchBox).getPlaces()
      );
    }
  }, [onPlacesChanged, searchBox]);

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };
  return (
    <Wrapper>
      <SearchInputWrapper>
        <IconButton
          aria-label="goback"
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowBack />
        </IconButton>
        <input
          ref={searchBoxRef}
          placeholder="장소를 입력해 주세요."
          value={searchData}
          onChange={handleChangeSearchInput}
        />
        <IconButton>
          <Search />
        </IconButton>
      </SearchInputWrapper>
      <MainMap
        searchResultCoordinate={centerCoordinate}
        handleGoogleApiLoaded={handleGoogleApiLoaded}
        onChangeMap={(mapChangeInformation) => {
          setCenterCoordinate(mapChangeInformation.center);
        }}
      >
        {searchResult.map((place: google.maps.places.PlaceResult) => {
          const { place_id, geometry } = place;

          const location = geometry?.location;

          if (!location) {
            return <></>;
          }

          return (
            <RedMarker
              key={place_id}
              lat={location.lat()}
              lng={location.lng()}
            />
          );
        })}
      </MainMap>
    </Wrapper>
  );
};

export default SearchMap;

const Wrapper = styled(Stack)({
  position: 'relative',
  width: '100%',
  height: '100%',
  '& input': {
    width: '100%',
    height: '3.5rem',
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    zIndex: '999',
    '&:focus-visible': {
      outline: 'none'
    }
  }
});

const SearchInputWrapper = styled(Stack)({
  flexDirection: 'row',
  borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
});
