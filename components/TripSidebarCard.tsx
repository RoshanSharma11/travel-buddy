import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Ban,
  ChevronRight,
  CircleSlash,
  Edit,
  LinkIcon,
  LogOut,
  MapPin,
  X,
} from "lucide-react";
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
import { useAxiosClient } from "@/lib/axios-client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const TripSidebarCard = ({
  short_id,
  tripData,
  setTripsData,
  userData,
}: {
  short_id: string | string[];
  tripData: any;
  setTripsData: Dispatch<SetStateAction<undefined>>;
  userData: any;
}) => {
  const axiosClient = useAxiosClient();
  const [cancelBtnDiabled, setCancelBtnDiabled] = useState(false);
  const [leaveBtnDiabled, setLeaveBtnDiabled] = useState(false);
  const [image, setImage] = useState("/manali.png");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const resp = await fetch(
          `https://pixabay.com/api/?key=${
            process.env.NEXT_PUBLIC_PIXABAY_API_KEY
          }&q=${tripData.destination
            .split(",")
            .at(0)}&image_type=photo&per_page=3`
        );
        const data = await resp.json();
        // console.log(data);

        setImage(data.hits[0].largeImageURL);
        // setImage(data.hits[0].previewURL)
      } catch (err) {
        console.log(err);
      }
    };
    fetchImage();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const body = {
        destination: values.destination,
        activities: values.activities,
        total_budget: parseInt(values.budget),
        start_date: values.dateRange.from.toISOString().split("T")[0],
        end_date: values.dateRange.to.toISOString().split("T")[0],
      };

      const response = await axiosClient.patch(`/travel/${short_id}`, body);
      if (response.status === 200) {
        toast({
          title: "Successfully updated your plan",
        });
        setTripsData(response.data);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  const handleCancelTrip = async () => {
    try {
      setCancelBtnDiabled(true);
      const response = await axiosClient.delete(`/travel/${short_id}`);
      if (response.status === 200) {
        toast({
          title: "Successfully cancelled your trip",
        });
        setCancelBtnDiabled(false);
        window.location.replace("/dashboard");
      }
    } catch (e: any) {
      console.log(e.message);
      setCancelBtnDiabled(false);
      toast({
        title: e.message,
        variant: "destructive",
      });
    }
  };

  const handleLeaveGroup = async () => {
    try {
      setLeaveBtnDiabled(true);
      const response = await axiosClient.post(`/travel/${short_id}/leave`);
      if (response.status === 200) {
        toast({
          title: "Successfully left the group",
        });
        setLeaveBtnDiabled(false);
        window.location.replace("/dashboard");
      }
    } catch (e: any) {
      console.log(e.message);
      setLeaveBtnDiabled(false);
      toast({
        title: e.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="w-[380px] overflow-auto custom-scrollbar">
        <CardHeader className="p-0">
          <div className="relative w-full h-[230px]">
            <Image
              // src="/manali.jpg"
              src={image}
              alt="manali image"
              layout="fill"
              className="rounded-t-lg"
            />
            <div className="absolute bottom-3 left-6">
              <h1 className="text-white text-2xl font-semibold">
                {tripData.destination.split(",").at(0)}
              </h1>
              <p className="text-white text-md font-medium flex items-center gap-1">
                <MapPin size={18} />
                {tripData.destination.split(",").at(-1).trim()}, India
              </p>
            </div>
            <button
              className="absolute top-2 right-1 p-2 text-white rounded-full hover:bg-primary-600 transition"
              onClick={(e) => {
                e.stopPropagation();
                copyCode(tripData.short_id);
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
                  <ul className="space-y-3">
                    <li className="flex items-center font-medium bg-white px-3 py-4 text-md rounded-lg">
                      {tripData.created_by.name}
                    </li>
                    {tripData.members.map((member: any, index: number) => (
                      <li
                        key={index}
                        className="flex items-center font-medium bg-white px-3 py-4 text-md rounded-lg"
                      >
                        {member.name}
                      </li>
                    ))}
                  </ul>
                  {/* <Accordion type="single" collapsible className="space-y-2">
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
                  </Accordion> */}
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
                      <span className="font-medium">Budget: </span> $
                      {tripData.total_budget}
                    </li>
                    <li className="bg-white px-3 py-4 text-md rounded-lg">
                      <span className="font-medium">Available: </span>{" "}
                      {tripData.start_date} to {tripData.end_date}
                    </li>
                    <li className="bg-white px-3 py-4 text-md rounded-lg">
                      <span className="font-medium">Activities: </span>
                      <div className="flex flex-wrap items-center gap-1">
                        {tripData.activities.map(
                          (activity: string, ind: number) => (
                            <Badge className="bg-primary-600" key={ind}>
                              {activity}
                            </Badge>
                          )
                        )}
                      </div>
                    </li>
                    <Dialog>
                      <DialogTrigger className="w-full">
                        <Button className=" w-full h-12 ">
                          <Edit />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Udpate your preferences</DialogTitle>
                        </DialogHeader>
                        <TripUpdateCard
                          destination={tripData.destination}
                          budget={`${tripData.total_budget}`}
                          from={new Date(tripData.start_date)}
                          to={new Date(tripData.end_date)}
                          activities={tripData.activities}
                          buttonText="Update"
                          onSubmit={onSubmit}
                        />
                      </DialogContent>
                    </Dialog>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="bg-slate-50 mt-2 rounded-lg px-3 py-2 flex items-center justify-between gap-3">
            {userData.id === tripData.created_by.id && (
              <Button
                disabled={cancelBtnDiabled}
                onClick={handleCancelTrip}
                className={cn(
                  "flex-1 h-11 bg-primary-600 hover:bg-primary-500",
                  {
                    "opacity-50 cursor-not-allowed": cancelBtnDiabled,
                  }
                )}
              >
                <Ban />
                Cancel Trip
              </Button>
            )}
            {userData.id !== tripData.created_by.id && (
              <Button
                disabled={leaveBtnDiabled}
                onClick={handleLeaveGroup}
                className={cn("flex-1 h-11 ", {
                  "opacity-50 cursor-not-allowed": leaveBtnDiabled,
                })}
              >
                <LogOut />
                Leave Group
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TripSidebarCard;
