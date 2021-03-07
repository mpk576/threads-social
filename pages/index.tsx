import { ReactElement } from "react";
import Layout from "../src/components/Layout";
import SignIn from "../src/components/SignIn";
import SignUp from "../src/components/SignUp";

export default function Home(): ReactElement {
  return (
    <Layout>
      <h1>Hi I'm in a layout</h1>
      <SignIn />
      <SignUp />
    </Layout>
  );
}
