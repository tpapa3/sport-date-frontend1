'use client'

import BodyLayout from "../components/bodyLayout";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { useReducer, useState } from "react";
import { TimeValue } from "@react-types/datepicker";
import Schedule from "../components/schedule";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import HelpIcon from "../components/helpIcon";
import { uploadStadium } from "../endpoint/uploadStadium";
import { category } from '../constants/constants';
import { useMutation } from "@tanstack/react-query";
import Loading from '../components/loading';
import axios from "axios";

// type Sizes = '5x5' | '7x7' | '9x9' | '11x11' | 'basket';
// type CourtKey = `court ${Sizes}`;

// type StadiumGeneric<Type extends string | number | symbol> = {
//   [Property in Type] : number;
// }

// type StadiumCategory = StadiumGeneric<CourtKey>

export interface FormValue {
  stadium: string;
  town: string;
  region: string;
  address: string;
  latitude: number;
  longitude: number;
  sport: string;
  reservationByTime: string;
  [key: `court ${string}`]: number;
  [key: `startTime ${number}`]: TimeValue | null;
  [key: `endTime ${number}`]: TimeValue | null;
}


type Action =
  | { type: "startTime"; index: number; startTime: TimeValue | null }
  | { type: "endTime"; index: number; endTime: TimeValue | null }

const sizesInCat = ['5x5-In-Cat', '7x7-In-Cat', '9x9-In-Cat', '11x11-In-Cat', 'basket-In-Cat'];
const sizesOutCat = ['5x5-Out-Cat', '7x7-Out-Cat', '9x9-Out-Cat', '11x11-Out-Cat', 'basket-Out-Cat']
const sizesInPrice = ['5x5-In-Price', '7x7-In-Price', '9x9-In-Price', '11x11-In-Price', 'basket-In-Price'];
const sizesOutPrice = ['5x5-Out-Price', '7x7-Out-Price', '9x9-Out-Price', '11x11-Out-Price', 'basket-Out-Price']

const numEntries = 7
const programm: FormValue = {
  stadium: "",
  town: "",
  region: "",
  address: "",
  latitude: 0,
  longitude: 0,
  ...Object.fromEntries(
    sizesInCat.map(size => [`court ${size}`, 0])),
  ...Object.fromEntries(
    sizesOutCat.map(size => [`court ${size}`, 0])),
  ...Object.fromEntries(
    sizesInPrice.map(size => [`court ${size}`, 0])),
  ...Object.fromEntries(
    sizesOutPrice.map(size => [`court ${size}`, 0])),
  reservationByTime: 0,
  ...Object.fromEntries(
    Array.from({ length: numEntries }, (_, i) => [
      [`startTime ${i}`, {hour:0,minute:0}],
      [`endTime ${i}`, {hour:0,minute:0}],
    ]).flat()
  ),
};



function reducer(state: FormValue, action: Action): FormValue {

  return action.type == 'startTime' ? { ...state, [`${action.type} ${action.index}`]: action.startTime } : { ...state, [`${action.type} ${action.index}`]: action.endTime }

}

