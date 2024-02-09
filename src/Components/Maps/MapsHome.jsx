import NavBarSite from "../NavBarSite";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ModalMap from "./ModalMap";
import { MAPS_CUSTOMS, MAPS_FACTORY, MAPS_GROUND_ZERO, MAPS_INTERCHANGE, MAPS_RESERVE, MAPS_SHORELINE, MAPS_STREETS, MAPS_WOODS } from "./constants";

function MapsHome() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMap, setSelectedMap] = useState("");
  const [selectedSrc, setSelectedSrc] = useState("");
  const [selectedId, setSelectedId] = useState("");

  async function handleSelectMap(mapName, src, id) {
    setSelectedMap(mapName);
    setSelectedSrc(src);
    setSelectedId(id);
    onOpen();
  }

  const renderMapSection = (maps, title) => (
    <div className="flex flex-wrap gap-5 p-12">
      <h4 className="text-medium font-medium -mt-5">{title}</h4>
      <Divider className="my-4 -mt-3" />
      {maps.map((map, index) => (
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
  );

  return (
    <>
      <NavBarSite />
      {renderMapSection(MAPS_GROUND_ZERO, 'Ground Zero maps')}
      {renderMapSection(MAPS_FACTORY, 'Factory maps')}
      {renderMapSection(MAPS_CUSTOMS, 'Customs maps')}
      {renderMapSection(MAPS_INTERCHANGE, 'Interchange maps')}
      {renderMapSection(MAPS_WOODS, 'Woods maps')}
      {renderMapSection(MAPS_SHORELINE, 'Shoreline maps')}
      {renderMapSection(MAPS_RESERVE, 'Reserve maps')}
      {renderMapSection(MAPS_STREETS, 'Streets maps')}
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
