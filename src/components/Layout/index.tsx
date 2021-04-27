import React, { ReactElement } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import Header from "../Header";
import Footer from "../Footer";
import Style from "./Layout.module.scss";

interface LayoutProps {
  children: Array<HTMLHtmlElement | ReactElement>;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <AuthProvider>
      <Header />
      <body className={Style.layout}>{children}</body>;
    </AuthProvider>
  );
}
