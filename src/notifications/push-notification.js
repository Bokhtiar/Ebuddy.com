/** @format */

import firebase from "firebase";
import { firebaseCredential } from "./firebase.credential";

export const initializeFirebase = () => {
  firebase.initializeApp({ ...firebaseCredential });
};

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();

    return token;
  } catch (error) {
    console.error("fcm", error);
    // console.clear();
  }
};
export const getNotifications = (callback) => {
  try {
    const messaging = firebase.messaging();
    messaging.onMessage((payload) => {
      callback(payload);
    });
  } catch (error) {
    console.error(error);
    // console.clear();
  }
};
