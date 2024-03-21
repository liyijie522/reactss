import React from 'react';
import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import stylesUrl from "~/styles/analytics.css";
import type { LinksFunction } from "@remix-run/node";
import { FC } from 'react';

import { Button } from 'flowbite-react';
import { Datepicker } from 'flowbite-react';
import DatepickerService from "../class/API_Calendar";
import 'flowbite/dist/flowbite.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import image1 from '@app/assets/image/image1.jpg'
import image2 from '@app/assets/image/image2.jpg'
import image3 from '@app/assets/image/image3.jpg'
import image4 from '@app/assets/image/image4.jpg'
import image5 from '@app/assets/image/image5.jpg'

import {NavigationBar} from '~/components/header';
import { Component } from 'lucide-react';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl},
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" },
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" }
];

export const meta: MetaFunction = () => {
  return [
      { title: "New Remix App" },
      { name: "description", content: "Welcome to Remix!" },
  ];
};


export const action = async () => {
  /*
    THIS FUNCTION RUNS ON THE SERVER AS AN API ENDPOINT FOR THIS ROUTE
    REFERENCE https://remix.run/docs/en/main/route/action
  */

  return {
      message: "Hello World PAYLOad"
  }
}

export const loader = async () => {
    /*
    THIS FUNCTION RUNS ON THE SERVER THE CLIENT WONT SEE THIS. HENCE API CALLS GO HERE SECURITY REASONS
    REFERENCE: https://remix.run/docs/en/main/route/loader
    */
    const response = await fetch('http://192.168.12.37:8000/api/camera/');
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;

}

function App() {
  const loader:any = useLoaderData()
  const fetcher = useFetcher()
  const handleClick = () => {
      /*THIS IS HOW TO USE THE FETCHER, MIGHT NEED AN UPDATE
        REFERENCE: https://remix.run/docs/en/main/hooks/use-fetcher
      */
      console.log(loader.cameras)

  }

  useEffect(()=>{
    if(fetcher.state === "idle"){
        console.log(fetcher.data)
        //THIS IS WHEN THE DATA IS RETURNED FROM THE SERVER SET IT TO A STATE TO BE USED
    }
}, [fetcher.state])

let availableDates: Date[] = [];

async function setupDateService() {
  const dateService = new DatepickerService();
  await dateService.fetchDatesAndImages(); // Ensure data is fetched
  console.log(dateService.availableDates_str); // Access available dates
  console.log(dateService.imageIds); // Access image IDs

  availableDates = dateService.getAvailableDatesAsDateObjects();
  console.log(availableDates);

}



  //calendar
  const [date, setDate] = useState<Date>(new Date());
  const handleDateChange = (newDate: Date) => {
    // setDate(newDate);
    /*
      change the data type here to ensure that it aligns with the API
    */
    setupDateService();
    // newDate = availableDates;

   
    console.log(newDate);
  };

  // Click and save Image here
  const handleClick_export = () => {
    console.log('Button was clicked');
    // Implement this later
    /*
      Implement this later
      Change this to download the chart in CSV format
    */
  };

  return (
    <div className="App">
    {/* Header */}
    <NavigationBar />
    <div className="dropdown-container">
      <div className="background-dummy-container">
        <div className="dummy-container">
            <div className="camera-dropdown">
            <select>
                {
                    Object.entries(loader.cameras)
                        .map(([code, name]) => (

                      <option key={code} value={code}> {name as string} </option>)
                )
                }
            </select>
              </div>
              <div className="calendar"> 
              <Datepicker onSelectedDateChanged={handleDateChange} /> 
              </div>
          </div>
        </div>
      </div>
      <div className="dropimage">
        <img src={image1} alt="Camera 1" />
      </div>
      <div className="export-button">
        <Button onClick={handleClick_export} color='dark'>Download Spreadsheet</Button> 
      </div>
    </div>
  );
}


export default App;