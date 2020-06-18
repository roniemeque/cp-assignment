import React, { FC, useState } from "react";
import { Dimensions } from "react-native";
import MapView, { Region, Marker } from "react-native-maps";

interface Props {
  points?: SavedPoint[];
  setFocusedPoint: (point: SavedPoint) => void;
}

const Map: FC<Props> = ({ points = [], setFocusedPoint }) => {
  const [followMode, setFollowMode] = useState(true);

  return (
    <MapView
      mapType="hybrid"
      showsUserLocation
      followsUserLocation={followMode}
      onUserLocationChange={(e) => {
        console.log("what");
        console.log(e.nativeEvent);
      }}
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    >
      {points.map((point) => (
        <Marker
          pinColor={point.syncedOn ? "#2ECC40" : "#AAAAAA"}
          key={point.createdOn}
          coordinate={point.coordinate}
          onPress={() => setFocusedPoint(point)}
        ></Marker>
      ))}
    </MapView>
  );
};

export default Map;
