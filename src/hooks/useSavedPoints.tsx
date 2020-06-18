import { useState, useEffect } from "react";
import { getStored, setStored, clearStored } from "../helpers/storage";
import useLocation from "./useLocation";
import { Alert } from "react-native";
import { format } from "date-fns";

const KEY = "savedPointsLocalKey";

export type AddNewPoint = (text: string) => void;
export type RemovePoint = (removing: SavedPoint) => void;
export type ClearPoints = () => void;
export type SyncPoints = () => void;

const useSavedPoints = (): [
  SavedPoint[],
  boolean,
  {
    addNewPoint: AddNewPoint;
    clearPoints: ClearPoints;
    removePoint: RemovePoint;
    syncPoints: SyncPoints;
  }
] => {
  const [savedPoints, setSavedPoints] = useState<SavedPoint[]>([]);
  const [syncing, setSyncing] = useState(false);
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

  const syncPoints = async () => {
    setSyncing(true);

    const notSynced = savedPoints.filter((point) => !point.syncedOn);

    const results = await Promise.all(
      notSynced.map(async (point) => {
        try {
          const res = await fetch(
            `https://hooks.zapier.com/hooks/catch/472009/09rj5z/?
        email_key=roniemeque@icloud.com`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                latitude: point.coordinate.latitude,
                longitude: point.coordinate.longitude,
                annotation: point.text,
                datetime: format(
                  new Date(point.createdOn),
                  "yyyy-MM-dd hh:mm:ss"
                ),
              }),
            }
          );
          const { status } = await res.json();
          console.log(status);

          return status === "success" ? point.createdOn : null;
        } catch (error) {
          console.error(error);
          return null;
        }
      })
    );

    const successful = results.filter((result) => result);
    const updated = savedPoints.map((point) => {
      if (!successful.includes(point.createdOn)) return point;
      return {
        ...point,
        syncedOn: Date.now(),
      };
    });

    setSavedPoints(updated);
    setStored(KEY, updated);
    setSyncing(false);
  };

  useEffect(() => {
    retrieveStored();
  }, []);

  return [
    savedPoints,
    syncing,
    { addNewPoint, clearPoints, removePoint, syncPoints },
  ];
};

export default useSavedPoints;
