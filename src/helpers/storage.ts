import { AsyncStorage } from "react-native";

const KEY_PREFIX = "@checkplant-app";

export const setStored = async (key: string, value: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(`${KEY_PREFIX}:${key}`, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getStored = async (key: string): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(`${KEY_PREFIX}:${key}`);

    if (!value) return null;

    return JSON.parse(value);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const clearStored = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(`${KEY_PREFIX}:${key}`);
    console.log("cleared", `${KEY_PREFIX}:${key}`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
