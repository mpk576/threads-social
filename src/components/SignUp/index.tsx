import { useState, useRef, ReactElement } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUp(): ReactElement {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, signUpNewUser } = useAuth();
  const usernameInput = useRef<HTMLInputElement>();
  const emailInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();
  const passwordRepeatInput = useRef<HTMLInputElement>();

  function validEmail(email: string): boolean {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
  }

  function passwordMatch(password: string, repeat: string): boolean {
    return password === repeat;
  }

  function allFieldsFilled(
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
  ) {
    return (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      passwordRepeat.length > 0
    );
  }

  async function handleSignUp() {
    setLoading(false);
    setError(null);
    const username = usernameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const passwordRepeat = passwordRepeatInput.current.value;

    if (allFieldsFilled(username, email, password, passwordRepeat)) {
      if (validEmail(email)) {
        if (passwordMatch(password, passwordRepeat)) {
          try {
            await signUpNewUser(email, password, username);
            console.log("success account created");
            setLoading(false);
          } catch (err) {
            console.error(err);
            setError("Sorry there was an error creating your account");
          }
        } else {
          setError("Passwords to not match");
        }
      } else {
        setError("invalid email address");
      }
    } else {
      setError("Please fill out all fields");
    }
  }

  return (
    <section className="signup">
      {error && <span className="signup__error">{error}</span>}
      <input
        ref={usernameInput}
        type="text"
        className="signup__username"
        placeholder="Enter username"
      />
      <input
        ref={emailInput}
        type="email"
        className="signup__email"
        placeholder="Enter email address"
      />
      <input
        ref={passwordInput}
        type="password"
        className="signup__password"
        placeholder="Enter password "
      />
      <input
        ref={passwordRepeatInput}
        type="password"
        className="signup__password-repeat"
        placeholder="Repeat password"
      />
      <button onClick={() => handleSignUp()}>Sign up</button>
      <span>
        Don't have an account? Sign up <a href="/sign-in">here</a>
      </span>
      <button className="sign-up__google">Sign in with google</button>
    </section>
  );
}
