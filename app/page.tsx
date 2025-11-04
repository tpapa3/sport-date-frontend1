'use client'
import Footer from "./components/footer";
import Body from "./components/body";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import BodyLayout from "./components/bodyLayout";
// import { getSession } from "./serverSession/session";
import { useState } from "react";
import Loading from "./components/loading";

export default function Home() {
  // const session = await getSession();
  const [loading,setLoading] = useState(true);
  return (
    <>
      <BodyLayout overflow="hidden" setLoading={setLoading}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Header  />
            <Sidebar />
            <Body />
            <Footer />
          </>
        )}
      </BodyLayout>
    </>
  );
}
