import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type StadiumResponse = {
  status: string;
  data: Stadium[] | undefined;
  message: string;
};
export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Stadium = {
  id: number;
  name: string;
  town: string;
  address: string;
  region: string;
  latitude: string;
  longitude: string;
  sport: string;
  reservationByTime: string;
  courts: Court[];
} & {
  [K in Weekday as `${K}Start`]: string;
} & {
  [K in Weekday as `${K}End`]: string;
};

export type Court = {
  id: number;
  name: string;
  category: string;
  price: number;
  interior: boolean;
};

const fetchStadiums = async (sport: string) => {
  const response = await axios.get(
    `/api/stadiums/find/bySport?sport=${sport}`
  );
  return response.data;
};

export const useFetchStadiumsWithQuery = (selectedSport: string) => {
  const { data, isPending } = useQuery<StadiumResponse>({
    queryKey: ["stadiums", selectedSport],
    queryFn: () => fetchStadiums(selectedSport),
    enabled: !!selectedSport,
  });
  return { data, isPending };
};
