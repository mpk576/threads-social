import React, { ReactElement } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import Style from "./Layout.module.scss";

interface LayoutProps {
  children: Array<HTMLHtmlElement | ReactElement>;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <AuthProvider>
      <body className={Style.layout}>{children}</body>;
    </AuthProvider>
  );
}
