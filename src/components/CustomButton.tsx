import React, { FC } from "react";
import styled, { css } from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  hasBackground?: boolean;
}

const CustomButton: FC<Props> = ({
  title,
  onPress,
  disabled = false,
  hasBackground = true,
  color = "#0071f3",
}) => {
  return (
    <Outer
      hasBackground={hasBackground}
      color={color}
      disabled={disabled}
      onPress={() => !disabled && onPress()}
    >
      <Inner disabled={disabled} hasBackground={hasBackground}>
        {title}
      </Inner>
    </Outer>
  );
};

const Outer = styled(TouchableOpacity)<{
  color: string;
  hasBackground: boolean;
  disabled?: boolean;
}>`
  padding: 8px 14px;
  margin: 0 5px;

  ${(p) =>
    p.hasBackground &&
    css`
      background: ${p.disabled ? "#DDDDDD" : p.color};
      border-radius: 5px;
    `}
`;

const Inner = styled(Text)<{ hasBackground: boolean; disabled: boolean }>`
  color: ${(p) =>
    p.hasBackground ? (p.disabled ? "#AAAAAA" : "#fff") : "#999"};
`;

export default CustomButton;
