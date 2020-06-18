import { useState, useEffect } from "react";
import { getStored, setStored, clearStored } from "../helpers/storage";
import useLocation from "./useLocation";
import { Alert } from "react-native";

const KEY = "savedPointsLocalKey";

export type AddNewPoint = (text: string) => void;
export type RemovePoint = (removing: SavedPoint) => void;
export type ClearPoints = () => void;

const useSavedPoints = (): [
  SavedPoint[],
  {
    addNewPoint: AddNewPoint;
    clearPoints: ClearPoints;
    removePoint: RemovePoint;
  }
] => {
  const [savedPoints, setSavedPoints] = useState<SavedPoint[]>([]);
  const { getLastKnownLocation } = useLocation();

  const clearPoints = async () => {
    setSavedPoints([]);
    setStored(KEY, []);
  };

  const removePoint = async (removing: SavedPoint) => {
    const updated = savedPoints.filter(
      (point) => point.createdOn !== removing.createdOn
    );

    console.log(removing.createdOn);
    console.log(updated);

    setSavedPoints(updated);
    setStored(KEY, updated);
  };

  const retrieveStored = async () => {
    const storedPoints = await getStored(KEY);
    if (!storedPoints || !storedPoints.length) return;

    setSavedPoints(storedPoints);
  };

  const addNewPoint: AddNewPoint = async (text) => {
    const location = await getLastKnownLocation();

    if (!location) {
      Alert.alert("Erro ao recuperar localização");
      close();
      return null;
    }

    const point = {
      coordinate: location,
      text,
      createdOn: Date.now(),
    };

    setSavedPoints([...savedPoints, point]);
    setStored(KEY, [...savedPoints, point]);
  };

  useEffect(() => {
    retrieveStored();
  }, []);

  return [savedPoints, { addNewPoint, clearPoints, removePoint }];
};

export default useSavedPoints;
