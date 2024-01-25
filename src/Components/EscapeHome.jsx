// import NavBarCustom from "../NavBar";
import { Tab, Tabs } from "@nextui-org/react";
import { FaShoppingCart } from "react-icons/fa";
import NavBarSite from "./NavBarSite";
import FleaMarket from "./FleaMarket";
// import FleaMarket from "./FleaMarket";
// import EscapeMappe from "./EscapeMappe";

function EscapeHome() {
  
  return (
    <>
      {/* <NavBarCustom /> */}
      <NavBarSite />
      <FleaMarket />
    </>
  );
}

export default EscapeHome;
