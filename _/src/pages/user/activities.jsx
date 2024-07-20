import { useState } from "react";
import { Active, Closed } from "./store";
import { Messages } from "../notification";

const tabItems = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Message",
  },
  {
    id: 3,
    name: "Closed",
  },
];

export default function Activities() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex flex-col items-center md:items-start h-full mb-20">
      {/* Tab */}
      <div className="shrink-0 h-[47px] md:h-14  bg-[#F1FFF4] max-w-[300px] w-full rounded-3xl flex justify-between items-center px-6 text-sm md:text-base">
        {tabItems.map((item) => (
          <p
            key={item.id}
            onClick={() => setActive(item.id)}
            className={` ${
              item.id === active
                ? "text-brandGreen font-bold"
                : "text-brandDarkGray font-medium"
            } cursor-pointer `}
          >
            {item.name}
          </p>
        ))}
      </div>
      {/* Item */}
      <div className="mt-4  w-full min-h-[200px] md:min-h-[400px] p-2 rounded-lg overflow-hidden">
        {active === 1 && <Active />}

        {active === 2 && <Messages />}

        {active === 3 && <Closed />}
      </div>
    </div>
  );
}
