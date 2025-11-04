import { FormValue } from '../upload-stadium/page'
import { category } from '../constants/constants';
import { UseMutateFunction } from '@tanstack/react-query';


interface Court {
  name: string;
  category: string;
  price: number;
  interior: boolean;
}

function addCourts(
  count: number,
  category: string,
  price: number,
  interior: boolean,
  courts: Court[]
) {
  if (count == 0) return;
  const currentCount = courts.filter(c => c.category === category).length;
  for (let i = 1; i <= count; i++) {
    courts.push({
      name: `court ${currentCount +i}` ,
      category,
      price,
      interior,
    });
  }
}


const { COURT_5X5_IN_CAT, COURT_7X7_IN_CAT, COURT_9X9_IN_CAT, COURT_11X11_IN_CAT, COURT_BASKET_IN_CAT,
  COURT_5X5_OUT_CAT, COURT_7X7_OUT_CAT, COURT_9X9_OUT_CAT, COURT_11X11_OUT_CAT, COURT_BASKET_OUT_CAT,
  COURT_5X5_IN_PRICE, COURT_7X7_IN_PRICE, COURT_9X9_IN_PRICE, COURT_11X11_IN_PRICE, COURT_BASKET_IN_PRICE,
  COURT_5X5_OUT_PRICE, COURT_7X7_OUT_PRICE, COURT_9X9_OUT_PRICE, COURT_11X11_OUT_PRICE, COURT_BASKET_OUT_PRICE } = category


export async function uploadStadium(data: FormValue,mutate:UseMutateFunction<unknown, Error, Record<string, unknown>, unknown>) {
  const body: Record<string, unknown> = {}
  body.name = data.stadium;
  body.town = data.town;
  body.region = data.region;
  body.address = data.address;
  body.latitude = data.latitude;
  body.longitude = data.longitude;
  body.reservationByTime = data.reservationByTime;

  body.mondayStart = data['startTime 0']?.hour + ':' + data['startTime 0']?.minute
  body.mondayEnd = data['endTime 0']?.hour + ':' + data['endTime 0']?.minute

  body.tuesdayStart = data['startTime 1']?.hour + ':' + data['startTime 1']?.minute
  body.tuesdayEnd = data['endTime 1']?.hour + ':' + data['endTime 1']?.minute

  body.wednesdayStart = data['startTime 2']?.hour + ':' + data['startTime 2']?.minute
  body.wednesdayEnd = data['endTime 2']?.hour + ':' + data['endTime 2']?.minute

  body.thursdayStart = data['startTime 3']?.hour + ':' + data['startTime 3']?.minute
  body.thursdayEnd = data['endTime 3']?.hour + ':' + data['endTime 3']?.minute

  body.fridayStart = data['startTime 4']?.hour + ':' + data['startTime 4']?.minute
  body.fridayEnd = data['endTime 4']?.hour + ':' + data['endTime 4']?.minute

  body.saturdayStart = data['startTime 5']?.hour + ':' + data['startTime 5']?.minute
  body.saturdayEnd = data['endTime 5']?.hour + ':' + data['endTime 5']?.minute

  body.sundayStart = data['startTime 6']?.hour + ':' + data['startTime 6']?.minute
  body.sundayEnd = data['endTime 6']?.hour + ':' + data['endTime 6']?.minute
  body.sport = data.sport;
  body.courts = []
  if (data.sport == 'Football') {
     addCourts(
      data[`court ${COURT_5X5_IN_CAT}`],
      "5x5",
      data[`court ${COURT_5X5_IN_PRICE}`],
      true,
      body.courts as Court[]
    );

    // 5x5 OUT
     addCourts(
      data[`court ${COURT_5X5_OUT_CAT}`],
      "5x5",
      data[`court ${COURT_5X5_OUT_PRICE}`],
      false,
      body.courts as Court[]
    );

    // 7x7 IN
     addCourts(
      data[`court ${COURT_7X7_IN_CAT}`],
      "7x7",
      data[`court ${COURT_7X7_IN_PRICE}`],
      true,
      body.courts as Court[]
    );

    // 7x7 OUT
     addCourts(
      data[`court ${COURT_7X7_OUT_CAT}`],
      "7x7",
      data[`court ${COURT_7X7_OUT_PRICE}`],
      false,
      body.courts as Court[]
    );

    // 9x9 IN
     addCourts(
      data[`court ${COURT_9X9_IN_CAT}`],
      "9x9",
      data[`court ${COURT_9X9_IN_PRICE}`],
      true,
      body.courts as Court[]
    );

    // 9x9 OUT
     addCourts(
      data[`court ${COURT_9X9_OUT_CAT}`],
      "9x9",
      data[`court ${COURT_9X9_OUT_PRICE}`],
      false,
      body.courts as Court[]
    );

    // 11x11 IN
     addCourts(
      data[`court ${COURT_11X11_IN_CAT}`],
      "11x11",
      data[`court ${COURT_11X11_IN_PRICE}`],
      true,
      body.courts as Court[]
    );

    // 11x11 OUT
     addCourts(
      data[`court ${COURT_11X11_OUT_CAT}`],
      "11x11",
      data[`court ${COURT_11X11_OUT_PRICE}`],
      false,
      body.courts as Court[]
    );
  } else {
      // BASKET IN
    addCourts(
      data[`court ${COURT_BASKET_IN_CAT}`],
      "Basketball",
      data[`court ${COURT_BASKET_IN_PRICE}`],
      true,
      body.courts as Court[]
    );

    // BASKET OUT
     addCourts(
      data[`court ${COURT_BASKET_OUT_CAT}`],
      "Basketball",
      data[`court ${COURT_BASKET_OUT_PRICE}`],
      false,
      body.courts as Court[]
    );
  }
  mutate(body);
}