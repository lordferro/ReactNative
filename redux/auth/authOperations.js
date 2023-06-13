import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { authSignOut, authStateChange, updateUserProfile } = authSlice.actions;

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, { displayName: name });
      const { uid, displayName } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
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

    console.log(auth.currentUser);
    console.log("out");
  } catch (error) {
    console.log(error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          updateUserProfile({
            userId: user.uid,
            name: user.displayName,
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
