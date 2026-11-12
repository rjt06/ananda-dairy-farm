import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

let currentUser = null;
let isAuthReady = false;
const listeners = [];
let resolveAuth;

export const authReady = new Promise(resolve => (resolveAuth = resolve));

onAuthStateChanged(auth, user => {
  currentUser = user;
  isAuthReady = true;
  resolveAuth(user);
  listeners.forEach(callback => callback(user));
});

export const getCurrentUser = () => currentUser;

export const getAuthReady = () => isAuthReady;

export const subscribeToAuth = callback => {
  listeners.push(callback);
  if (isAuthReady) {
    callback(currentUser);
  }
  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) listeners.splice(index, 1);
  };
};
