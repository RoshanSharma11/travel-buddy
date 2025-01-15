import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ChevronRight, Edit, LinkIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import TripUpdateCard, { formSchema } from "./TripUpdateCard";
import { copyCode } from "./PlanCard";

// const formSchema = z.object({
//   destination: z.string().min(2, {
//     message: "Destination must be at least 2 characters.",
//   }),
//   activities: z.array(z.string()).optional(),
//   budget: z.string().min(3, {
//     message: "Budget must be at least be $100.",
//   }),
//   dateRange: z.object({ from: z.date(), to: z.date() }).optional(),
// });

const TripSidebarCard = () => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Card className="w-[380px] overflow-auto custom-scrollbar">
        <CardHeader className="p-0">
          <div className="relative w-full h-[230px]">
            <Image
              src="/manali.jpg"
              alt="manali image"
              layout="fill"
              className="rounded-t-lg"
            />
            <div className="absolute bottom-3 left-6">
              <h1 className="text-white text-2xl font-semibold">Manali</h1>
              <p className="text-white text-md font-medium flex items-center gap-1">
                <MapPin size={18} />
                Kullu, India
              </p>
            </div>
            <button
              className="absolute top-2 right-1 p-2 text-white rounded-full hover:bg-primary-600 transition"
              onClick={(e) => {
                e.stopPropagation();
                copyCode("Hello!!");
              }}
            >
              <LinkIcon />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl mt-2 text-gray-700">Overview</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            voluptate sapiente excepturi nihil accusamus aut nisi ipsa ratione
            eveniet harum?...
            <br />
            <Button
              variant="outline"
              className="my-2 text-gray-700 rounded-full"
            >
              Read More
            </Button>
          </CardDescription>

          <div className="bg-slate-50 my-1 rounded-lg px-3 py-1">
            <Accordion type="single" collapsible defaultValue="itinerary">
              <AccordionItem value="itinerary" className="px-2 border-0">
                <AccordionTrigger className="text-[16px] font-semibold text-gray-700">
                  Itinerary
                </AccordionTrigger>

                <AccordionContent>
                  <ul className="space-y-2">
                    <li>
                      <Button className="flex justify-between w-full h-14 font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-600 hover:text-white transition">
                        Day 1
                        <ChevronRight />
                      </Button>
                    </li>
                    <li>
                      <Button className="flex justify-between w-full h-14 font-semibold rounded-lg bg-white text-gray-600 hover:bg-primary-600 hover:text-white transition">
                        Day 2
                        <ChevronRight />
                      </Button>
                    </li>
                    <li>
                      <Button className="flex justify-between w-full h-14 font-semibold rounded-lg bg-white text-gray-600 hover:bg-primary-600 hover:text-white transition">
                        Day 3
                        <ChevronRight />
                      </Button>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="bg-slate-50 mt-2 rounded-lg px-3 py-1">
            <Accordion type="single" collapsible>
              <AccordionItem value="members" className="px-2 border-0">
                <AccordionTrigger className="text-[16px] font-semibold text-gray-700">
                  Members
                </AccordionTrigger>

                <AccordionContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    <AccordionItem
                      value="item-1"
                      className="px-3 py-1 bg-white border-0 rounded-lg"
                    >
                      <AccordionTrigger>User 1</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-0">
                          <li className=" px-3 py-2 text-md rounded-lg">
                            <span className="font-medium">Budget: </span> $2500
                          </li>
                          <li className=" px-3 py-2 text-md rounded-lg">
                            <span className="font-medium">Available: </span> 18
                            Jan - 25 Feb
                          </li>
                          <li className=" px-3 py-2 text-md rounded-lg">
                            <span className="font-medium">Activities: </span>
                            <div className="flex flex-wrap items-center gap-1">
                              <Badge>Skiing</Badge>
                              <Badge>Hiking</Badge>
                              <Badge>Trekking</Badge>
                              <Badge>Street Food Exploration</Badge>
                            </div>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                      value="item-2"
                      className="px-3 py-1 bg-white border-0 rounded-lg"
                    >
                      <AccordionTrigger>User 2</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-0">
                          <li className=" px-3 py-2 text-md rounded-lg">
                            <span className="font-medium">Budget: </span> $2500
                          </li>
                          <li className=" px-3 py-2 text-md rounded-lg">
                            <span className="font-medium">Available: </span> 18
                            Jan - 25 Feb
                          </li>
                          <li className=" px-3 py-2 text-md rounded-lg">
                            <span className="font-medium">Activities: </span>
                            <div className="flex flex-wrap items-center gap-1">
                              <Badge>Skiing</Badge>
                              <Badge>Hiking</Badge>
                              <Badge>Trekking</Badge>
                              <Badge>Street Food Exploration</Badge>
                            </div>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="bg-slate-50 mt-2 rounded-lg px-3 py-1">
            <Accordion type="single" collapsible>
              <AccordionItem value="members" className="px-2 border-0">
                <AccordionTrigger className="text-[16px] font-semibold text-gray-700">
                  Your Preferences
                </AccordionTrigger>

                <AccordionContent>
                  <ul className="space-y-3">
                    <li className="flex items-center bg-white px-3 py-4 text-md rounded-lg">
                      <span className="font-medium">Budget: </span> $2500
                    </li>
                    <li className="bg-white px-3 py-4 text-md rounded-lg">
                      <span className="font-medium">Available: </span> 18 Jan -
                      25 Feb
                    </li>
                    <li className="bg-white px-3 py-4 text-md rounded-lg">
                      <span className="font-medium">Activities: </span>
                      <div className="flex flex-wrap items-center gap-1">
                        <Badge>Skiing</Badge>
                        <Badge>Hiking</Badge>
                        <Badge>Trekking</Badge>
                        <Badge>Street Food Exploration</Badge>
                      </div>
                    </li>
                    <Dialog>
                      <DialogTrigger className="w-full">
                        <Button className="bg-primary-600 w-full h-12 hover:bg-primary-500">
                          Edit
                          <Edit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Udpate your preferences</DialogTitle>
                        </DialogHeader>
                        <TripUpdateCard
                          destination="Manali"
                          budget={'2500'}
                          from={new Date("18 Jan 2025")}
                          to={new Date("25 Feb 2025")}
                          activities={['Skiing','Hiking','Trekking','Street Food Exploration']}
                          buttonText="Update"
                          name="XYZ"
                          onSubmit={onSubmit}
                          />
                      </DialogContent>
                    </Dialog>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TripSidebarCard;
