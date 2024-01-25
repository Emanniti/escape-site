import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image, Divider } from "@nextui-org/react";
import EscapeLogo from "../assets/pngimg.com - escape_from_tarkov_PNG20.png";
import { Fragment, useEffect, useState } from "react";
import { formatHMS } from "./Utils/utils";

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
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 50);
  }, []);

  return (
    <>
      <Navbar isBlurred isBordered className=" min-h-[100px]">
        <NavbarBrand>
          <Image width={100} alt="NextUI hero Image" src={EscapeLogo} />
          <p className="font-bold text-inherit text-3xl text-white">Escape Market</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Flea Market
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/ammo">
              Ammo
            </Link>
          </NavbarItem>
          {/* <NavbarItem>
            <Link color="foreground" href="#">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Supporto
            </Link>
          </NavbarItem> */}
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
    </>
  );
}

export default NavBarSite;
