import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const sendPhotoToServer = async (image) => {
  const res = await fetch(image);
  const file = await res.blob();

  const uniqePostId = Date.now().toString();

  const imageRef = ref(storage, `userAvatar/${uniqePostId}`);
  const uploadImage = await uploadBytes(imageRef, file);
    const imageUri = await getDownloadURL(uploadImage.ref);
    return imageUri;
};
