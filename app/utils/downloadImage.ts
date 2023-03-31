import * as FileSystem from "expo-file-system";

export async function downloadImage(filename: string) {
    // const downloadResumable = FileSystem.createDownloadResumable(
    //   "https://www.w3schools.com/w3css/img_lights.jpg",
    //   FileSystem.documentDirectory + "img_lights.jpg"
    // );

    //  try {
    //    const res = await downloadResumable.downloadAsync();
    //    console.log(FileSystem.documentDirectory);
    //    console.log("Finished downloading to ", res?.uri);
    //  } catch (e) {
    //    console.error(e);
    //  }

  // FileSystem.downloadAsync(
  //   "https://www.w3schools.com/w3css/img_lights.jpg",
  //   FileSystem.documentDirectory + "img_lights.jpg"
  // )
  //   .then(({ uri }) => {
  //     console.log(
  //       "Finished downloading to ",
  //       uri,
        
  //     );
  //     console.log("这里sdf0", FileSystem.documentDirectory);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
}
