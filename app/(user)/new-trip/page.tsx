'use client'

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import TripUpdateCard, { formSchema } from "@/components/TripUpdateCard";
import { useAxiosClient } from "@/lib/axios-client";
import { toast } from "@/hooks/use-toast";
const NewTrip = () => {
  const axiosClient = useAxiosClient()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const body = {
        destination: values.destination,
        activities: values.activities,
        total_budget:parseInt(values.budget),
        start_date: values.dateRange.from.toISOString().split('T')[0],
        end_date: values.dateRange.to.toISOString().split('T')[0]
      }
      console.log(body);
      
      const response = await axiosClient.post("/travel/create", body);
      console.log(response);
      if (response.status === 201) {
        toast({
          title: "Successfully created new plan"
        })
      }
      
    } catch (e:any) {
      console.log(e.message);
      
    }
  }

  return (
    <>
      <Card className="max-w-[600px] mx-auto my-10">
        <CardHeader>
          <CardTitle className="text-center text-2xl ">Plan your trip</CardTitle>
        </CardHeader>
        <CardContent>
          <TripUpdateCard onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </>
  );
};

export default NewTrip;
