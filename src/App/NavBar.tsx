import React from "react";
import { useBitbucket } from "../bitbucket";

function NavBar() {
  const { logout, user } = useBitbucket();

  return (
    <div className="NavBar">
      <div>{user?.display_name}</div>
      <div>
        <button onClick={logout} className="button">
          Log out
        </button>
      </div>
    </div>
  );
}

export default NavBar;
