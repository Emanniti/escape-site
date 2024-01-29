import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input, Link, useDisclosure } from "@nextui-org/react";
import NavBarSite from "../NavBarSite";
import { QUESTS_JSON } from "../Utils/QuestJson";
import ModaleDettagliQuest from "./ModaleDettagliQuest";
import { useEffect, useState } from "react";

function QuestHome() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quest, setQuest] = useState({});
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(QUESTS_JSON.data.tasks);

  function handleOpenDetails(params) {
    setQuest(params);
    onOpen();
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      debugger;
      let ciao = QUESTS_JSON.data.tasks.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));
      setFilteredData(ciao);
    }, 500); // Imposta il ritardo desiderato in millisecondi

    return () => {
      clearTimeout(timeout);
    };
  }, [filter]);

  return (
    <>
      <NavBarSite />
      <div className="p-5">
        <div className="flex flex-wrap justify-center">
          <Input
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-[400px] mb-3"
            type="email"
            variant="faded"
            label="Quest"
            placeholder="Enter your quest name"
          />
        </div>
        <div className="flex flex-wrap gap-5 place-content-center">
          {filteredData.map((item, index) => {
            return (
              <div key={index} className="max-w-[400px]">
                <Card className="py-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 duration-300">
                  <CardHeader className="flex flex-wrap pb-0 pt-2 px-4 gap-8">
                    <div>
                      <p className="text-xs uppercase font-bold truncate max-w-[200px]">{item.name}</p>
                      <small className="text-default-500">{item.trader.name}</small>
                      <h4 className="font-bold text-xs">{item.map !== null ? `- ${item.map.name}` : "- Any Location"}</h4>
                    </div>
                    <div>
                      <Image alt="Card background" className="object-cover rounded-xl" src={item.trader.imageLink} width={100} />
                    </div>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image alt="Card background" className="object-cover rounded-xl" src={item.taskImageLink} width={230} />
                  </CardBody>
                  <CardFooter className="flex flex-wrap gap-5">
                    <Button onClick={() => handleOpenDetails(item)} variant="faded" color="warning">
                      Details
                    </Button>
                    <Link target="_blank" href={item.wikiLink} underline="none">
                      <Button variant="flat" color="success">
                        Wiki
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      {isOpen ? <ModaleDettagliQuest quest={quest} isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> : null}
    </>
  );
}

export default QuestHome;
