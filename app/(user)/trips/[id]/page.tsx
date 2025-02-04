'use client'

import TripSidebarCard from "@/components/TripSidebarCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useParams } from "next/navigation";
import { useAxiosClient } from "@/lib/axios-client";
import LoadingSpinner from "@/components/LoadingSpinner";


const Trip = () => {
  const {id: short_id} = useParams()
  const [tripData, setTripsData] = useState()
  const [userData, setUserData] = useState()
  const axiosClient = useAxiosClient();

  
 useEffect(() => {
    const init = async () => {
      try {
        const userRes = await axiosClient.get("/user");   
        if (userRes.status === 200)
          setUserData(userRes.data)

        const response = await axiosClient.get(`/travel/${short_id}`);
        if (response.status === 200) {
          setTripsData(response.data)
        }
        
      } catch (e) {
        console.log(e);
        
      }
    }

    init();
  }, [])


  if (!tripData || !userData) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="h-full flex p-4 gap-3">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex-1 px-4 py-2 max-h-full overflow-auto custom-scrollbar">
            <h1 className="text-2xl font-semibold">Day 1</h1>
            <Card className="mt-3 bg-slate-50 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Recommended Places</CardTitle>
              </CardHeader>
              <CardContent>
              
              <Accordion type="multiple"  className="space-y-2">
                <AccordionItem value="item-1" className="border-none shadow-md bg-white rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div >
                      <h2 className="font-medium text-lg">Nehru Kund</h2>
                      <p className="font-medium ml-1">
                        Activity: Hiking Trail
                      </p>
                      <p className="font-medium ml-1">
                        Duration: 3 Hours
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-1">
                    Add what to do in detail and what to wear and bring here.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-none shadow-md bg-white rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div >
                      <h2 className="font-medium text-lg">Rohtang Pass</h2>
                      <p className="font-medium ml-1">
                        Activity: Scenic Lookout
                      </p>
                      <p className="font-medium ml-1">
                        Duration: 2 Hours
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-1">
                  Add what to do in detail and what to wear and bring here.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              </CardContent>
            </Card>
            <Card className="mt-3 bg-slate-50 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-gray-800">Transportation</CardTitle>
              </CardHeader>
              <CardContent className="font-medium text-[15px]">
                <h2>Mode: Private Vehicle</h2>
                <h3>Cost: $150</h3>
              </CardContent>
            </Card>
            
            <Card className="mt-3 bg-slate-50 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-gray-800">Accomodation</CardTitle>
              </CardHeader>
              <CardContent className="font-medium text-[15px]">
                <h2>Mode: Hotel</h2>
                <h3>Cost: $100</h3>

              </CardContent>
            </Card>
          </div>
          <div className="flex items-center justify-between bg-gray-50 shadow-md rounded-lg border-0">
            <Textarea
              placeholder="Type what to change"
              className="h-12 flex-1 focus-visible:ring-0 bg-gray-50 p-4 border-0 rounded-l-lg resize-none"
            />

            {/* <Button className="h-12 bg-primary-600 text-white rounded-lg">
                <SendHorizonal />
              </Button> */}
          </div>
        </div>
        <TripSidebarCard userData={userData} short_id={short_id || ""} setTripsData={setTripsData} tripData={tripData} />
      </div>
    </>
  );
};

export default Trip;
