import { useState, useEffect } from "react";
import * as Location from "expo-location";

// Config otimizada para uso da CheckPlant, ja que o uso eh feito em grandes espacos e o uso de bateria precisa ser otimizado - alterar triggers de time e distance nao reduzem uso da bateria
//const ACCURACY = 4;

// Config otimizadas para desenvolvimento
const ACCURACY = 5;

export type Availability =
  | "pending"
  | "granted"
  | "denied"
  | "disabled"
  | "forbidden";
type GetLastKnownLocation = () => Promise<LocationPos | null>;

const useLocation = (): {
  availability: Availability;
  getLastKnownLocation: GetLastKnownLocation;
} => {
  const [availability, setAvailability] = useState<Availability>("pending");

  const checkAvailability = async () => {
    console.log("Checking location availability");

    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) return setAvailability("disabled");

    const result = await Location.requestPermissionsAsync();

    const { granted, canAskAgain } = result;
    if (!granted && !canAskAgain) return setAvailability("forbidden");
    if (!granted) return setAvailability("denied");

    if (granted) return setAvailability("granted");
  };

  const getLastKnownLocation: GetLastKnownLocation = async () => {
    if (availability !== "granted") return null;

    const location = await Location.getLastKnownPositionAsync();
    const { coords } = location;
    return coords;
  };

  useEffect(() => {
    checkAvailability();
  }, []);

  return { availability, getLastKnownLocation };
};

export default useLocation;
