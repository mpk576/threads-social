import React, { ReactElement } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Styles from "./GoogleSignIn.scss";

interface Props {}

function GoogleSignIn({}: Props): ReactElement {
  const { googleLogin } = useAuth();

  async function handleGoogleSignIn() {
    try {
      await googleLogin();
    } catch (error) {}
  }
  return (
    <div>
      <button onClick={() => googleLogin()}>Sign in with Google</button>
    </div>
  );
}

export default GoogleSignIn;
