import React, { FC } from "react";
import { Text, View } from "react-native";
import { Availability } from "../hooks/useLocation";

const TEXTS = {
  pending: "É preciso aprovar o serviço de localização",
  granted: "Seriviço de localização ok. Aguarde...",
  denied: "Uso de localização negada, altere as permissões do app.",
  disabled: "É preciso ativar o serviço de localização",
  forbidden: "Uso de localização negada, altere as permissões do app.",
};

interface Props {
  availability: Availability;
}

const AvailabilityMessage: FC<Props> = ({ availability }) => {
  return (
    <View>
      <Text>{TEXTS[availability]}</Text>
    </View>
  );
};

export default AvailabilityMessage;
