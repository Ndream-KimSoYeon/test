interface HandleGoogleApiLoadedParam {
  map: google.maps.MapOptions;
  maps: google.maps;
  ref: Element | null;
}

interface MapChangeInformation {
  bounds: {
    ne: MapCoordinate;
    nw: MapCoordinate;
    se: MapCoordinate;
    sw: MapCoordinate;
  };
  marginBounds: {
    ne: MapCoordinate;
    nw: MapCoordinate;
    se: MapCoordinate;
    sw: MapCoordinate;
  };
  size: {
    width: number;
    height: number;
  };
  center: MapCoordinate;
  zoom: number;
}

interface MapCoordinate {
  lat: number;
  lng: number;
}

interface Marker {
  lat: number;
  lng: number;
  representative: string;
}

interface MapViewportInformation extends MapCoordinate {
  latDelta: number;
  lngDelta: number;
}

type CustomMarkerInfor = Pick<
  ClusteredMarker,
  'lat' | 'lng' | 'representative' | 'numberOfMarkers'
>;
