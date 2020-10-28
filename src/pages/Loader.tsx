import React from "react";
import { HeaderBar } from "../components";

const Pipelines = () => {
  const caption = "Loading...";
  const title = "BucketPipes";

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <HeaderBar title={title} caption={caption} />
      <div>Loading...</div>
    </main>
  );
};

export default Pipelines;
