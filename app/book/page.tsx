"use client";
import React, {
  useState,
  useReducer,
  useMemo,
  useEffect,
} from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import BodyLayout from "../components/bodyLayout";
import Footer from "../components/footer";
import Calendar from "../components/calendar";
import Dropdown from "../components/dropdown";
import AvailableHours from "../components/availableHour";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";
import PopUp from "../components/popup";
import Category from "../components/category";
import BookingCourt from "../components/bookingCourt";
import { useFetchStadiumsWithQuery,Weekday,Court } from "../endpoint/getStadium";
import { useFetchCourtsByStadiumReserved } from "../endpoint/getCourts";

type Action =
  | { type: "sport"; payload: string }
  | { type: "town"; payload: string }
  | { type: "stadium"; payload: {id:number, name:string} }

type Training = {
  selectedSport: string;
  selectedTown: string;
  selectedStadium: { id:number , name : string};
};

const initialTraining: Training = {
  selectedSport: "",
  selectedTown: "",
  selectedStadium: {id:0 , name:""},
};

export type CourtDataType = {
  sport: string;
  town: string;
  stadium: {id:number,name:string};
  court: {id:number,name:string };
  category: string;
  courtDate: DateValue;
  courtHour: string;
};

const Book: React.FC = () => {
  const [
    { selectedSport, selectedTown, selectedStadium },
    dispatch,
  ] = useReducer(reducer, initialTraining);

  function reducer(state: Training, action: Action) {
    switch (action.type) {
      case "sport":
        return {
          ...state,
          selectedSport: action.payload,
          selectedTown: "",
          selectedStadium: {id:0,name:""},
        };
      case "town":
        return {
          ...state,
          selectedTown: action.payload,
          selectedStadium: {id:0,name:""},
        };
      case "stadium":
        return { ...state, selectedStadium: action.payload, selectedCoach: "" };
    }
  }

  const [isSetupComplete, setSetupComplete] = useState(false);
  const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
  const [dropdown, setDropdown] = useState("");
  const [open, setOpen] = useState<number>(-1);
  const [openModal, setOpenModal] = useState(false);
  const [hour, setHour] = useState("");
  const [bookCourt, setBookCourt] = useState<CourtDataType[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [availableHours,setAvailableHours] = useState<string[]>([]);

  const { data:stadiumsBySport } = useFetchStadiumsWithQuery(selectedSport);
  const stadiums = stadiumsBySport?.data
  
 
  useEffect(()=>{
   const stadium = stadiums?.filter( stadium => stadium.name === selectedStadium.name )

   const jsDate = date.toDate(getLocalTimeZone());

   const weekday = jsDate.toLocaleDateString("en-US", { weekday: "long" })
  
   setAvailableHours(splitTimeRange(stadium?.at(0)?.reservationByTime,stadium?.at(0)?.[`${weekday.toLowerCase()}Start` as `${Weekday}Start`],stadium?.at(0)?.[`${weekday.toLowerCase()}End` as `${Weekday}End` ]))
   
  },[selectedStadium,date])

  const sports = ["Football", "Basketball"];
  const updatedSport = sports.map((sport, index) => ({
    name: sport,
    id: index,
  }));

  const towns = useMemo(() => {
    if (stadiums && stadiums.length != 0) {
     return  Array.from(
        new Set(
          stadiums
            ?.filter((stadium) => stadium.sport === selectedSport)
            .map((stadium) => stadium.town)
        )
      ).map((town, index) => ({
        name: town,
        id: index,
      }));
    }
  }, [stadiums,selectedSport]);

  const stadiumsCompany = useMemo(() => {
    if (stadiums  && stadiums.length != 0 && selectedTown!="") {
      return stadiums
        .filter(
          (stadium) =>
            stadium.sport === selectedSport && stadium.town === selectedTown
        )
        .map((stadium) => ({
          id: stadium?.id,
          name: stadium?.name,
        }));
    }
  }, [selectedSport, selectedTown]);

  const courtByStadium = stadiums?.filter( stadium => stadium.name === selectedStadium.name )[0]?.courts;

  // const coaches = data
  //     .filter(item => item.sport === selectedSport && item.town === selectedTown && item.name === selectedStadium)
  //     .flatMap(item => (item.coaches))
  //     .map(coach => ({ id: coach.id, name: coach.name }));

  const handleSportChange = (event: React.MouseEvent<HTMLOptionElement>) => {
    const target = event.target as HTMLOptionElement;
    const sport = target.value;
    dispatch({ type: "sport", payload: sport });
  };

  const handleTownChange = (event: React.MouseEvent<HTMLOptionElement>) => {
    const target = event.target as HTMLOptionElement;
    const value = target.value;
    dispatch({ type: "town", payload: value });
  };

  const handleStadiumChange = (event: React.MouseEvent<HTMLOptionElement>) => {
    const target = event.target as HTMLOptionElement;
    const value = target.value;
    const selectStadium = stadiums?.filter(stadium => stadium.name === value )
    dispatch({ type: "stadium", payload:({ id: ((selectStadium && selectStadium[0].id)?? 0), name:((selectStadium && selectStadium[0].name )?? "")})});
    setDate(today(getLocalTimeZone()));
  };

  // const handleCoachChange = (event:React.MouseEvent<HTMLOptionElement>) => {
  //     const target = event.target as HTMLOptionElement;
  //     const value = target.value;
  //     dispatch({type:'coach', payload:value})
  // }

  function splitTimeRange(reservationTime: string | undefined ,startWorkHour:string|undefined, endWorkHour:string|undefined) {
    const startTime = startWorkHour?.split(':').slice(0,2)
    const endTime = endWorkHour?.split(':').slice(0,2)
    const startDate = new Date(date.toDate("UTC"));
    const endDate = new Date(date.toDate("UTC"));
    if(startTime && startTime?.length!=0){startDate.setHours(Number(startTime[0]),Number(startTime[1]),0,0)}
    if(endTime && endTime?.length!=0){endDate.setHours(Number(endTime[0]),Number(endTime[1]),0,0)}
    
    let current = new Date(startDate);
    const end = new Date(endDate);
    
    const [h, m] = (reservationTime ?? "00:00:00").split(":").map(Number);

    const intervalMs = ((h * 60 + m) * 60 ) * 1000;
    
    const intervals = [];
    
    while (current < end) {
      const next = new Date(current.getTime() + intervalMs)
     
      if(next.getTime() - Date.now() > intervalMs) intervals.push(`${formatTime(current)}-${formatTime(next)}`);
      current = next;
    }

    return intervals;
  }

  function formatTime(date: Date) {
    return date.toTimeString().slice(0, 5);
  }
  const{data:courts,isPending:courtsPending} = useFetchCourtsByStadiumReserved(date,hour,openModal,selectedStadium.id)
  const bookedCourts = courts?.data
  const handleClose = () => {
    setOpenModal(false);
    setOpen(-1);
  };

  const handleCourt = (
    court: Court 
  ) => {
      setBookCourt((prev) => [
        ...prev,
        {
          sport: selectedSport,
          town: selectedTown,
          stadium:  {id:selectedStadium.id ,name:selectedStadium.name},
          court:  {id:court.id,name: court.name},
          category: court.category,
          courtDate: date,
          courtHour: hour,
        },
      ]);
      setPrice((prev) => prev + court.price);
    
    handleClose();
  };
  const deleteCourt = (index: number) => {
    setBookCourt((prevCourts) => prevCourts.filter((_, i) => i !== index));
    setPrice((prev) => prev - 50);
  };

  return (
    <BodyLayout overflow={`${open == -1 ? "auto" : "hidden"}`}>
      <div className={`${open != -1 ? "blur-lg" : ""}`}>
        <div className={` mt-8 grid grid-rows-2 `}>
          <Header />
          <Sidebar />

          <div className="grid grid-cols-4 justify-items-center content-center overflow-x-hidden mx-2 z-10">
            <Dropdown
              className="bg-slate-800 w-full ml-2 h-40 text-center rounded grid content-center"
              dropdown={dropdown}
              setDropdown={setDropdown}
            >
              <Dropdown.Title title="sport" />

              <Dropdown.Select
                value="sport"
                field={selectedSport}
                disabled={false}
              >
                <Dropdown.Options
                  value="sport"
                  array={updatedSport}
                  handleChangeDropdown={handleSportChange}
                />
              </Dropdown.Select>
            </Dropdown>

            <Dropdown
              className="bg-slate-800 w-full ml-4 h-40 rounded text-center grid content-center"
              dropdown={dropdown}
              setDropdown={setDropdown}
            >
              <Dropdown.Title title="town" />

              <Dropdown.Select
                value="town"
                field={selectedTown}
                disabled={!selectedSport}
              >
                <Dropdown.Options
                  value="town"
                  array={towns}
                  handleChangeDropdown={handleTownChange}
                />
              </Dropdown.Select>
            </Dropdown>

            <Dropdown
              className="bg-slate-800 w-full ml-6 h-40 rounded text-center grid content-center"
              dropdown={dropdown}
              setDropdown={setDropdown}
            >
              <Dropdown.Title title="stadium" />

              <Dropdown.Select
                value="stadium"
                field={selectedStadium.name}
                disabled={!selectedTown}
              >
                <Dropdown.Options
                  value="stadium"
                  array={stadiumsCompany}
                  handleChangeDropdown={handleStadiumChange}
                />
              </Dropdown.Select>
            </Dropdown>
            {/* 
            <Dropdown
              className="bg-slate-800 w-full ml-8 h-40 rounded text-center grid content-center"
              dropdown={dropdown}
              setDropdown={setDropdown}
            >
              <Dropdown.Title title="coach" />

              <Dropdown.Select
                value="coach"
                field={selectedCoach}
                disabled={!selectedStadium}
              >
                <Dropdown.Options
                  value="coach"
                  array={coaches}
                  handleChangeDropdown={handleCoachChange}
                />
              </Dropdown.Select>
            </Dropdown> */}
          </div>
          {open != -1 ? (
            <PopUp title="Category" isOpen={openModal} isClose={handleClose}>
              <Category sport={selectedSport} bookedCourts={bookedCourts} courtsByStadium={courtByStadium} courtsPending={courtsPending} handleCourt={handleCourt} comingBookCourt={bookCourt}/>
            </PopUp>
          ) : null}
          <div className="grid grid-cols-2 z-10 mx-2 my-2 space-x-2">
            <Calendar
              isSetupComplete={isSetupComplete}
              selectedStadium={selectedStadium.name}
              onSetComplete={setSetupComplete}
              handleDate={(date) => setDate(date)}
              date={date}
              open={open}
            />
            <AvailableHours
              selectedStadium={selectedStadium.name}
              setOpen={setOpen}
              availableHours={availableHours}
              setOpenModal={setOpenModal}
              setHour={setHour}
             
            />
          </div>
        </div>

        <BookingCourt
          bookCourt={bookCourt}
          deleteCourt={deleteCourt}
          price={price}
        />
      </div>
      <div
        className={`${
          open == -1 ? "overflow-auto" : "overflow-hidden blur-lg"
        }`}
      >
        <Footer />
      </div>
    </BodyLayout>
  );
};

export default Book;
