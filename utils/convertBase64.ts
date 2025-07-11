import * as FileSystem from 'expo-file-system';

const convertImageToBase64 = async (uri: string): Promise<string | null> => {
  if (!uri) {
    console.error("No URI provided.");
    return null;
  }

  try {
    // Check if the file exists at the given URI
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      console.error("File does not exist at the provided URI.");
      return null;
    }

    // Read the file as base64 string
    const base64Image = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Prefix the base64 string with the MIME type and return it
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
};

export default convertImageToBase64;
