import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Plus } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="h-full px-6 py-5">

      <div className="flex justify-between items-center w-full my-3">
        <h1 className="text-2xl font-medium text-gray-900">
            Welcome back,
            <span className="text-primary-500"> Roshan</span>
        </h1>
        <div>
        <Button className="bg-primary-600 mx-2">
            <Plus />
            Create New Plan
        </Button>
        <Button>
            <Link />
            Join the Group
        </Button>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-medium text-gray-900 mb-5">Active Plans</h2>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Trip to Manali</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
