interface LocationPos {
  longitude: number;
  latitude: number;
}

interface SavedPoint {
  coordinate: LocationPos;
  text: string;
  createdOn: number;
  syncedOn?: number;
}
