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
const NewTrip = () => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