const UploadStadium: React.FC = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormValue>({
    defaultValues:
      Object.fromEntries(
        Array.from({ length: 7 }, (_, i) => [
          [`startTime ${i}`, 0],
          [`endTime ${i}`, 0],
        ]).flat())
  })
 async function upload(stadium: Record<string, unknown>){
  const response = await axios.post('http://localhost:8080/api/stadiums', 
    stadium
  ,{
    headers:{
      "Content-Type":'application/json'
    }
  })
  return response.data;
}

  const { isPending, mutate } = useMutation({
      mutationFn: (body: Record<string, unknown>) => upload(body),
      onSuccess: (data) => {
        console.log(data)
      }
    })

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    console.log(data);
    await uploadStadium(data,mutate);
  }
  const watchSport = useWatch({ control, name: "sport", defaultValue: "" });
  const footballFields = useWatch({
    control,
    name: [
      "court 5x5-In-Cat",
      "court 5x5-Out-Cat",
      "court 7x7-In-Cat",
      "court 7x7-Out-Cat",
      "court 9x9-In-Cat",
      "court 9x9-Out-Cat",
      "court 11x11-In-Cat",
      "court 11x11-Out-Cat",
    ],
    defaultValue: {
      "court 5x5-In-Cat": 0,
      "court 5x5-Out-Cat": 0,
      "court 7x7-In-Cat": 0,
      "court 7x7-Out-Cat": 0,
      "court 9x9-In-Cat": 0,
      "court 9x9-Out-Cat": 0,
      "court 11x11-In-Cat": 0,
      "court 11x11-Out-Cat": 0,
    },
    disabled: watchSport !== "Football", // Only watch when sport is Football
  });
  const basketballFields = useWatch({
    control,
    name: ["court basket-In-Cat", "court basket-Out-Cat"],
    defaultValue: { "court basket-In-Cat": 0, "court basket-Out-Cat": 0 },
    disabled: watchSport !== "Basketball", // Only watch when sport is Basketball
  });

  const [
    watch5x5In,
    watch5x5Out,
    watch7x7In,
    watch7x7Out,
    watch9x9In,
    watch9x9Out,
    watch11x11In,
    watch11x11Out,
  ] = footballFields;
  const [watchBasketIn, watchBasketOut] = basketballFields;

  const { COURT_5X5_IN_CAT, COURT_7X7_IN_CAT, COURT_9X9_IN_CAT, COURT_11X11_IN_CAT, COURT_BASKET_IN_CAT,
    COURT_5X5_OUT_CAT, COURT_7X7_OUT_CAT, COURT_9X9_OUT_CAT, COURT_11X11_OUT_CAT, COURT_BASKET_OUT_CAT,
    COURT_5X5_IN_PRICE, COURT_7X7_IN_PRICE, COURT_9X9_IN_PRICE, COURT_11X11_IN_PRICE, COURT_BASKET_IN_PRICE,
    COURT_5X5_OUT_PRICE, COURT_7X7_OUT_PRICE, COURT_9X9_OUT_PRICE, COURT_11X11_OUT_PRICE, COURT_BASKET_OUT_PRICE } = category

  const [state, dispatch] = useReducer(reducer, programm as FormValue)
  const [indexIcon, setIndexIcon] = useState(-1);
  const [field, setField] = useState("");
  // const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = state


  const getTimeValue = (state: FormValue, key: keyof FormValue) => state[key];

  const handleEachTimeChange = (
    type: 'startTime' | 'endTime',
    index: number,
    date: TimeValue
  ) => {
    if (type == 'startTime') { dispatch({ type: "startTime", index, startTime: date }) }
    else { dispatch({ type: "endTime", index, endTime: date }) }

  }
  const validateTime = (value: TimeValue | null, index: number) => {

    const startTime = getTimeValue(state, `startTime ${index}`) as TimeValue | null
    const endTime = getTimeValue(state, `endTime ${index}`) as TimeValue | null
    if (startTime == null || endTime == null) {
      return 'Time is required'
    }

    if (startTime && endTime && endTime.hour <= startTime.hour) {
      return "End time must be later than start time";
    }

    if(endTime.hour == 0){
      return "End time should not be 12 midnight,because it is next day";
    }

    return true;
  }

  const handleChange = (date: TimeValue | null, day: string, workingHour: 'startTime' | 'endTime', index: number) => {
    if (date?.hour != null && date?.minute != null) {
      const dayModified = day.toLocaleLowerCase().replace("", '')
      switch (dayModified) {
        case "monday":
          handleEachTimeChange(workingHour, index, date)
          break;
        case "tuesday":
          handleEachTimeChange(workingHour, index, date)
          break;
        case "wednesday":
          handleEachTimeChange(workingHour, index, date)
          break;
        case "thursday":
          handleEachTimeChange(workingHour, index, date)
          break;
        case "friday":
          handleEachTimeChange(workingHour, index, date)
          break;
        case "saturday":
          handleEachTimeChange(workingHour, index, date)
          break;
        case "sunday":
          handleEachTimeChange(workingHour, index, date)
          break;
      }
    }
  }

  const handleClickIcon = (event: React.MouseEvent<SVGElement>, field: string, position?: number) => {
    const needPosition = position != undefined ? setIndexIcon(position) : undefined
    setField(field);
    setTimeout(() => {
      if (needPosition != undefined) {
        setIndexIcon(-1);
      }
      setField("");
    }, 3000)
  }

  return (
    <BodyLayout overflow='auto'>
      <Header />
      <Sidebar />
      {isPending ? <Loading/>:<></>}
      <div className='bg-slate-800 mx-10 mt-20'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-lg text-white flex justify-center pt-2 font-bold'>Upload Stadium</h2>

          <div className='grid grid-cols-2 justify-items-center mt-10'>
            <div className='text-md mb-3'>
              <div className='grid grid-cols-[180px_180px]'>
                <div className='flex justify-start'>
                  <label className='text-white'>Stadium:</label>
                </div>
                <div className='z-50'>
                  <input {...register("stadium", {
                    required: { value: true, message: 'The name of the stadium is required' },
                    pattern: { value: /^[Α-Ωα-ωA-Za-z0-9]+$/, message: 'Allowed only alphanumeric characters' }
                  })} />
                </div>
                <div></div>
                <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors.stadium && errors.stadium.message}</p>
              </div>
            </div>
            <div className='text-md mb-3'>
              <div className='grid grid-cols-[180px_180px]'>
                <div className='flex justify-start'>
                  <label className='text-white'>Town:</label>
                </div>
                <div className='z-50'>
                  <input {...register("town", {
                    required: { value: true, message: 'The name of the town is required' },
                    pattern: { value: /^[Α-Ωα-ωA-Za-z]+$/, message: 'Allowed only letters' }
                  })} />
                  <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors.town && errors.town.message}</p>
                </div>
              </div>
            </div>
            <div className='text-md mb-3'>
              <div className='grid grid-cols-[180px_180px]'>
                <div className='flex justify-start'>
                  <label className='text-white'>Region:</label>
                </div>
                <div className='z-50'>
                  <input {...register("region", {
                    required: { value: true, message: 'The name of the region is required' },
                    pattern: { value: /^[Α-Ωα-ωA-Za-z]+$/, message: 'Allowed only letters' }
                  })} />
                  <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors.region && errors.region.message}</p>
                </div>

              </div>
            </div>
            <div className='text-md mb-3 '>
              <div className='grid grid-cols-[180px_180px]'>
                <div className='flex justify-start'>
                  <label className='text-white'>Address:</label>
                </div>
                <div className='z-50'>
                  <input {...register("address", {
                    pattern: { value: /^[Α-Ωα-ωA-Za-z0-9\s]+$/, message: 'Allowed only alphanumeric characters' }
                  })} />
                  <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors.address && errors.address.message}</p>
                </div>
              </div>
            </div>
            <div className='text-md mb-3 grid content-center'>
              <div className='grid grid-cols-[180px_180px]'>
                <div className='flex justify-start items-center'>
                  <label className='text-white'>Location(Coords):</label>
                </div>
                <div>
                  <div className='mb-1 flex'>
                    <input {...register("latitude", { pattern: { value: /^[\d{2}\.\d{7}]+$/, message: 'Allowed only numbers' } })}
                      placeholder="Latitude"
                    />
                    <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, 'latitude', 1)} /></span>
                    {field == 'latitude' && indexIcon == 1 ?
                      (<HelpIcon >Pattern is ##.#######</HelpIcon>)
                      : null}
                  </div>
                  <div className='flex'>
                    <input {...register("longitude", { pattern: { value: /^[\d{2}\.\d{7}]+$/, message: 'Allowed only numbers' } })}
                      placeholder="Longitude" />
                    <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, 'longitude', 2)} /></span>
                    {field == 'longitude' && indexIcon == 2 ?
                      (<HelpIcon>Pattern is ##.#######</HelpIcon>)
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className='text-md mb-3 grid content-center'>
              <div className='grid grid-cols-[180px_180px]'>
                <div className='flex justify-start'>
                  <label className='text-white'>Sport:</label>
                </div>
                <div className='z-50'>
                  <select {...register("sport", { value: 'Select Sport', required: { value: true, message: 'Select sport' } })} className='w-full' >
                    <option value="Basketball">Basketball</option>
                    <option value="Football">Football</option>
                  </select>
                  <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors.sport && errors.sport.message}</p>
                </div>
              </div>
            </div>
            <div className='text-md mb-3 grid content-center'>
              <div className='grid grid-cols-[180px_90px_95px]'>
                <div className='flex justify-start items-center'>
                  <label className='text-white'>Category:</label>
                </div>
                <div className='z-50'>
                  <span className='text-white flex justify-center'>Inside</span>
                  {watchSport == 'Football' ?
                    <>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_5X5_IN_CAT}`, { required: { value: true, message: 'Add the number of interior 5X5, if do not exist, add 0' } })} placeholder='5x5' className='w-full max-w-[85px]' />
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_5X5_IN_CAT}`] && errors[`court ${COURT_5X5_IN_CAT}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_7X7_IN_CAT}`, { required: { value: true, message: 'Add the number of interior 7X7, if do not exist, add 0' } })} placeholder='7x7' className='w-full max-w-[85px]' />
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_7X7_IN_CAT}`] && errors[`court ${COURT_7X7_IN_CAT}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_9X9_IN_CAT}`, { required: { value: true, message: 'Add the number of interior 9x9, if do not exist, add 0' } })} placeholder='9x9' className='w-full max-w-[85px]' />
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_9X9_IN_CAT}`] && errors[`court ${COURT_9X9_IN_CAT}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex'>
                          <input {...register(`court ${COURT_11X11_IN_CAT}`, { required: { value: true, message: 'Add the number of interior 11x11, if do not exist, add 0' } })} placeholder='11x11' className='w-full max-w-[85px]' />
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_11X11_IN_CAT}`] && errors[`court ${COURT_11X11_IN_CAT}`]?.message}</p>
                      </div>
                    </>
                    : watchSport == 'Basketball' ?
                      <div>
                        <div className='flex'>
                          <input {...register(`court ${COURT_BASKET_IN_CAT}`, { required: { value: true, message: 'Add the number of interior courts,  if do not exist, add 0' } })} placeholder='Basketball court' className='w-full max-w-[85px]' />
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_BASKET_IN_CAT}`] && errors[`court ${COURT_BASKET_IN_CAT}`]?.message}</p>
                      </div>
                      : <div><input placeholder="Select Sport" disabled></input></div>}

                </div>
                <div className='z-50'>
                  <span className='text-white flex justify-center'>Outside</span>
                  {watchSport == 'Football' ?
                    <>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_5X5_OUT_CAT}`, { required: { value: true, message: 'Add the number of exterior 5X5, if do not exist , add 0' } })} placeholder='5x5' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, '5x5-Cat')} /></span>
                          {field == '5x5-Cat' ?
                            (<HelpIcon>Add the number of 5x5 or 6x6, interior or exterior space</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_5X5_OUT_CAT}`] && errors[`court ${COURT_5X5_OUT_CAT}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_7X7_OUT_CAT}`, { required: { value: true, message: 'Add the number of exterior 7X7, if do not exist , add 0' } })} placeholder='7x7' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, '7x7-Cat')} /></span>
                          {field == '7x7-Cat' ?
                            (<HelpIcon>Add the number of 7x7, interior or exterior space</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_7X7_OUT_CAT}`] && errors[`court ${COURT_7X7_OUT_CAT}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_9X9_OUT_CAT}`, { required: { value: true, message: 'Add the number of exterior 9x9,  if do not exist , add 0' } })} placeholder='9x9' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, '9x9-Cat')} /></span>
                          {field == '9x9-Cat' ?
                            (<HelpIcon>Add the number of 9x9 or 8x8, interior or exterior space</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_9X9_OUT_CAT}`] && errors[`court ${COURT_9X9_OUT_CAT}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex'>
                          <input {...register(`court ${COURT_11X11_OUT_CAT}`, { required: { value: true, message: 'Add the number of exterior 11x11, if do not exist , add 0' } })} placeholder='11x11' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, '11x11-Cat')} /></span>
                          {field == '11x11-Cat' ?
                            (<HelpIcon>Add the number of 11x11, interior or exterior space</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_11X11_OUT_CAT}`] && errors[`court ${COURT_11X11_OUT_CAT}`]?.message}</p>
                      </div>
                    </>
                    : watchSport == 'Basketball' ?
                      <div>
                        <div className='flex'>
                          <input {...register(`court ${COURT_BASKET_OUT_CAT}`, { required: { value: true, message: 'Add the number of enterior or exterior courts, if do not exist , add 0' } })} placeholder='Basketball court' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, 'basketball-Cat')} /></span>
                          {field == 'basketball-Cat' ?
                            (<HelpIcon>Add the number of enterior or exterior courts</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_BASKET_OUT_CAT}`] && errors[`court ${COURT_BASKET_OUT_CAT}`]?.message}</p>
                      </div>
                      : <></>}


                </div>
              </div>
            </div>
            <div className='text-md mb-3'>
              <div className='grid grid-cols-[180px_90px_90px]'>
                <div className='flex items-center'>
                  <label className='text-white'>Price:</label>
                </div>
                <div className=''>
                  <span className='text-white flex justify-center'>Inside</span>
                  {watchSport == 'Football' ?
                    <>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_5X5_IN_PRICE}`, { required: { value: true, message: 'Add the price of interior 5X5,  if do not exist, add 0' }, disabled: watch5x5In == 0 })} placeholder='5x5' className='w-full max-w-[85px]' />
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_5X5_IN_PRICE}`] && errors[`court ${COURT_5X5_IN_PRICE}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_7X7_IN_PRICE}`, { required: { value: true, message: 'Add the number of interior 7X7,  if do not exist, add 0' }, disabled: watch7x7In == 0 })} placeholder='7x7' className='w-full max-w-[85px]' />
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_7X7_IN_PRICE}`] && errors[`court ${COURT_7X7_IN_PRICE}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_9X9_IN_PRICE}`, { required: { value: true, message: 'Add the number of interior 9x9,  if do not exist, add 0' }, disabled: watch9x9In == 0 })} placeholder='9x9' className='w-full max-w-[85px]' />

                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_9X9_IN_PRICE}`] && errors[`court ${COURT_9X9_IN_PRICE}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex'>
                          <input {...register(`court ${COURT_11X11_IN_PRICE}`, { required: { value: true, message: 'Add the number of interior 11x11,  if do not exist, add 0' }, disabled: watch11x11In == 0 })} placeholder='11x11' className='w-full max-w-[85px]' />
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_11X11_IN_PRICE}`] && errors[`court ${COURT_11X11_IN_PRICE}`]?.message}</p>
                      </div>
                    </>
                    : watchSport == 'Basketball' ?
                      <div>
                        <div className='flex'>
                          <input {...register(`court ${COURT_BASKET_IN_PRICE}`, { required: { value: true, message: 'Add the number of interior courts,  if do not exist, add 0' }, disabled: watchBasketIn == 0 })} placeholder='Basketball court' className='w-full max-w-[85px]' />
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_BASKET_IN_PRICE}`] && errors[`court ${COURT_BASKET_IN_PRICE}`]?.message}</p>
                      </div>
                      : <div><input placeholder="Select Price" disabled></input></div>}

                </div>
                <div className=''>
                  <span className='text-white flex justify-center'>Outside</span>
                  {watchSport == 'Football' ?
                    <>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_5X5_OUT_PRICE}`, { required: { value: true, message: 'Add the number of exterior 5X5,  if do not exist, add 0' }, disabled: watch5x5Out == 0 })} placeholder='5x5' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, '5x5-Price')} /></span>
                          {field == '5x5-Price' ?
                            (<HelpIcon>Add the price of 5x5 or 6x6, interior or exterior space</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_5X5_OUT_PRICE}`] && errors[`court ${COURT_5X5_OUT_PRICE}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_7X7_OUT_PRICE}`, { required: { value: true, message: 'Add the number of exterior 7X7,  if do not exist, add 0' }, disabled: watch7x7Out == 0 })} placeholder='7x7' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, '7x7-Price')} /></span>
                          {field == '7x7-Price' ?
                            (<HelpIcon>Add the price of 7x7, interior or exterior space</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_7X7_OUT_PRICE}`] && errors[`court ${COURT_7X7_OUT_PRICE}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex mb-0.5'>
                          <input {...register(`court ${COURT_9X9_OUT_PRICE}`, { required: { value: true, message: 'Add the number of exterior 9x9,  if do not exist, add 0' }, disabled: watch9x9Out == 0 })} placeholder='9x9' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, '9x9-Price')} /></span>
                          {field == '9x9-Price' ?
                            (<HelpIcon>Add the price of 9x9 or 8x8, interior or exterior space</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_9X9_OUT_PRICE}`] && errors[`court ${COURT_9X9_OUT_PRICE}`]?.message}</p>
                      </div>
                      <div>
                        <div className='flex'>
                          <input {...register(`court ${COURT_11X11_OUT_PRICE}`, { required: { value: true, message: 'Add the number of exterior 11x11,  if do not exist, add 0' }, disabled: watch11x11Out == 0 })} placeholder='11x11' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, '11x11-Price')} /></span>
                          {field == '11x11-Price' ?
                            (<HelpIcon>Add the price of 11x11, interior or exterior space</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_11X11_OUT_PRICE}`] && errors[`court ${COURT_11X11_OUT_PRICE}`]?.message}</p>
                      </div>
                    </>
                    : watchSport == 'Basketball' ?
                      <div>
                        <div className='flex'>
                          <input {...register(`court ${COURT_BASKET_OUT_PRICE}`, { required: { value: true, message: 'Add the number of exterior courts, if do not exist, add 0' }, disabled: watchBasketOut == 0 })} placeholder='Basketball court' className='w-[90px]' />
                          <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event) => handleClickIcon(event, 'basketball-Price')} /></span>
                          {field == 'basketball-Price' ?
                            (<HelpIcon>Add the price of enterior or exterior courts</HelpIcon>)
                            : null
                          }
                        </div>
                        <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`court ${COURT_BASKET_OUT_PRICE}`] && errors[`court ${COURT_BASKET_OUT_PRICE}`]?.message}</p>
                      </div>
                      : <></>}
                </div>
              </div>
            </div>
            <div className='text-md mb-3 grid content-center'>
              <div className='grid grid-cols-[180px_180px]'>
                <div className=''>
                  <label className='text-white'>Reserved-By-Hour</label>
                </div>
                <div>
                  <select {...register("reservationByTime", { required: true, onChange: () => { } })
                  } className='min-w-full'>
                    <option value="1:0">1h</option>
                    <option value="1:30">1:30h</option>
                    <option value="2:0">2h</option>
                  </select>
                </div>
              </div>
            </div>
            <Schedule control={control} handleChange={handleChange} handleClickIcon={handleClickIcon} validateTime={validateTime} field={field} indexIcon={indexIcon} errors={errors} />
          </div>

          <div className='grid justify-items-center pb-10 mb-10'>
            <input type='submit' className='text-white text-md bg-slate-900 py-3 px-3 rounded-lg font-medium cursor-pointer' />
          </div>
        </form>
      </div>

      <Footer />
    </BodyLayout>
  )
}

export default UploadStadium;