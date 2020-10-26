import React from "react";
import { useBitbucket } from "../bitbucket";
import { HeaderBar } from "../components";

function NavBar() {
  const { logout, user } = useBitbucket();

  return (
    <div className="NavBar">
      <HeaderBar caption="BucketPipes" title={user?.display_name || ""} />

      <div>
        <button onClick={logout} className="button">
          Log out
        </button>
      </div>
    </div>
  );
}

export default NavBar;
