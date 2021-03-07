import { useState, useRef, ReactElement } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function SignIn(): ReactElement {
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const emailInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();

  function validEmail(email: string): boolean {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
  }

  async function handleSignIn() {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    if (validEmail(email) && password.length >= 8) {
      try {
        await signIn(email, password);
        console.log("success!");
      } catch (err) {
        console.error(err);
      }
    } else {
      setError("Invalid email or password length ");
    }
  }

  return (
    <section className="sign-in">
      {error && <span className="sign-in__error">{error}</span>}
      <input ref={emailInput} type="email" className="sign-in__email" />
      <input
        ref={passwordInput}
        type="password"
        className="sign-in__password"
      />
      <button className="sign-in__button" onClick={() => handleSignIn()}>
        Sign-in
      </button>
      <span>
        Don't have an account? Sign up <a href="/sign-up">here</a>
      </span>
      <button className="login__google">Sign-in with Google</button>
    </section>
  );
}
