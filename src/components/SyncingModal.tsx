import React, { FC } from "react";
import { Modal, View, Text, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

interface Props {
  isOpen?: boolean;
}

const SyncingModal: FC<Props> = ({ isOpen }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <Wrapper>
        <Box>
          <ActivityIndicator size="large" color="#AAAAAA" />
          <LoadingText>Sincronização em andamento...</LoadingText>
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
  align-items: center;
`;

const LoadingText = styled(Text)`
  margin-top: 10px;
`;

export default SyncingModal;
