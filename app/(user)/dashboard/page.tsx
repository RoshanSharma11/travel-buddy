import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PlanCard from "@/components/PlanCard";
import CodeDialog from "@/components/JoinGroupDialog";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="px-6 py-5">
      <div className="flex justify-between items-center w-full my-3">
        <h1 className="text-2xl font-medium text-gray-900">
          Welcome back,
          <span className="text-primary-500"> Roshan</span>
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
        Current Trips
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <PlanCard
          destination="Manali"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe fugiat atque corrupti nemo illo rerum quasi magni. Voluptatem cumque, eos laboriosam quia veniam sunt quasi veritatis recusandae dolorum labore minima."
          from="17 Jan"
          to="24 Jan"
          members={["You", "Person 1", "Person 2", "Person 3"]}
        />
      </div>
      <h2 className="mt-10 text-xl font-medium text-gray-900 mb-5">
        Previous Trips
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <PlanCard
          destination="Manali"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe fugiat atque corrupti nemo illo rerum quasi magni. Voluptatem cumque, eos laboriosam quia veniam sunt quasi veritatis recusandae dolorum labore minima."
          from="17 Jan"
          to="24 Jan"
          members={["You", "Person 1", "Person 2", "Person 3"]}
          previous={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;
