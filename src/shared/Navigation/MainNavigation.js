import React from "react";

import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";

function MainNavigation(props) {
  return (
    <React.Fragment>
      <MainHeader>
        <NavLinks />
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
