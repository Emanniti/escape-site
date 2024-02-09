import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  CUSTOMS_EXTRACTS,
  FACTORY_EXTRACTS,
  GROUND_ZERO_EXTRACTS,
  INTERCHANGE_EXTRACTS,
  LIGHT_EXTRACTS,
  RESERVE_EXTRACTS,
  SHORELINE_EXTRACTS,
  STREETS_EXTRACTS,
  WOODS_EXTRACTS,
} from "./constants";
import React, { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { BiSolidZoomIn } from "react-icons/bi";
import { BiSolidZoomOut } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";

function ModalMap(props) {
  useEffect(() => {
    setSelectedMap(handleMaps());
  }, [props.selectedId]);

  function handleMaps() {
    switch (props.selectedId) {
      case "gz":
        return GROUND_ZERO_EXTRACTS;
      case "ft":
        return FACTORY_EXTRACTS;
      case "cs":
        return CUSTOMS_EXTRACTS;
      case "it":
        return INTERCHANGE_EXTRACTS;
      case "ws":
        return WOODS_EXTRACTS;
      case "sh":
        return SHORELINE_EXTRACTS;
      case "re":
        return RESERVE_EXTRACTS;
      case "st":
        return STREETS_EXTRACTS;
      case "lt":
        return LIGHT_EXTRACTS;

      default:
        return [];
    }
  }
  const [selectedMap, setSelectedMap] = useState(handleMaps());
  console.log(selectedMap);
  return (
    <>
      <Modal scrollBehavior="inside" size="5xl" isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{props.selectedMap}</ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap place-content-center">
                  <TransformWrapper initialScale={1} initialPositionX={200} initialPositionY={100}>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                        <div className="flex gap-5 flex-wrap">
                          <Tooltip content="Zoom IN">
                            <Button
                              variant="faded"
                              color="warning"
                              startContent={<BiSolidZoomIn className="text-large" />}
                              onClick={() => zoomIn()}
                            />
                          </Tooltip>
                          <Tooltip content="Zoom OUT">
                            <Button
                              variant="faded"
                              color="warning"
                              startContent={<BiSolidZoomOut className="text-large" />}
                              onClick={() => zoomOut()}
                            />
                          </Tooltip>
                          <Tooltip content="Reset">
                            <Button
                              variant="faded"
                              color="warning"
                              startContent={<GrPowerReset className="text-large" />}
                              onClick={() => resetTransform()}
                            />
                          </Tooltip>
                        </div>
                        <TransformComponent>
                          <img src={props.selectedSrc} alt="test" />
                        </TransformComponent>
                      </React.Fragment>
                    )}
                  </TransformWrapper>
                  <Table className="max-w-[1000px]" isStriped aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>Extraction</TableColumn>
                      <TableColumn>Name</TableColumn>
                      <TableColumn>Faction</TableColumn>
                      <TableColumn>Always Available</TableColumn>
                      <TableColumn>Single-Use</TableColumn>
                      <TableColumn>Requirements</TableColumn>
                      <TableColumn>Notes</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {selectedMap.length > 0 &&
                        selectedMap.map((map, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Image
                                className="hover:scale-125"
                                src={map.src}
                                width={
                                  props.selectedId === "cs" || props.selectedId === "sh" || props.selectedId === "re" ? 300 : 2000
                                }
                              />
                            </TableCell>
                            <TableCell>{map.name}</TableCell>
                            <TableCell>{map.faction}</TableCell>
                            <TableCell>
                              {map.alwaysAvaiable ? <MdDone className="text-green-500" /> : <TiDelete className="text-red-500" />}
                            </TableCell>
                            <TableCell>
                              {map.singleUse ? <MdDone className="text-green-500" /> : <TiDelete className="text-red-500" />}
                            </TableCell>
                            <TableCell>{map.requirements}</TableCell>
                            <TableCell>{map.notes}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="ghost" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalMap;
