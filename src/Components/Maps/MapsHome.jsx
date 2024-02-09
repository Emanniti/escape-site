import NavBarSite from "../NavBarSite";
import { INTERCHANGE_EXTRACTS, MAPS_CUSTOMS, MAPS_FACTORY, MAPS_GROUND_ZERO, MAPS_INTERCHANGE, MAPS_WOODS } from "./constants";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ModalMap from "./ModalMap";

function MapsHome() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMap, setSelectedMap] = useState("");
  const [selectedSrc, setSelectedSrc] = useState("");
  const [selectedId, setSelectedId] = useState("");

  async function handleSelectMap(mapName, src, id) {
    debugger;
    setSelectedMap(mapName);
    setSelectedSrc(src);
    setSelectedId(id);
    onOpen();
  }
  return (
    <>
      <NavBarSite />
      <div className="flex flex-wrap gap-5 p-12">
        <h4 className="text-medium font-medium -mt-5">Ground Zero maps</h4>
        <Divider className="my-4 -mt-3" />
        {MAPS_GROUND_ZERO.map((map, index) => (
          <Card key={index} className="py-4 max-w-[300px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-large uppercase font-bold">{map.mapName}</p>
              <small className="text-default-500 text-ellipsis overflow-hidden">{map.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image alt="Card background" className="object-cover rounded-xl" src={map.src} width={270} />
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => handleSelectMap(map.mapName, map.src, map.id)}
                className="w-full"
                variant="faded"
                color="warning"
              >
                Apri
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 p-12 -mt-16">
        <h4 className="text-medium font-medium">Factory maps</h4>
        <Divider className="my-4" />
        {MAPS_FACTORY.map((map, index) => (
          <Card key={index} className="py-4 max-w-[300px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-large uppercase font-bold">{map.mapName}</p>
              <small className="text-default-500 text-ellipsis overflow-hidden">{map.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image alt="Card background" className="object-cover rounded-xl" src={map.src} width={270} />
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => handleSelectMap(map.mapName, map.src, map.id)}
                className="w-full"
                variant="faded"
                color="warning"
              >
                Apri
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 p-12 -mt-16">
        <h4 className="text-medium font-medium">Customs maps</h4>
        <Divider className="my-4" />
        {MAPS_CUSTOMS.map((map, index) => (
          <Card key={index} className="py-4 max-w-[300px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-large uppercase font-bold">{map.mapName}</p>
              <small className="text-default-500 text-ellipsis overflow-hidden">{map.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image alt="Card background" className="object-cover rounded-xl" src={map.src} width={270} />
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => handleSelectMap(map.mapName, map.src, map.id)}
                className="w-full"
                variant="faded"
                color="warning"
              >
                Apri
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 p-12 -mt-16">
        <h4 className="text-medium font-medium">Interchange maps</h4>
        <Divider className="my-4" />
        {MAPS_INTERCHANGE.map((map, index) => (
          <Card key={index} className="py-4 max-w-[300px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-large uppercase font-bold">{map.mapName}</p>
              <small className="text-default-500 text-ellipsis overflow-hidden">{map.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image alt="Card background" className="object-cover rounded-xl" src={map.src} width={270} />
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => handleSelectMap(map.mapName, map.src, map.id)}
                className="w-full"
                variant="faded"
                color="warning"
              >
                Apri
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 p-12 -mt-16">
        <h4 className="text-medium font-medium">Woods maps</h4>
        <Divider className="my-4" />
        {MAPS_WOODS.map((map, index) => (
          <Card key={index} className="py-4 max-w-[300px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-large uppercase font-bold">{map.mapName}</p>
              <small className="text-default-500 text-ellipsis overflow-hidden">{map.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image alt="Card background" className="object-cover rounded-xl" src={map.src} width={270} />
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => handleSelectMap(map.mapName, map.src, map.id)}
                className="w-full"
                variant="faded"
                color="warning"
              >
                Apri
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <ModalMap
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedMap={selectedMap}
        selectedSrc={selectedSrc}
        selectedId={selectedId}
      />
    </>
  );
}

export default MapsHome;
