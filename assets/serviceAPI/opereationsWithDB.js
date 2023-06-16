import { dbPaths, storagePaths } from "../consts/paths";
import { sendPhotoToServer } from "../utils/sendImageToServer";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export const writeDataToFirestore = async (
  image,
  location,
  address,
  title,
  userId,
  name
) => {
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
      address,
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

export const getDataFromFirestore = async (userId) => {
  console.log(userId);
  const q = query(collection(db, "posts"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === userId) {
        posts.push(doc.data());
      }
    });
    return posts;
  });
};
