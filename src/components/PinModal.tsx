import React, { FC } from "react";
import { Modal, View, Text } from "react-native";
import styled from "styled-components/native";
import CustomButton from "./CustomButton";
import { RemovePoint } from "../hooks/useSavedPoints";
import { format } from "date-fns";

interface Props {
  isOpen?: boolean;
  close: () => void;
  point: SavedPoint | null;
  removePoint: RemovePoint;
}

const PinModal: FC<Props> = ({ isOpen, close, point, removePoint }) => {
  if (!point) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => close()}
    >
      <Wrapper>
        <Box>
          <Top>
            <SyncText synced={!!point.syncedOn}>
              {point.syncedOn ? "Sincronizado" : "Não sincronizado"}
            </SyncText>
            <Text>{format(new Date(point.createdOn), "dd/MM hh:mm")}</Text>
          </Top>
          <Body>{point.text}</Body>
          <ActionWrapper>
            <CustomButton
              title="Remover"
              color="#FF4136"
              onPress={() => {
                removePoint(point);
                close();
              }}
            ></CustomButton>
            <CustomButton title="Fechar" onPress={() => close()}></CustomButton>
          </ActionWrapper>
        </Box>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Box = styled(View)`
  padding: 20px;
  background: white;
  border-radius: 5px;
  width: 300px;
  max-width: 98%;
  max-height: 98%;
`;

const ActionWrapper = styled(View)`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const Top = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Body = styled(Text)`
  margin-top: 10px;
`;

const SyncText = styled(Text)<{ synced: boolean }>`
  color: ${(p) => (p.synced ? "#2ECC40" : "#111111")};
`;

export default PinModal;
