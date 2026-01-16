import { DateValue } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchCourtsByStadiumReserved(date: DateValue,hour: string,selectedStadium: number){
   const month = date.month >= 10 ? date.month : '0'+date.month; 
   const day = date.day >=10 ? date.day : '0'+ date.day
   const dateFormat = date.year + '-' + month  + '-' + day
   const response = await axios.get(
    `/api/booking?date=${dateFormat}&hour=${hour}&selectedStadium=${selectedStadium}`
  );
  return response.data;
}

export const useFetchCourtsByStadiumReserved = (date:DateValue,hour:string,openModal:boolean,selectedStadium:number) =>{
    const { data, isPending } = useQuery({
    queryKey: ["courts", hour],
    queryFn: () => fetchCourtsByStadiumReserved(date,hour,selectedStadium),
    enabled: !!openModal,
  });
  return { data, isPending };
}