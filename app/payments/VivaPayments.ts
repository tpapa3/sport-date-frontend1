"use server"

import axios from "axios";
import qs from "qs";


interface FormValue{
    name:string;
    surname:string;
    telephone:string;
    email:string;
}

interface VivaPaymentResponse{
    fail?:string;
    redirectUrl?:string;
}

const VivaPayments = async (data:FormValue,price:number)=>{
  
  const paymentResponseEndPoint:VivaPaymentResponse = {};
  if(!data.name && !data.surname && !data.telephone && !data.email){
    paymentResponseEndPoint.fail='Missing fields';
    return paymentResponseEndPoint
  }
  if(!(process.env.VIVA_TOKEN_URL && process.env.VIVA_PAYMENT_ORDER_URL)){
    paymentResponseEndPoint.fail ='There is a problem with the url of viva payments';
    return paymentResponseEndPoint;
  }
  let accessToken='';
  try{
  const tokenResponse = await axios.post(
    process.env.VIVA_TOKEN_URL,
    qs.stringify({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${process.env.VIVA_BASIC_AUTH}`,
      },
    }
  );
  accessToken = tokenResponse.data.access_token;
  }catch{
    paymentResponseEndPoint.fail='you cannot have access to viva payments'
    return paymentResponseEndPoint;
  }
 
  try{
    const paymentResponse = await axios.post(
        process.env.VIVA_PAYMENT_ORDER_URL,
        {
          amount: price*100,
          customerTrns:'your reservation for court/courts cost',
          customer: {
             email: data.email,
             fullName: data.name +' '+data.surname,
             phone: data.telephone,
             countryCode: 'GR',
             requestLang: 'el-GR'
          },
          disableCash:true
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const checkoutUrl = `${process.env.VIVA_CHECKOUT_URL}?ref=${paymentResponse.data.orderCode}`;
      paymentResponseEndPoint.redirectUrl = checkoutUrl;
      return paymentResponseEndPoint;
  }catch{
     paymentResponseEndPoint.fail='the payment order process is failed'
     return paymentResponseEndPoint;
  }
  
}

export default VivaPayments;