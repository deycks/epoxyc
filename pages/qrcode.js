import React, { useEffect } from "react";
import Router from "next/router";
import axios from 'axios'

export default function About() {


  const enviar = async ()  => {
    await axios.get('https://ipinfo.io/?', {
      "Content-Type": "application/json",
      "Accept":"application/json"
    })
    .then(async function (response) {
      console.log(response.data);
      await axios.post('/api/qrcode', response.data)
       .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(async function (error) {
      await axios.post('/api/qrcode', {city:"-", country:"-", region:"-", loc:"-"})
       .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  useEffect(() => {
    enviar()
    Router.push("/");
  },[]);
  return <div></div>;
}
