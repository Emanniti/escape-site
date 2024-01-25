import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { HiPlus } from "react-icons/hi";

function ModaleOggettoSelezionato(props) {
  const [itemCercato, setItemCercato] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.post(
      "https://api.tarkov.dev/graphql",
      {
        query: `
            {
              items(name: "${props.itemSelezionato}") {
                id
                name
                shortName
                description
                inspectImageLink
                avg24hPrice
                weight
                gridImageLink
                sellFor {
                  price
                  currency
                  priceRUB
                  vendor{
                    name
                  }
                }
                craftsFor {
                  id
                  station {
                    id
                    name
                    tarkovDataId
                  }
                  level
                  taskUnlock {
                    id
                  }
                
                  requiredItems {
                    item {
                      name
                      shortName
                      gridImageLink
                      id
                      avg24hPrice
                    }
                    count
                    quantity
                    attributes {
                      value
                    }
                  }
                }
                bartersFor {
                  id
                  level
                  trader {
                    levels{
                      imageLink
                    }
                    imageLink
                    image4xLink
                    name
                  }
                  requiredItems {
                    item {
                      id
                      shortName
                      name
                      gridImageLink
                      avg24hPrice
                    }
                    count
                  }
                }
              }
            }
          `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    setItemCercato(response.data);
    setLoading(false);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handlePrezzoMaggiore(params) {
    const highestPriceObject = params.reduce(
      (maxPriceObject, currentItem) => {
        return currentItem.priceRUB > maxPriceObject.priceRUB ? currentItem : maxPriceObject;
      },
      { priceRUB: -Infinity }
    );
    if (highestPriceObject.vendor !== undefined) {
      return `${highestPriceObject.priceRUB.toLocaleString()}₽ (${highestPriceObject.vendor.name})`
    }
  }

  return (
    <>
      <Modal scrollBehavior="inside" className="bg-zinc-950" size={"5xl"} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalContent className="p-5">
          {loading ? (
            <Spinner label="Caricamento..." color="warning" labelColor="warning" />
          ) : itemCercato.data !== undefined ? (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                {itemCercato.data.items[0].name} - ({itemCercato.data.items[0].shortName})
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-5">
                  <p className="max-w-[600px] place-self-start text-white">
                    {itemCercato.data.items[0].description === null
                      ? "Nessuna Descrizione disponibile"
                      : itemCercato.data.items[0].description}
                  </p>
                  <Image
                    isZoomed
                    className="place-self-end"
                    height={60}
                    width={400}
                    src={itemCercato.data.items[0].inspectImageLink}
                  />
                </div>
                <div className="flex flex-nowrap gap-3">
                  <Card className="bg-gray-800">
                    <CardBody>
                      <p className="text-xl font-bold text-white">Avg. prezzo flea </p>
                      <p className="text-white text-center">{itemCercato.data.items[0].avg24hPrice.toLocaleString()}₽</p>
                    </CardBody>
                  </Card>
                  <Card className="bg-gray-800">
                    <CardBody>
                      <p className="text-xl font-bold text-white">Prezzo Vendor(magg.)</p>
                      <p className="text-white text-center">{handlePrezzoMaggiore(itemCercato.data.items[0].sellFor)}</p>
                    </CardBody>
                  </Card>
                  <Card className="bg-gray-800">
                    <CardBody>
                      <p className="text-xl font-bold text-white">Peso item</p>
                      <p className="text-white text-center">{itemCercato.data.items[0].weight} Kg</p>
                    </CardBody>
                  </Card>
                </div>
                <Divider className="bg-black mt-2 mb-2" />
                {itemCercato.data.items[0].craftsFor[0] !== undefined && (
                  <Card className="max-w-[1000px] min-h-[220px] bg-gray-800">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-md text-white">STRUTTURA</p>
                        <p className="text-md text-default-500">
                          {itemCercato.data.items[0].craftsFor[0].station.name} lvl.
                          {itemCercato.data.items[0].craftsFor[0].level}
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <div className="flex flex-nowrap gap-2 place-self-center">
                        {itemCercato.data.items[0].craftsFor[0].requiredItems &&
                          itemCercato.data.items[0].craftsFor[0].requiredItems.map((item, index) => (
                            <div key={index}>
                              <p className="text-center">
                                <span className="font-mono font-bold text-white">{item.item.shortName}</span>
                                <span className="text-center text-white">
                                  <Tooltip
                                    className="bg-black"
                                    content={
                                      <div className="px-1 py-2 text-center">
                                        <div className="text-small font-bold text-white">Avg price 24h</div>
                                        <div className="text-tiny text-white">{item.item.avg24hPrice.toLocaleString()}₽</div>
                                        <div className="text-small font-bold text-white">Flea</div>
                                      </div>
                                    }
                                  >
                                    <Image radius="none" src={item.item.gridImageLink} />
                                  </Tooltip>
                                </span>
                                <span className="text-center text-white">x{item.quantity}</span>
                              </p>
                            </div>
                          ))}
                      </div>
                    </CardBody>
                  </Card>
                )}
                {itemCercato.data.items[0].bartersFor[0] !== undefined && (
                  <Card className="max-w-[1000px] bg-gray-800">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-md text-white">SCAMBIABILE</p>
                      </div>
                    </CardHeader>
                    <Divider className="bg-black" />
                    <CardBody>
                      <div className="gap-2 place-self-center">
                        {itemCercato.data.items[0].bartersFor &&
                          itemCercato.data.items[0].bartersFor.map((item, outerIndex) => (
                            <div key={outerIndex}>
                              <p className="text-center flex flex-nowrap gap-5 items-center">
                                <Image
                                  className="border border-white"
                                  radius="none"
                                  src={item.trader.levels[item.level - 1].imageLink}
                                />
                                <Divider className="bg-black h-36" orientation="vertical"/>
                                {item.requiredItems.map((requiredItem, innerIndex) => (
                                  <>
                                    {innerIndex !== 0 ? <HiPlus className="text-white" /> : null}
                                    <div key={innerIndex}>
                                      <span className="font-mono font-bold text-white">{requiredItem.item.shortName}</span>
                                      <Tooltip
                                        className="bg-black"
                                        content={
                                          <div className="px-1 py-2 text-center">
                                            <div className="text-small font-bold text-white">Avg price 24h</div>
                                            <div className="text-tiny text-white">{requiredItem.item.avg24hPrice.toLocaleString()}₽</div>
                                            <div className="text-small font-bold text-white">Flea</div>
                                          </div>
                                        }
                                        >
                                        <Image radius="none" src={requiredItem.item.gridImageLink} />
                                      </Tooltip>
                                      <span className="text-center text-white">x{requiredItem.count}</span>
                                    </div>
                                  </>
                                ))}
                                <IoIosArrowForward className="text-white" />
                                <Image radius="none" src={itemCercato.data.items[0].gridImageLink} />
                              </p>
                              <Divider className="bg-black mt-2 mb-2" />
                            </div>
                          ))}
                      </div>
                    </CardBody>
                  </Card>
                )}
              </ModalBody>
            </>
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModaleOggettoSelezionato;
