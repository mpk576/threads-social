import React, { ReactElement } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Header(): ReactElement {
  const { currentUser } = useAuth();
  console.log("Current user", currentUser);
  return (
    <header>
      <ul>
        <h1>Threads Social</h1>
        {currentUser ? (
          <>
            <span>{currentUser.displayName}</span>
            <button>Sign out</button>
          </>
        ) : (
          <>
            <span>Please Sign in </span>
            <button>Sign in</button>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
