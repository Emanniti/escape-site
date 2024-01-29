import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import NavBarSite from "../NavBarSite";
import { QUEST_ITEMS_JSON } from "../Utils/QuestItemsJson";

function QuestItems() {
  console.log(QUEST_ITEMS_JSON.data.items.filter((item) => (item.usedInTasks.length > 0 ? true : false)));
  return (
    <>
      <NavBarSite />
      <div className="p-5 flex flex-wrap gap-5 justify-center">
        {QUEST_ITEMS_JSON.data.items
          .filter((item) => (item.usedInTasks.length > 0 ? true : false))
          .map((item, index) => {
            return (
              <Card className="py-4 min-w-[500px]">
                <CardHeader className="flex flex-wrap pb-0 pt-2 px-4 gap-8 justify-center">
                  <div className="flex flex-col items-center">
                    <p className="text-md text-center">{item.name}</p>
                    <Image radius="none" src={item.gridImageLink} />
                  </div>
                </CardHeader>
              </Card>
            );
          })}
      </div>
    </>
  );
}

export default QuestItems;
