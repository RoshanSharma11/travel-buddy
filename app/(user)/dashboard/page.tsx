'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PlanCard from "@/components/PlanCard";
import CodeDialog from "@/components/JoinGroupDialog";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAxiosClient } from "@/lib/axios-client";


interface TripDataType {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  total_budget: number;
  activities: any[];
  itinerary: any[];
  created_by: string;
  members: any[];
  created_at: string;
  short_id: string;
}


const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const axiosClient = useAxiosClient();
  const [tripsData, setTripsData] = useState<TripDataType[] | null>(null)
  const [userData, setUserData] = useState<any>()
  const currentDate = new Date(Date.now())
  
  useEffect(() => {
    const init = async () => {
      try {
        const a = await axiosClient.get("/user");   
        if (a.status === 200)
          setUserData(a.data)
        
        const response = await axiosClient.get("/travel");
        if (response.status === 200) {
          setTripsData(response.data)
        } else {
          setTripsData([])
        }
        
      } catch (e) {
        console.log(e);
        // setTripsData([])
      } finally {
        setIsLoaded(true)
      }
    }

    init();
  }, [])
 
  if (!isLoaded) {
    return <LoadingSpinner />
  }

  if (isLoaded && (!tripsData || !userData)) {
    return <div>Something went wrong</div>
  }
  
  return (
    <div className="px-6 py-5">
      <div className="flex justify-between items-center w-full my-3">
        <h1 className="text-2xl font-medium text-gray-900">
          Welcome back,
          <span className="text-primary-500"> {userData.name}</span>
        </h1>
        <div>
          <Link href="/new-trip">
            <Button className="bg-primary-600 hover:bg-primary-500 mx-2">
              <Plus />
              Plan New Trip
            </Button>
          </Link>
          <CodeDialog />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-medium text-gray-900 mb-5">
        Your Trips
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {
          tripsData!.map((trip:any, ind) => {
            return <PlanCard
            key={ind}
            destination={trip.destination}
            desc="Manali is a high-altitude Himalayan resort town in India’s northern Himachal Pradesh state. It has a reputation as a backpacking center and honeymoon destination. Set on the Beas River, it’s a gateway for skiing in the Solang Valley and trekking in Parvati Valley"
            from={trip.start_date}
            to={trip.end_date}
            members={[trip.created_by, ...trip.members]}
            short_id={trip.short_id}
            previous={currentDate > new Date(trip.end_date)}
          />
          })
          
        }
      </div>

      {/* <h2 className="mt-10 text-xl font-medium text-gray-900 mb-5">
        Previous Trips
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <PlanCard
          destination="Shilong"
          desc="Shillong is a hill station in northeast India and capital of the state of Meghalaya. It’s known for the manicured gardens at Lady Hydari Park. Nearby, Ward’s Lake is surrounded by walking trails. North, the Don Bosco Centre for Indigenous Cultures features displays on the region’s native people."
          from="17 Mar, 2023"
          to="24 Mar, 2023"
          members={["You", "Person 1", "Person 2", "Person 3"]}
          previous={true}
        />
      </div> */}
    </div>
  );
};

export default Dashboard;
