import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";


function ModaleDettagliQuest(props) {
  function handleReputationColor(params) {
    if (params < 0) {
      return (
        <Chip size="sm" className="ml-3">
          <span className="text-red-500"> +{params}</span>
        </Chip>
      );
    } else {
      return (
        <Chip size="sm" className="ml-3">
          <span className="text-green-500"> +{params}</span>
        </Chip>
      );
    }
  }

  return (
    <>
      <Modal scrollBehavior="inside" size={"5xl"} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">{props.quest.name}</ModalHeader>
            <ModalBody>
              <div className="flex flex-wrap gap-5 place-content-start">
                <Image alt="Card background" className="object-cover rounded-xl" src={props.quest.taskImageLink} width={370} />
                <Card className="py-4 max-w-[100px] max-h-[90px] min-w-[100px]">
                  <CardHeader className="flex flex-wrap pb-0 pt-2 px-4 gap-8">
                    <div className="flex flex-col">
                      <p className="text-md text-center">Min Level</p>
                      <p className="text-medium text-center text-default-500">{props.quest.minPlayerLevel}</p>
                    </div>
                  </CardHeader>
                </Card>
                <Card className="py-4 max-w-[140px] max-h-[90px] min-w-[100px]">
                  <CardHeader className="flex flex-wrap pb-0 pt-2 px-4 gap-8">
                    <div className="flex flex-col">
                      <p className="text-md text-center">Map</p>
                      <p className="text-medium text-center text-default-500">
                        {props.quest.map !== null ? `${props.quest.map.name}` : "- Any Location"}
                      </p>
                    </div>
                    <div></div>
                  </CardHeader>
                </Card>
                <Card className="py-4 max-w-[140px] max-h-[90px] min-w-[100px]">
                  <CardHeader className="flex flex-wrap pb-0 pt-2 px-4 gap-8">
                    <div className="flex flex-col">
                      <p className="text-md text-center">Vendor</p>
                      <p className="text-medium text-center text-default-500">{props.quest.trader.name}</p>
                    </div>
                  </CardHeader>
                </Card>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl mt-1"
                  src={props.quest.trader.imageLink}
                  width={85}
                />
              </div>
              Requirements:
              <div className="flex flex-nowrap gap-5">
                {props.quest.taskRequirements.map((item, index) => {
                  return (
                    <Card key={index} className="py-4 max-w-[350px]  min-w-[100px]">
                      <CardHeader className="flex flex-wrap pb-0 pt-2 px-4 gap-8">
                        <div className="flex flex-col items-center">
                          <p className="text-sm text-center">{item.task.name}</p>
                          <Image
                            alt="Card background"
                            className="object-cover rounded-xl mt-3"
                            src={item.task.taskImageLink}
                            width={150}
                          />
                          <p className="text-medium text-center text-default-500">{props.quest.trader.name}</p>
                          <div className="flex flex-wrap gap-5">
                            <Link target="_blank" href={item.task.wikiLink} underline="none">
                              <Button variant="flat" color="success">
                                Wiki
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
              <div className="">
                <Card className="py-4 min-w-[100px]">
                  <CardHeader className="flex flex-wrap pb-0 pt-2 px-4 gap-8">
                    <div className="flex flex-col">
                      <p className="text-md">Objectives:</p>
                    </div>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <div className="flex flex-wrap">
                      <ol>
                        {props.quest.objectives.map((item, index) => {
                          return (
                            <li key={index}>
                              <Chip size="lg" color="warning" variant="dot">
                                {item.description} {item.optional ? '(Optional)' : ''}
                              </Chip>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </CardBody>
                </Card>
                <Card className="py-4 min-w-[100px] mt-5">
                  <CardHeader className="flex flex-wrap pb-0 pt-2 px-4 gap-8">
                    <div className="flex flex-col">
                      <p className="text-md">Rewards:</p>
                    </div>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <div className="flex flex-wrap gap-5 mt-5 self-center">
                      {props.quest.finishRewards.items.map((item, index) => {
                        return (
                          <div key={index} className="text-center">
                            <span className="text-center">{item.item.shortName}</span>
                            <Image key={index} radius="none" src={item.item.gridImageLink} />
                            <span className="text-center">x{item.count}</span>
                          </div>
                        );
                      })}
                    </div>
                    Reputations:
                    {props.quest.finishRewards.traderStanding.map((item, index) => {
                      return (
                        <div key={index}>
                          <span>- {item.trader.name}</span>
                          <span className="text-green-700">{handleReputationColor(item.standing)}</span>
                        </div>
                      );
                    })}
                  </CardBody>
                </Card>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="faded" onPress={props.onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModaleDettagliQuest;
