import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";

const HomeFeatureCard = ({
  title,
  desc,
  Icon,
  src,
  showHeader = false,
  hideIcon = false,
}: {
  title: string;
  desc: string;
  Icon?: any;
  showHeader?: boolean;
  src?: string;
  hideIcon?: boolean;
}) => {
  return (
    <Card>
      {showHeader && (
        <CardHeader className="p-6 pb-3">
          <div className="relative h-[170px] rounded-lg">
            <Image
              src={src || "/placeholder.png"}
              alt="itinerary page"
              layout="fill"
              className="rounded-lg"
            />
          </div>
        </CardHeader>
      )}

      <CardContent className="py-6">
        <h2 className="flex items-center gap-2 font-medium text-xl mb-3">
          {
            !hideIcon && <Icon />
          }
          {title}
        </h2>
        <p className="text-gray-600 text-[15px]">{desc}</p>
      </CardContent>
    </Card>
  );
};

export default HomeFeatureCard;
