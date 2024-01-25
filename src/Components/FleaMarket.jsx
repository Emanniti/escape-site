import {
  Button,
  Image,
  Input,
  Link,
  Pagination,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import ModaleOggettoSelezionato from "./ModaleOggettoSelezionato";
import { FaPowerOff } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

function FleaMarket() {
  const [nomeItem, setNomeItem] = useState("d");
  const [itemCercato, setItemCercato] = useState({});
  const [itemSelezionato, setItemSelezionato] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [advancedMode, setAdvancedMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function searchItem() {
    try {
      setPage(1);
      setLoading(true);
      const response = await axios.post(
        "https://api.tarkov.dev/graphql",
        {
          query: `
                {
                  items(name: "${nomeItem}") {
                      id
                      name
                      shortName
                      basePrice
                      fleaMarketFee
                      avg24hPrice
                      image512pxLink
                      gridImageLink
                      baseImageLink
                      inspectImageLink
                      image8xLink
                      iconLink
                      width
                      weight
                      height
                      wikiLink
                      lastLowPrice
                      changeLast48h
                      changeLast48hPercent
                      categories{
                        name
                      }
                      backgroundColor
                      sellFor {
                        price
                        currency
                        priceRUB
                        vendor{
                          name
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
      console.log(itemCercato);
    } catch (error) {
      console.error("Errore durante la richiesta Axios:", error);
    }
  }

  useEffect(() => {
    searchItem();
  }, []);

  function handlePricePerSlot(larghezza, altezza, prezzo) {
    let totSlot;
    let prezzoFinale;
    if (larghezza > 1 || altezza > 1) {
      totSlot = larghezza * altezza;
      prezzoFinale = prezzo / totSlot;
    } else {
      prezzoFinale = prezzo;
    }
    return prezzoFinale.toLocaleString() + "₽";
  }

  let pages = 0;
  let items = [];

  if (itemCercato.data !== undefined) {
    const rowsPerPage = 10;
    pages = Math.ceil(itemCercato.data.items.length / rowsPerPage);

    items = itemCercato.data.items.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
  }

  function handleTraderSell(params) {
    const highestPriceObject = params.reduce(
      (maxPriceObject, currentItem) => {
        return currentItem.priceRUB > maxPriceObject.priceRUB ? currentItem : maxPriceObject;
      },
      { priceRUB: -Infinity }
    );
    if (highestPriceObject.vendor !== undefined) {
      return (
        <div className="flex flex-col items-center justify-center">
          <span className="text-center font-mono font-bold" style={{ display: "block" }}>
            {highestPriceObject.vendor.name}
          </span>
          <span className="text-center" style={{ display: "block" }}>
            {highestPriceObject.priceRUB.toLocaleString()}₽
          </span>
        </div>
      );
    } else {
      return <></>;
    }
  }

  function handleOpenModal(item) {
    onOpen();
    setItemSelezionato(item);
  }

  function handlePercentage(params) {
    if (params !== null) {
      return params < 0 ? (
        <span className="text-red-500 place-content-center flex flex-nowrap">
          <FaArrowDown className="self-center mr-2" /> {params}₽
        </span>
      ) : (
        <span className="text-green-500 place-content-center flex flex-nowrap">
          <FaArrowUp className="self-center mr-2" /> {params}%
        </span>
      );
    } else {
      return "Item non disponibile";
    }
  }

  function handlePriceChange(params) {
    if (params !== null) {
      return params < 0 ? (
        <span className="text-red-500 place-content-center flex flex-nowrap">
          <FaArrowDown className="self-center mr-2" />
          {params}₽
        </span>
      ) : (
        <span className="text-green-500 place-content-center flex flex-nowrap">
          <FaArrowUp className="self-center mr-2" /> {params}₽
        </span>
      );
    } else {
      return "Item non disponibile";
    }
  }

  return (
    <div className="p-3 text-center">
      <div className="flex flex-nowrap p-2 gap-3 justify-between">
        <div className="flex flex-nowrap p-2 gap-3">
          <Input
            onChange={(e) => setNomeItem(e.target.value)}
            className="max-w-[300px]"
            type="email"
            label="Item"
            placeholder="Item Name"
          />
          <Button
            isClearable
            isDisabled={nomeItem === "" ? true : false}
            onClick={() => searchItem()}
            color="warning"
            className="mt-1"
            size="lg"
          >
            Search
          </Button>
        </div>
        <Switch
          onChange={() => setAdvancedMode(!advancedMode)}
          size="lg"
          color="success"
          startContent={<FaPowerOff />}
          endContent={<FaPowerOff />}
        >
          Advanced Mode
        </Switch>
      </div>
      <div className="text-center">
        <Table
          fullWidth
          isCompact={advancedMode}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="warning"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn width={250} allowsSorting>Item</TableColumn>
            <TableColumn width={300} allowsSorting>Name</TableColumn>
            <TableColumn allowsSorting>Wiki</TableColumn>
            <TableColumn allowsSorting>24h AVG Price</TableColumn>
            <TableColumn allowsSorting>Per Slot</TableColumn>
            <TableColumn allowsSorting className="text-center">Sell To Trader</TableColumn>
            {advancedMode ? (
              <TableColumn allowsSorting className="text-center">Lowest Price</TableColumn>
            ) : (
              <TableColumn allowsSorting className="hidden"></TableColumn>
            )}
            {advancedMode ? (
              <TableColumn allowsSorting className="text-center">Last 48h</TableColumn>
            ) : (
              <TableColumn allowsSorting className="hidden"></TableColumn>
            )}
            {advancedMode ? (
              <TableColumn allowsSorting className="text-center">Last 48h %</TableColumn>
            ) : (
              <TableColumn allowsSorting className="hidden"></TableColumn>
            )}
            {advancedMode ? (
              <TableColumn allowsSorting className="text-center">Weigth</TableColumn>
            ) : (
              <TableColumn allowsSorting className="hidden"></TableColumn>
            )}
          </TableHeader>
          <TableBody
            isLoading={loading}
            emptyContent={"No rows to display."}
            loadingContent={<Spinner color="warning" label="Caricamento..." />}
          >
            {items !== undefined
              ? items.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Image
                          className="cursor-pointer"
                          onClick={() => handleOpenModal(item.name)}
                          size="lg"
                          isBordered
                          radius="none"
                          src={item.gridImageLink}
                        />
                      </TableCell>
                      <TableCell onClick={() => handleOpenModal(item.name)} className="text-left cursor-pointer">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-left">
                        <Link target="_blank" href={item.wikiLink} color="success">
                          Wiki
                        </Link>
                      </TableCell>
                      <TableCell className="text-left">
                        {item.avg24hPrice === 0 ? "Prezzo non disponibile" : item.avg24hPrice.toLocaleString() + "₽"}
                      </TableCell>
                      <TableCell className="text-left">{handlePricePerSlot(item.width, item.height, item.avg24hPrice)}</TableCell>
                      <TableCell>{handleTraderSell(item.sellFor)}</TableCell>
                      {advancedMode ? (
                        <TableCell>{item.lastLowPrice.toLocaleString()}₽</TableCell>
                      ) : (
                        <TableCell className="hidden"></TableCell>
                      )}
                      {advancedMode ? (
                        <TableCell>{handlePriceChange(item.changeLast48h)}</TableCell>
                      ) : (
                        <TableCell className="hidden"></TableCell>
                      )}
                      {advancedMode ? (
                        <TableCell>{handlePercentage(item.changeLast48hPercent)}</TableCell>
                      ) : (
                        <TableCell className="hidden"></TableCell>
                      )}
                      {advancedMode ? <TableCell>{item.weight} Kg</TableCell> : <TableCell className="hidden"></TableCell>}
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </div>
      {isOpen ? <ModaleOggettoSelezionato itemSelezionato={itemSelezionato} isOpen={isOpen} onClose={onClose} /> : null}
    </div>
  );
}

export default FleaMarket;
