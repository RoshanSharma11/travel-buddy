"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

interface PlanCardProps {
  destination: string;
  from: string;
  to: string;
  desc: string;
  members: string[];
  previous?: boolean;
}

const PlanCard = ({
  destination,
  from,
  to,
  desc,
  members,
  previous = false,
}: PlanCardProps) => {
  const copyCode = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
      toast({
        title: "Invite code copied.",
        description: "Share the code to add more members.",
        className: "bg-primary-500 text-white",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <Card
      className={cn("transition ", {
        "bg-gray-50": previous,
      })}
    >
      <CardHeader>
        <CardTitle className="text-xl relative">
          <Link
            href={`/trips/${destination}`}
            className="hover:text-primary-600 transition"
          >
            Trip to {destination}
          </Link>

          {previous || (
            <button
              className="absolute -top-1 right-0 p-2 rounded-full hover:bg-slate-100"
              onClick={(e) => {
                e.stopPropagation();
                copyCode("Hello!!");
              }}
            >
              <LinkIcon />
            </button>
          )}
        </CardTitle>

        <CardDescription>
          Date: {from} - {to}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{desc}</p>
      </CardContent>
      <CardFooter>
        <h2 className="font-medium">Members: </h2>
        <ul className="flex items-center gap-1 ml-1 flex-wrap">
          {members.map((member, index) => (
            <li key={index}>
              <Badge className="bg-primary-600 hover:bg-primary-500">
                {member}
              </Badge>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
