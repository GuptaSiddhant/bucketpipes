import React from "react";
// import { useBitbucket } from "../bitbucket";
// import { Schema } from "../bitbucket/types";
import "./App.css";
import NavBar from "./NavBar";
import Repositories from "../pages/Repositories";

function App() {
  // const { logout, user } = useBitbucket();

  return (
    <div className="App">
      <NavBar />
      <Repositories />
    </div>
  );
}

export default App;
