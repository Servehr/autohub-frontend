import { fetchColour, fetchMaker, fetchModel } from "@/apis/misc";
import { useQuery } from "react-query";

export function getYearsArray() {
  const currentYear = new Date().getFullYear();
  const endYear = Math.max(currentYear, 2023); // Ensure the start year is 2023 or greater
  const years = [];

  for (let year = 1995; year <= endYear; year++) {
    years.push(year);
  }

  return years.toReversed();
}

export function getColor(id) {
  const { data } = useQuery("colur", fetchColour, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });

  let color_name;

  if (data) {
    data.filter((color) => {
      if (color.id == id) {
        color_name = color.name;
      }
    });
    return color_name;
  }
}
export function getMaker(id) {
  const { data } = useQuery("maker", fetchMaker, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });

  let maker_name;

  if (data) {
    data.filter((color) => {
      if (color.id == id) {
        maker_name = color.code;
      }
    });
    return maker_name;
  }
}

export function getModel(id) {
  const { data } = useQuery("model", fetchModel, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });

  let color_name;

  if (data) {
    data.filter((color) => {
      if (color.id == id) {
        color_name = color.code;
      }
    });
    return color_name;
  }
}
