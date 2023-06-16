import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
import { sendPhotoToServer } from "../../assets/utils/sendImageToServer";
import { storagePaths } from "../../assets/consts/paths";

const { authSignOut, authStateChange, updateUserProfile } = authSlice.actions;

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignUpUser =
  ({ email, password, name, image }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const avatarUrl = await sendPhotoToServer(storagePaths.userAvatar, image);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: avatarUrl,
      });
      const { uid, displayName } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          photoURL: avatarUrl,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await auth.signOut();

    dispatch(authSignOut());

    console.log("out");
  } catch (error) {
    console.log(error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUserProfile({
            userId: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
          })
        );
        dispatch(authStateChange({ stateChange: true }));
      } else {
        console.log("User is signed out.");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
