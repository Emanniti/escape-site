import axios from "axios";
import NavBarSite from "./NavBarSite";
import { useEffect, useState } from "react";
import React from "react";
import { Accordion, AccordionItem, Avatar, Input, Tooltip } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function EscapeAmmo() {
  const [itemCercato, setItemCercato] = useState({});
  const [json, setJson] = useState({});
  const [ammoCercata, setAmmoCercata] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [debouncedAmmoCercata, setDebouncedAmmoCercata] = useState("");
  const itemAperti = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];

  async function searchItem() {
    try {
      const response = await axios.post(
        "https://api.tarkov.dev/graphql",
        {
          query: `
                    {
                        ammo{
                            item{
                              name
                              gridImageLink
                              buyFor {
                                price
                                currency
                                priceRUB
                                vendor {
                                  name
                                }
                              }
                              sellFor{
                                vendor{
                                  name
                                }
                                currency
                                priceRUB
                                price
                              }
                            }
                            weight
                            caliber
                            stackMaxSize
                            tracer
                            tracerColor
                            ammoType
                            projectileCount
                            damage
                            armorDamage
                            fragmentationChance
                            ricochetChance
                            penetrationChance
                            penetrationPower
                            accuracyModifier
                            recoilModifier
                            initialSpeed
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
      let itemRaggruppato = Object.values(
        response.data.data.ammo.reduce((acc, oggetto) => {
          const categoria = oggetto.caliber;

          // Se la chiave 'categoria' non esiste ancora nell'oggetto raggruppato, creala
          if (!acc[categoria]) {
            acc[categoria] = {
              categoria: categoria,
              oggetti: [],
            };
          }

          // Aggiungi l'oggetto corrente all'array corrispondente alla chiave 'categoria'
          acc[categoria].oggetti.push(oggetto);

          return acc;
        }, {})
      );
      setJson(response.data);
      setItemCercato(itemRaggruppato);
    } catch (error) {
      console.error("Errore durante la richiesta Axios:", error);
    }
  }

  useEffect(() => {
    searchItem();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedAmmoCercata(ammoCercata);
    }, 500); // Imposta il ritardo desiderato in millisecondi

    return () => {
      clearTimeout(timeout);
    };
  }, [ammoCercata]);

  useEffect(() => {
    if (json.data !== undefined) {
      let filteredData = json.data.ammo.filter((item) =>
        item.item.name.toLowerCase().includes(debouncedAmmoCercata.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  }, [debouncedAmmoCercata]);

  function handleRecoilVisualize(params) {
    let roundedNumber = params;
    if (roundedNumber < 0) {
      return (
        <span className="text-green-600 flex flex-nowrap">
          <FaArrowDown className="self-center mr-2" /> {roundedNumber}
        </span>
      );
    } else if (roundedNumber === 0) {
      return <span>{roundedNumber}</span>;
    } else if (roundedNumber >= 0.01 && roundedNumber <= 0.35) {
      return (
        <span className="text-green-300 flex flex-nowrap">
          <FaArrowUp className="self-center mr-2" /> {roundedNumber}
        </span>
      );
    } else if (roundedNumber > 0.35 && roundedNumber <= 0.99) {
      return (
        <span className="text-orange-500 flex flex-nowrap">
          <FaArrowUp className="self-center mr-2" /> {roundedNumber}
        </span>
      );
    } else if (roundedNumber > 1) {
      return (
        <span className="text-red-600 flex flex-nowrap">
          <FaArrowUp className="self-center mr-2" /> {roundedNumber}
        </span>
      );
    }
  }

  return (
    <>
      <NavBarSite />
      <div className="p-5 ">
        <div className="p-2">
          <Input
            onChange={(e) => setAmmoCercata(e.target.value)}
            type="text"
            variant="faded"
            size="sm"
            className="max-w-[200px] mb-2 "
            label="Ammo"
            placeholder="Enter your ammo name"
          />
        </div>
        {debouncedAmmoCercata !== "" ? (
          <Table color="warning" selectionMode="multiple" aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>#</TableColumn>
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
              {filteredData.length > 0
                ? filteredData.map((munizione, munizioneIndex) => {
                    return (
                      <TableRow key={`${munizioneIndex} singleTable`}>
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
                        <TableCell>{handleRecoilVisualize(munizione.recoilModifier)}</TableCell>
                        <TableCell>{`${munizione.accuracyModifier}`}</TableCell>
                        <TableCell>{`${munizione.initialSpeed}`}</TableCell>
                        <TableCell>{`${munizione.tracer}`}</TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        ) : (
          <Accordion defaultExpandedKeys={itemAperti} variant="splitted" isCompact selectionMode="multiple">
            {itemCercato[0] !== undefined
              ? itemCercato.map((item, index) => {
                  return (
                    <AccordionItem key={index} className=" p-5" title={item.categoria}>
                      <Table color="warning" selectionMode="multiple" aria-label="Example static collection table">
                        <TableHeader>
                          <TableColumn>#</TableColumn>
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
                          {item.oggetti.map((munizione, munizioneIndex) => (
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
                                        <div key={index} className="text-medium text-white">
                                          Item not available for purchase at the moment
                                        </div>
                                      ) : null}
                                      {munizione.item.buyFor !== undefined
                                        ? munizione.item.buyFor.map((item, index) => {
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
                              <TableCell>{handleRecoilVisualize(munizione.recoilModifier)}</TableCell>
                              <TableCell>{`${munizione.accuracyModifier}`}</TableCell>
                              <TableCell>{`${munizione.initialSpeed}`}</TableCell>
                              <TableCell>{`${munizione.tracer}`}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionItem>
                  );
                })
              : null}
          </Accordion>
        )}
      </div>
    </>
  );
}

export default EscapeAmmo;
