import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

export async function getFileData(uri: string) {
  const content = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // const binaryData = `data:audio/m4a;base64,${content}`;
  const bufferData = Buffer.from(content, "base64");
  return bufferData;
}
