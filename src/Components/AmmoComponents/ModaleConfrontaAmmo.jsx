import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Avatar, Tooltip } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";

function ModaleConfrontaAmmo(props) {
  return (
    <>
      <Modal size="5xl" className="bg-black min-w-[1500px]" isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Comparison</ModalHeader>
              <ModalBody>
                <Table is color="warning" aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>IMAGE</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>BUY</TableColumn>
                    <TableColumn>SELL</TableColumn>
                    <TableColumn>DAMAGE</TableColumn>
                    <TableColumn>ARMOR DAMAGE</TableColumn>
                    <TableColumn>FRAG%</TableColumn>
                    <TableColumn>PEN VALUE</TableColumn>
                    <TableColumn>PEN%</TableColumn>
                    <TableColumn>RECOIL</TableColumn>
                    <TableColumn>ACCURACY</TableColumn>
                    <TableColumn>SPEED</TableColumn>
                    <TableColumn>TRACER</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {props.selectedAmmo.map((munizione, munizioneIndex) => (
                      <TableRow key={munizioneIndex}>
                        <TableCell width={40}>
                          <Avatar radius="none" src={munizione.item.gridImageLink} />
                        </TableCell>
                        <TableCell width={200}>{munizione.item.name}</TableCell>
                        <TableCell>
                          <Tooltip
                            className="bg-black"
                            content={
                              <div className="px-1 py-2">
                                <div className="text-large font-bold text-white">Buy From</div>
                                {munizione.item.buyFor.length === 0 ? (
                                  <div key={munizioneIndex} className="text-medium text-white">
                                    Item not available for purchase at the moment
                                  </div>
                                ) : null}
                                {munizione.item.buyFor !== undefined
                                  ? munizione.item.buyFor.map((item, index) => {
                                      return (
                                        <div
                                          key={munizioneIndex}
                                          className="text-medium text-white"
                                        >{`${item.price} ${item.currency} [${item.vendor.name}]`}</div>
                                      );
                                    })
                                  : null}
                              </div>
                            }
                          >
                            <div>
                              <GiPayMoney className="text-3xl text-red-600" />
                            </div>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip
                            className="bg-black"
                            content={
                              <div className="px-1 py-2">
                                <div className="text-large font-bold text-white">Sell To</div>
                                {munizione.item.sellFor !== undefined
                                  ? munizione.item.sellFor.map((item, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="text-medium text-white"
                                        >{`${item.price} ${item.currency} [${item.vendor.name}]`}</div>
                                      );
                                    })
                                  : null}
                              </div>
                            }
                          >
                            <div>
                              <GiReceiveMoney className="text-3xl text-green-600" />
                            </div>
                          </Tooltip>
                        </TableCell>
                        <TableCell>{munizione.damage}</TableCell>
                        <TableCell>{`${munizione.armorDamage}`}</TableCell>
                        <TableCell>{`${munizione.fragmentationChance}%`}</TableCell>
                        <TableCell>{munizione.penetrationPower}</TableCell>
                        <TableCell>{`${munizione.penetrationChance}%`}</TableCell>
                        <TableCell>{props.handleRecoilVisualize(munizione.recoilModifier)}</TableCell>
                        <TableCell>{`${munizione.accuracyModifier}`}</TableCell>
                        <TableCell>{`${munizione.initialSpeed}`}</TableCell>
                        <TableCell>{`${munizione.tracer}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="light" onPress={onClose}>
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

export default ModaleConfrontaAmmo;
