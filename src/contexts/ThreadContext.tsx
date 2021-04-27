import React, { ReactElement, useContext, useEffect, useState } from "react";
import { auth, googleProvider, firestore } from "../config/Firebase";
import { User, UserCredential } from "@firebase/auth-types";

type ThreadProviderProps = {
  children: any;
};

type ThreadContextValues = {
  threads: [];
};

const ThreadContext = React.createContext();

function ThreadProvider({ children }: ThreadProviderProps): ReactElement {
  return <div></div>;
}

export default ThreadContext;
