import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Image,
  Input,
  Link,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import NavBarSite from "../NavBarSite";
import { QUESTS_JSON } from "../Utils/QuestJson";
import ModaleDettagliQuest from "./ModaleDettagliQuest";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";
import { CgRowFirst } from "react-icons/cg";
import { CgRowLast } from "react-icons/cg";

function QuestHome() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quest, setQuest] = useState({});
  const [filter, setFilter] = useState("");
  const [filterMap, setFilterMap] = useState([]);
  const [filterVendor, setFilterVendor] = useState([]);
  const [filteredData, setFilteredData] = useState(QUESTS_JSON.data.tasks);
  const [isCrescent, setIsCrescent] = useState(true);

  function handleOpenDetails(params) {
    setQuest(params);
    onOpen();
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      let filtered = QUESTS_JSON.data.tasks.filter((item) => {
        const nameMatches = item.name.toLowerCase().includes(filter.toLowerCase());
        const mapMatches = filterMap.length === 0 || filterMap.includes(item.map !== null ? item.map.name : null);
        const vendorMatches = filterVendor.length === 0 || filterVendor.includes(item.trader.name);

        return nameMatches && mapMatches && vendorMatches;
      });
      if (isCrescent) {
        filtered.sort((a, b) => a.minPlayerLevel - b.minPlayerLevel);
      } else {
        filtered.sort((a, b) => b.minPlayerLevel - a.minPlayerLevel);
      }

      setFilteredData(filtered);
    }, 500); // Imposta il ritardo desiderato in millisecondi

    return () => {
      clearTimeout(timeout);
    };
  }, [filter, filterVendor, filterMap, isCrescent]);

  return (
    <>
      <NavBarSite />
      <div className="p-5">
        <div className="flex flex-wrap justify-center gap-2">
          <Input
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-[300px] mb-3"
            type="email"
            variant="faded"
            label="Quest"
            placeholder="Enter your quest name"
          />
          <Accordion variant="splitted" className="max-w-[200px]">
            <AccordionItem
              startContent={<FaFilter />}
              className="z-30 absolute max-w-[600px]"
              aria-label="Filter"
              title="Open filters"
            >
              <CheckboxGroup
                value={filterVendor}
                onValueChange={setFilterVendor}
                label="Select Vendors"
                orientation="horizontal"
                color="warning"
                defaultValue={["Prapor", "Therapist", "Skier", "Fence", "Mechanic", "Jager", "Ragman", "Lightkeeper"]}
              >
                <Checkbox value="Prapor">Prapor</Checkbox>
                <Checkbox value="Therapist">Therapist</Checkbox>
                <Checkbox value="Skier">Skier</Checkbox>
                <Checkbox value="Fence">Fence</Checkbox>
                <Checkbox value="Mechanic">Mechanic</Checkbox>
                <Checkbox value="Ragman">Ragman</Checkbox>
                <Checkbox value="Jager">Jager</Checkbox>
                <Checkbox value="Lightkeeper">Lightkeeper</Checkbox>
              </CheckboxGroup>
              <CheckboxGroup
                value={filterMap}
                onValueChange={setFilterMap}
                label="Select Maps"
                orientation="horizontal"
                color="warning"
                defaultValue={[
                  "Ground Zero",
                  "Factory",
                  "Customs",
                  "Interchange",
                  "Woods",
                  "Shoreline",
                  "Reserve",
                  "Streets of tarkov",
                  "Lighthouse",
                ]}
              >
                <Checkbox value="Ground Zero">Ground Zero</Checkbox>
                <Checkbox value="Factory">Factory</Checkbox>
                <Checkbox value="Customs">Customs</Checkbox>
                <Checkbox value="Interchange">Interchange</Checkbox>
                <Checkbox value="Woods">Woods</Checkbox>
                <Checkbox value="Shoreline">Shoreline</Checkbox>
                <Checkbox value="Reserve">Reserve</Checkbox>
                <Checkbox value="Streets of tarkov">Streets of tarkov</Checkbox>
                <Checkbox value="Lighthouse">Lighthouse</Checkbox>
              </CheckboxGroup>
            </AccordionItem>
          </Accordion>
          <Tooltip showArrow={true} content={isCrescent ? "Increasing" : "Decreasing"}>
            <Button
              onClick={() => setIsCrescent(!isCrescent)}
              className="min-h-[60px]"
              isIconOnly
              color="warning"
              variant="faded"
              size="lg"
            >
              {isCrescent ? <CgRowLast /> : <CgRowFirst />}
            </Button>
          </Tooltip>
        </div>
        <div className="flex flex-wrap gap-5 place-content-center mt-5">
          {filteredData.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index / 20 }}
                variants={item}
                key={index}
                className="max-w-[400px] item"
              >
                <Card className="py-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 duration-300">
                  <CardHeader className="flex flex-wrap pb-0 pt-2 px-4 gap-8">
                    <div>
                      <p className="text-xs uppercase font-bold truncate max-w-[200px]">{item.name}</p>
                      <small className="text-default-500">{item.trader.name}</small>
                      <h4 className="font-bold text-xs">{item.map !== null ? `- ${item.map.name}` : "- Any Location"}</h4>
                      <h4 className="font-bold text-xs">Player Level: {item.minPlayerLevel}</h4>
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
              </motion.div>
            );
          })}
        </div>
      </div>
      {isOpen ? <ModaleDettagliQuest quest={quest} isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> : null}
    </>
  );
}

export default QuestHome;
