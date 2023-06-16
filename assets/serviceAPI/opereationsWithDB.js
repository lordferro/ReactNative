import { dbPaths, storagePaths } from "../consts/paths";
import { sendPhotoToServer } from "../utils/sendImageToServer";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";


export const writeDataToFirestore = async (image, location, title, userId, name ) => {
  try {
    const postPictureUrl = await sendPhotoToServer(
      storagePaths.postsPictures,
      image
    );

    const docRef = await addDoc(collection(db, dbPaths.postsCollection), {
      location: {
        longitude: location.longitude,
        latitude: location.latitude,
      },
      postPictureUrl,
      title,
      userId,
      name,
    });
    console.log(docRef.id);
  } catch (error) {
    console.log(error.message);
  }
};
