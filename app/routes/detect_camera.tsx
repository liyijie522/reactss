//taotao's version
import type { MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

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


export const Detect = () =>  {
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


    return (
        <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
            <div className={'border-4 border-black-600'} onClick={handleClick}>
                Hello World!
            </div>
            <button onClick={handleClick}>test</button>
            <select>
                {
                    Object.entries(loader.cameras)
                        .map(([code, name]) => (

                      <option key={code} value={code}> {name as string} </option>)
                )
                }
            </select>
        </div>
    );
}
export default Detect;
