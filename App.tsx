import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import styled from "styled-components/native";
import AddPointModal from "./src/components/AddPointModal";
import CustomButton from "./src/components/CustomButton";
import Map from "./src/components/Map";
import useLocation from "./src/hooks/useLocation";
import useSavedPoints from "./src/hooks/useSavedPoints";
import PinModal from "./src/components/PinModal";
import SyncingModal from "./src/components/SyncingModal";

export default function App() {
  const { availability } = useLocation();
  const [
    points,
    syncing,
    { addNewPoint, removePoint, syncPoints },
  ] = useSavedPoints();
  const [isAdding, setIsAdding] = useState(false);
  const [focusedPoint, setFocusedPoint] = useState<SavedPoint | null>(null);

  if (availability !== "granted") {
    return (
      <Container>
        <Text>{availability}</Text>
      </Container>
    );
  }

  const hasPointsToSync = points.some((point) => !point.syncedOn);

  return (
    <Container>
      <Map setFocusedPoint={setFocusedPoint} points={points}></Map>
      <Actions>
        <CustomButton
          title={syncing ? "Aguarde..." : "Sincronizar"}
          onPress={() => syncPoints()}
          disabled={!hasPointsToSync || syncing}
        ></CustomButton>
        <CustomButton
          title="Adicionar"
          onPress={() => setIsAdding(true)}
        ></CustomButton>
        {/* <CustomButton title="X" onPress={() => clearPoints()}></CustomButton> */}
      </Actions>
      <AddPointModal
        addPoint={addNewPoint}
        isOpen={isAdding}
        close={() => setIsAdding(false)}
      ></AddPointModal>
      <PinModal
        removePoint={removePoint}
        point={focusedPoint}
        isOpen={!!focusedPoint}
        close={() => setFocusedPoint(null)}
      ></PinModal>
      <SyncingModal isOpen={syncing}></SyncingModal>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Actions = styled(View)`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;
