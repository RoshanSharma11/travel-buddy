"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MultiSelect } from "@/components/MultiSelectInput";
import destinationsData from "@/constants/destination.json";
import activitiesData from "@/constants/activties.json";

export const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  activities: z.array(z.string()).optional(),
  budget: z.string().min(3, {
    message: "Budget must be at least be $100.",
  }),
  dateRange: z.object({ from: z.date(), to: z.date() }),
  name:z.string().min(3, {message: "Name must be at least 3 characters"})
});

interface TripUpdateCardProps {
  name?:string;
  destination?: string;
  activities?: string[];
  budget?: string;
  from?: Date;
  to?: Date;
  buttonText?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const TripUpdateCard = ({
  destination,
  activities,
  budget,
  from,
  to,
  buttonText = "Save",
  name,
  onSubmit,
}: TripUpdateCardProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: destination || "",
      budget: budget || '100',
      activities: activities || [],
      name: name || ""
    },
  });
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from:
      from || new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    to:
      to ||
      addDays(
        new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        5
      ),
  });
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    activities || []
  );

  const handleDataChange = (data:any) => {
    setDate(data);
    form.setValue('dateRange',data)
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Trip Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your trip name..."
                    type="text"
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Destination</FormLabel>
                <FormControl>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="h-11">
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? destinationsData.find(
                                  (destination) => destination === field.value
                                )
                              : "Select Destination"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Destination..."
                            className="h-11"
                          />
                          <CommandList>
                            <CommandEmpty>No Destination found.</CommandEmpty>
                            <CommandGroup>
                              {destinationsData.map((destination, ind) => (
                                <CommandItem
                                  value={destination}
                                  key={ind}
                                  onSelect={() => {
                                    form.setValue("destination", destination);
                                  }}
                                >
                                  {destination}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      destination === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Budget</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your budget..."
                    type="number"
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateRange"
            render={() => (
              <FormItem>
                <FormLabel className="text-md">Date</FormLabel>
                <FormControl>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full h-11 justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[--radix-popover-trigger-width] p-0"
                        align="start"
                      >
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={handleDataChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activities"
            render={() => (
              <FormItem>
                <FormLabel className="text-md">Activities</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={activitiesData}
                    onValueChange={(selectedValues) => {
                      setSelectedActivities(selectedValues);
                      form.setValue("activities", selectedValues);
                    }}
                    defaultValue={selectedActivities}
                    placeholder="Select activities"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                    className="h-11"
                    asChild={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-600 hover:bg-primary-500">
            {buttonText}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default TripUpdateCard;
