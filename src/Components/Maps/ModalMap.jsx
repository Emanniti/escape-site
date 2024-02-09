import {
  Button,
  Divider,
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
} from "@nextui-org/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { CUSTOMS_EXTRACTS, FACTORY_EXTRACTS, GROUND_ZERO_EXTRACTS, INTERCHANGE_EXTRACTS, WOODS_EXTRACTS } from "./constants";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

function ModalMap(props) {
  useEffect(() => {
    setSelectedMap(handleMaps());
  }, [props.selectedId]);

  function handleMaps() {
    debugger;
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

      default:
        return [];
    }
  }
  const [selectedMap, setSelectedMap] = useState(handleMaps());
  console.log(selectedMap);
  return (
    <>
      <Modal
        className="!min-w-[1100px]"
        scrollBehavior="inside"
        size="full"
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{props.selectedMap}</ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap">
                  <TransformWrapper>
                    <TransformComponent>
                      <img src={props.selectedSrc} alt="test" style={{ maxWidth: 700, minHeight: 500 }} />
                    </TransformComponent>
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
                              <Image className="hover:scale-125" src={map.src} widh={300} />
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
                <Button>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalMap;
