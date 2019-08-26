import forge from "node-forge";

type HexString = string;
export type T = HexString;

export const toHex = (bytes: string): HexString => {
  return forge.util.bytesToHex(bytes);
};

export const fromHex = (hex: HexString): string => {
  console.log({ hex });
  return forge.util.hexToBytes(hex);
};
