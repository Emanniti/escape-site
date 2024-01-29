import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import EscapeLogo from "../assets/pngimg.com - escape_from_tarkov_PNG20.png";
import { Fragment, useEffect, useState } from "react";
import { formatHMS } from "./Utils/utils";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ImTree } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import { GiAmmoBox } from "react-icons/gi";
import { FaToolbox } from "react-icons/fa";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

const tarkovRatio = 7;

export function hrs(num) {
  return 1000 * 60 * 60 * num;
}

function TarkovCurrentTime({ tarkovTime }) {
  return <Fragment>{formatHMS(tarkovTime)}</Fragment>;
}

function TarkovCurrentTimeElement({ tarkovTime, left }) {
  return <TarkovCurrentTime tarkovTime={tarkovTime} />;
}

export function realTimeToTarkovTime(time, left) {
  const oneDay = hrs(24);
  const russia = hrs(3);

  const offset = russia + (left ? 0 : hrs(12));
  const tarkovTime = new Date((offset + time.getTime() * tarkovRatio) % oneDay);
  return tarkovTime;
}

export function timeUntilRelative(until, left, date) {
  const tarkovTime = realTimeToTarkovTime(date, left);
  if (until < tarkovTime.getTime()) until += hrs(24);

  const diffTarkov = until - tarkovTime.getTime();
  const diffRT = diffTarkov / tarkovRatio;

  return diffRT;
}

export function Scroller({ isLeft, time }) {
  const tarkovTime = realTimeToTarkovTime(time, isLeft);
  return <TarkovCurrentTimeElement tarkovTime={tarkovTime} left={isLeft} />;
}

function NavBarSite() {
  const [time, setTime] = useState(new Date());
  const [openMenu, setOpenMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 50);
  }, []);

  return (
    <>
      <BrowserView>
        <Navbar isBlurred isBordered className="min-h-[100px]">
          <NavbarBrand>
            <Image width={100} alt="NextUI hero Image" src={EscapeLogo} />
            <p className="font-bold text-inherit text-3xl text-white">Escape Market</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-1" justify="center">
            <NavbarItem>
              <Link color="foreground" href="/">
                <Button startContent={<FaShoppingCart />} variant="light">
                  Flea Market
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/ammo">
                <Button startContent={<GiAmmoBox />} variant="light">
                  Ammo
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                <Dropdown className="-mt-3 bg-slate-900" isOpen={openMenu}>
                  <DropdownTrigger>
                    <Button
                      onMouseEnter={() => setOpenMenu(true)}
                      onMouseLeave={() => setOpenMenu(false)}
                      endContent={openMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      variant="light"
                    >
                      Quest
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    onMouseEnter={() => setOpenMenu(true)}
                    onMouseLeave={() => setOpenMenu(false)}
                    variant="light"
                    aria-label="Static Actions"
                  >
                    <DropdownSection aria-label="Profile & Actions">
                      <DropdownItem href="questHome" key="new" startContent={<ImTree className="text-lg" />}>
                        Quest List
                      </DropdownItem>
                      <DropdownItem href="questItems" key="copy" startContent={<FaToolbox className="text-lg" />}>
                        Quest Items
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <div className="flex flex-nowrap gap-2">
                <div>
                  <Scroller isLeft={true} time={time} />
                </div>
                <div>
                  <Scroller isLeft={false} time={time} />
                </div>
                <span className="text-yellow-600">Raid Time</span>
              </div>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </BrowserView>
      <MobileView>
        <Navbar onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent>
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          <p className="font-bold text-inherit">Escape Market</p>
          </NavbarContent>
          <NavbarMenu>
            <NavbarMenuItem>
              <Link color="foreground" href="/">
                <Button startContent={<FaShoppingCart />} variant="light">
                  Flea Market
                </Button>
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link color="foreground" href="/ammo">
                <Button startContent={<GiAmmoBox />} variant="light">
                  Ammo
                </Button>
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link color="foreground" href="#">
                <Dropdown className="-mt-3 bg-slate-900" isOpen={openMenu}>
                  <DropdownTrigger>
                    <Button
                      onMouseEnter={() => setOpenMenu(true)}
                      onMouseLeave={() => setOpenMenu(false)}
                      endContent={openMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      variant="light"
                    >
                      Quest
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    onMouseEnter={() => setOpenMenu(true)}
                    onMouseLeave={() => setOpenMenu(false)}
                    variant="light"
                    aria-label="Static Actions"
                  >
                    <DropdownSection aria-label="Profile & Actions">
                      <DropdownItem href="questHome" key="new" startContent={<ImTree className="text-lg" />}>
                        Quest List
                      </DropdownItem>
                      <DropdownItem href="questItems" key="copy" startContent={<FaToolbox className="text-lg" />}>
                        Quest Items
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </Link>
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      </MobileView>
    </>
  );
}

export default NavBarSite;
