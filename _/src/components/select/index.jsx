import {
  fetchCategory,
  fetchColour,
  fetchCondition,
  fetchMaker,
  fetchModel,
  fetchState,
  fetchTransmission,
  fetchTrim,
} from "@/apis/misc";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getYearsArray } from "@/utils/misc";
import { appStore } from "@/state/appState";

export default function Select({
  title = "Select",
  name,
  setValue = (value) => {
    // console.log(value);
  },
  options = [
    { name: "Option 1", value: "option1" },
    { name: "Option 2", value: "option2" },
  ],
}) {
  return (
    <div>
      <label
        htmlFor="HeadlineAct"
        className="block text-sm font-medium text-gray-900"
      >
        {title}
      </label>

      <select
        name={name}
        defaultValue={""}
        onChange={(e) => setValue(e.target.value)}
        className="mt-1.5 w-full p-3 rounded-lg border border-gray-300 text-gray-700 sm:text-sm"
      >
        <option value="" disabled hidden>
          Select {title}
        </option>
        {options &&
          options?.length !== 0 &&
          options.map((option, idx) => (
            <option key={option.name + option.idx} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export function Select2({
  title = "",
  name,
  setValue = (value) => {
    // console.log(value);
  },
  options = [],
}) {
  return (
    <div className="w-full">
      <select
        name={name}
        defaultValue={""}
        onChange={(e) => setValue(e.target.value)}
        className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
      >
        <option value="" disabled hidden>
          {title}
        </option>
        {options &&
          options?.length !== 0 &&
          options.map((option, idx) => (
            <option key={option.name + idx} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export function StateSelect({ value, setValue, customStyle = "" }) 
{
  const advertState = appStore((state) => state)
  const selectedState = advertState.getStates()
  // console.log(selectedState)
  const { data, isLoading } = useQuery("state", fetchState, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });

  return (
    <div className="w-full flex flex-col items-center text-center gap-2">
      <select
        name="state"
        onChange={(e) => {
          advertState.setStates(e.target.value)
          setValue({ state: e.target.value });
        }}
        className={`mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent ${customStyle}`}
      >
        <option value="" disabled hidden>
          Select State
        </option>
        {isLoading && (
          <option value="" disabled>
            Loading
          </option>
        )}
        {data &&
          data?.length !== 0 &&
          data.map((option) => (
            <option key={option.id} value={option.id} selected={option.id === parseInt(selectedState)}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export function MakeAndModelSelect({ value, setValue }) 
{
  const advertState = appStore((state) => state)
  const selectedMaker = advertState.getMaker()
  const selectedModel = advertState.getModel()

  const [maker, setMaker] = useState(value.maker);
  const [model, setModel] = useState(value.model);
  const [others, setOthers] = useState(value.others);

  useEffect(() => {
    setValue({ maker: maker, model: model, others: others });
    advertState.setMaker(maker)
  }, [maker, model, others]);

  // const handleChange = () => {
  // };

  const { data, isLoading } = useQuery("maker", fetchMaker, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });

  const { data: modelData, isLoading: modelIsLoading } = useQuery(
    "model",
    fetchModel,
    {
      // placeholderData: [],
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 2,
    }
  );

  const otherOptions = "others"

  const filteredModel =
    modelData && modelData?.filter((item) => item.make_id == maker);

  // console.log(data);

  return (
    <div className="w-full flex flex-col items-center text-center gap-2">

      <select
        name="maker"
        defaultValue={value.maker}
        onChange={(e) => {
          if(e.target.value === "others")
          {   
            console.log("Equal Others")
            advertState.setOthers(e.target.value)
            advertState.setMaker("Enter Manufacturer")
            // advertState.setModel("Enter Model")
            setOthers(e.target.value)
            console.log("Equal Others")
            console.log(advertState.getOthers())
            advertState.setMaker("")  
          } else {
            setMaker(e.target.value)
            advertState.setOthers("")
            advertState.setMaker(e.target.value)      
            console.log(advertState.getMaker())          
          }
          setModel("");
        }}
        className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
      >
        <option value="" disabled hidden>
          Select Manufacturer
        </option>
        {isLoading && (
          <option value="" disabled>
            Loading
          </option>
        )}
        {
          data && 
          data?.length !== 0 &&
          data.map((option) => (
            <option key={option.id} value={option.id} selected={option.id === parseInt(selectedMaker)}>
              {option.title}
            </option>
          ))
        }
          <option value="others" selected={"others" === parseInt(otherOptions)}>Others</option>
      </select>
      {
          (advertState.getOthers() != "others") && <>
            <select
              name="model"
              // defaultValue={""}
              value={model}
              onChange={(e) => {
                advertState.setModel(e.target.value)
                setModel(e.target.value);
                // handleChange();
              }}
              className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
            >
              <option value="" disabled hidden>
                Select Model
              </option>
              {modelIsLoading && (
                <option value="" disabled>
                  Loading
                </option>
              )}
              {!maker && (
                <option value="" disabled>
                  Select a Maker First
                </option>
              )}
              {modelData &&
                filteredModel?.length !== 0 &&
                filteredModel.map((option) => (
                  <option key={option.code} value={option.id} selected={option.id === parseInt(selectedModel)}>
                    {option.title}
                  </option>
                ))}
            </select>          
          </>
      }
    </div>
  );
}

export function CategorySelect({ value, setValue, customStyle = "" }) 
{ 
  const advertState = appStore((state) => state)
  const selectedCategory = advertState.getCateg()

  const { data, isLoading } = useQuery("category", fetchCategory, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    // retry: 2,
  });

  // console.log(data);

  return (
    <div className="w-full flex flex-col items-center text-center gap-2">
      <select
        name="category"
        onChange={(e) => {
          advertState.setCateg(e.target.value)
          setValue({ category: e.target.value });
        }}
        className={`mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent ${customStyle}`}
      >
        <option value="" disabled hidden>
          Select Category
        </option>
        {isLoading && (
          <option value="" disabled>
            Loading
          </option>
        )}
        {data &&
          data?.length !== 0 &&
          data.map((option) => (
            <option key={option.id} value={option.id} selected={option.id === parseInt(selectedCategory)}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export function MakerSelect({ setValue, customStyle = "" }) {
  const { data, isLoading } = useQuery("make", fetchMaker, {
    staleTime: Infinity,
    retry: 2,
  });

  // console.log(data);

  return (
    <div className="w-full flex flex-col items-center text-center gap-2">
      <select
        name="maker"
        defaultValue={""}
        onChange={(e) => {
          setValue({ category: e.target.value });
        }}
        className={`mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent ${customStyle}`}
      >
        <option value="" disabled hidden>
          Select Maker
        </option>
        {isLoading && (
          <option value="" disabled>
            Loading
          </option>
        )}
        {data &&
          data?.length !== 0 &&
          data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
      </select>
    </div>
  );
}

export function TransmissionSelect({ value, setValue })  
{
  const advertState = appStore((state) => state)
  const selectedTransmission = advertState.getTransmission()

  const { data, isLoading } = ("transmission", fetchTransmission, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });

  if(!isLoading)
  {
    console.log(data);
  } else {
    console.log(isLoading)
    console.log("Trying to access db")
  }

  return (
    <div className="w-full flex flex-col items-center text-center gap-2">
      <select
        name="transmission"
        defaultValue={value}
        onChange={(e) => {
          advertState.setTransmission(e.target.value)
          setValue({ transmission: e.target.value });
        }}
        className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
      >
        <option value="" disabled hidden>
          Select Transmission
        </option>
        {isLoading && (
          <option value="" disabled>
            Loading
          </option>
        )}
        { data?.length }
        {data &&
          data?.length !== 0 &&
          data.map((option) => (
            <option key={option.id} value={option.id} selected={option.id === parseInt(selectedTransmission)}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export function TrimSelect({ value, setValue }) 
{
  const advertState = appStore((state) => state)
  const selectedTrim = advertState.getTrim()

  const { data, isLoading } = ("trim", fetchTrim, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });

  // console.log(typeof parseInt(selectedTrim))

  // console.log(data);

  // data.map((option) => (
  //     console.log(option)
  // ))

  return (
    <div className="w-full flex flex-col items-center text-center gap-2">
      <select
        name="colour"
        defaultValue={value}
        onChange={(e) => {
          advertState.setTrim(e.target.value)
          setValue({ trim: e.target.value });
        }}
        className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
      >
        <option value="" disabled hidden>
          Select Trim (Optional)
        </option>
        {isLoading && (
          <option value="" disabled>
            Loading
          </option>
        )}
        {data &&
          data?.length !== 0 &&
          data.map((option) => (
            <option key={option.id} value={option.id} selected={option.id === selectedTrim}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export function ConditionSelect({ value, setValue })
{
  const advertState = appStore((state) => state)
  const selectedCondition = advertState.getCondition()

  const { data, isLoading } = useQuery("codition", fetchCondition, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });

  // console.log(data);

  return (
    <div className="w-full flex flex-col items-center text-center gap-2">
      <select
        name="condition"
        defaultValue={value}
        onChange={(e) => {
          advertState.setCondition(e.target.value)
          setValue({ condition: e.target.value });
        }}
        className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
      >
        <option value="" disabled hidden>
          Select Condition
        </option>
        {isLoading && (
          <option value="" disabled>
            Loading
          </option>
        )}
        {data &&
          data?.length !== 0 &&
          data.map((option) => (
            <option key={option.id} value={option.id} selected={option.id === parseInt(selectedCondition)}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export function ColourSelect({ value, setValue }) 
{
  const advertState = appStore((state) => state)
  const selectedColour = advertState.getColour()

  const { data, isLoading } = useQuery("colur", fetchColour, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });

  // console.log(data);

  return (
    <div className="w-full flex flex-col items-center text-center gap-2">
      <select
        name="colour"
        defaultValue={value}
        onChange={(e) => {
          advertState.setColour(e.target.value)
          setValue({ colour: e.target.value });
        }}
        className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
      >
        <option value="" disabled hidden>
          Select Colour
        </option>
        {isLoading && (
          <option value="" disabled>
            Loading
          </option>
        )}
        {data &&
          data?.length !== 0 &&
          data.map((option) => (
            <option key={option.id} value={option.id} data-id={option.name} selected={option.id === parseInt(selectedColour)}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export function YearSelect({ value, setValue, customStyle = "" }) 
{
  const advertState = appStore((state) => state)
  const selectedYear = advertState.getCateg()

  const [year, setYear] = useState(value);
  const years = getYearsArray();

  useEffect(() => {
    setValue({ year_of_production: `${year}` });
  }, [year]);
  return (
    <div className="w-full ">
      <select
        name="make_id"
        defaultValue={value}
        onChange={(e) => {
          advertState.setYearOfPoduction(e.target.value)
          setYear(e.target.value)
        }}
        className={`mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent ${customStyle}`}
      >
        <option value="" disabled hidden>
          Year of production
        </option>

        {years &&
          years?.length !== 0 &&
          years.map((option) => (
            <option key={option} value={option} selected={option.id === parseInt(selectedYear)}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}
