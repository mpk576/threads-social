import React, { ReactElement, useContext, useEffect, useState } from "react";
import { auth, googleProvider, firestore } from "../config/Firebase";
import { User, UserCredential } from "@firebase/auth-types";

type AuthProviderProps = {
  children: any;
};

export type AuthContextValues = {
  currentUser?: User | null;
  signUp?: (email: string, password: string) => Promise<UserCredential>;
  signIn?: (email: string, password: string) => Promise<UserCredential>;
  signUpNewUser?: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  googleLogin?: () => Promise<UserCredential>;
  logOut?: () => Promise<void>;
  addUserInfo?: (user: User) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValues>({
  currentUser: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);

  function signUp(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signUpNewUser(email: string, password: string, username: string) {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = auth.currentUser;
      return user.updateProfile({
        displayName: username,
      });
    });
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function googleLogin() {
    return auth.signInWithPopup(googleProvider);
  }

  function logOut() {
    return auth.signOut();
  }

  async function addUserInfo(user: User) {
    let exists = await userDocExists(user.uid);
    console.log(exists);
    if (!exists) {
      return firestore.collection("users").doc(user.uid).set({
        win: 0,
        loss: 0,
      });
    }
  }

  async function userDocExists(id: string): Promise<boolean> {
    const userDoc = await firestore.collection("users").doc(id).get();
    return userDoc.exists;
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsub;
  }, []);

  const value: AuthContextValues = {
    currentUser,
    signUp,
    signUpNewUser,
    signIn,
    googleLogin,
    logOut,
    addUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
