import HomeFeatureCard from "@/components/HomeFeatureCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Backpack, BookImage, Bot, Brain, ExternalLink, Map, MapPin, MousePointerClick, Share2, User, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-full bg-white">
      <div className="flex justify-between items-center px-32 h-[85vh]">
        <div className="max-w-[550px] flex flex-col justify-center">
          <h1 className="text-[4.5rem] leading-tight font-semibold text-black mb-3">
            {/* Plan your next group trip like experts */}
            Group Travel Made Fun and Effortless
          </h1>
          <p className="text-xl font-medium text-gray-600 mb-7">
            {/* Planning a group trip becomes hassle instead of fun? Use TravelBuddy
            to make sure the trip go smootly */}
            Say goodbye to the chaos of planning group trips. With TravelBuddy, create seamless itineraries, collaborate in real-time, and make every journey unforgettable.
          </p>
          <div>
            <Link href="/sign-up">
              <Button className="h-10 text-[15px] rounded-md  bg-primary-600 text-white transition-all">
                Get Started
                <ExternalLink />
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <Image src="/bg-final.png" alt="Bg" width={550} height={550} />
        </div>
      </div>

      <h1 className="text-center text-[3.3rem] font-semibold">Features<span className="text-primary-600">.</span></h1>
      <div className="grid grid-cols-3 gap-3 center px-32 py-10 mb-10">
        <HomeFeatureCard 
          title="Realtime Collabration"
          desc="Plan group trips effortlessly with live input from all members, ensuring everyone’s preferences are considered."
          Icon={User}
        />
        <HomeFeatureCard 
          title="AI-Powered Recommendations"
          desc="Leverage advanced AI to suggest activities and itineraries that fit your group’s unique style."
          Icon={Bot}
        />
        <HomeFeatureCard 
          title="Effortless Sharing"
          desc="Share your travel plans with ease and invite others to collaborate in just a few clicks."
          Icon={Users}
        />
        <HomeFeatureCard 
          title="Smart Packing Suggestions"
          desc="Get personalized recommendations on what to wear and bring for each destination based on weather, activities, and local conditions."
          Icon={Backpack}
        />
        <HomeFeatureCard 
          title="Shared Group Album"
          desc="Collect and organize group photos in one shared album, creating a lasting memory of your journey together."
          Icon={BookImage}
        />
      </div>

      {/* <h1 className="text-center text-[3.3rem] font-semibold">How to plan<span className="text-primary-600">?</span></h1> */}
      <h1 className="text-center text-[2rem] font-semibold">Plan Your Trip in 4 Easy Steps</h1>
      <div className="grid grid-cols-3 gap-3 center px-32 py-10">
        <HomeFeatureCard 
          title="Start Your Journey with a Click"
          desc="Sign up or log in to TravelBuddy to unlock the ultimate group travel planning experience."
          hideIcon={true}
          showHeader={true}
          src="/register.png"
        />
        <HomeFeatureCard 
          title="Set the Destination and Vision"
          desc="Name your trip, set the destination, and define the group's preferences like budget, activities, and more."
          hideIcon={true}
          showHeader={true}
          src="/plan-itinerary.png"
        />
          <HomeFeatureCard 
            title="Bring Everyone Onboard"
            desc=" Share your trip link with friends or family and collaborate in real-time for a truly personalized itinerary."
            hideIcon={true}
            showHeader={true}
            src="/join-group.png"
          />
        <HomeFeatureCard 
          title="Let TravelBuddy Do the Magic"
          desc="Get a detailed, budget-friendly itinerary tailored to your group’s preferences, complete with activities and recommendations."
          hideIcon={true}
          showHeader={true}
          src="/itinerary-page.png"
        />
      </div>

      <div className="px-32 py-10">
        <span className="text-gray-600 border-t-2 flex justify-start pt-4 px-3">© 2024 | TravelBuddy</span>
      </div>
    </div>
  );
};

export default page;
