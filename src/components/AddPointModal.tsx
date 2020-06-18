import React, { FC, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from "react-native";
import styled from "styled-components/native";
import CustomButton from "./CustomButton";
import { AddNewPoint } from "../hooks/useSavedPoints";

interface Props {
  addPoint: AddNewPoint;
  isOpen?: boolean;
  close: () => void;
}

const AddPointModal: FC<Props> = ({ isOpen, close, addPoint }) => {
  const [text, setText] = useState("");

  const onSave = () => {
    addPoint(text);
    close();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => close()}
    >
      <Wrapper>
        <Box>
          <Input
            multiline
            numberOfLines={4}
            onChangeText={(value) => setText(value)}
            value={text}
            editable
            placeholder="Notas"
          ></Input>
          <ActionWrapper>
            <CustomButton
              title="Cancelar"
              onPress={() => close()}
              hasBackground={false}
            ></CustomButton>
            <CustomButton title="Salvar" onPress={onSave}></CustomButton>
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
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled(TextInput)`
  border: 1px solid #dddddd;
  height: 120px;
  margin: 10px 0;
`;

export default AddPointModal;
