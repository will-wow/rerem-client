import forge from "node-forge";

type HexString = string;
export type T = HexString;

export const toHex = (bytes: string): HexString => {
  return forge.util.bytesToHex(bytes);
};

export const fromHex = (hex: HexString): string => {
  return forge.util.hexToBytes(hex);
};

export const objectToHex = (object: any): HexString => {
  const json = JSON.stringify(object);
  return toHex(json);
};

export const objectFromHex = <T>(hex: HexString): T => {
  const json = fromHex(hex);
  return JSON.parse(json);
};
