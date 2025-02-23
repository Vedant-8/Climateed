import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import {
  AlertTriangle,
  Thermometer,
  Globe,
  ChevronUp,
  Timer,
} from "lucide-react";

const ClimateChangeInfo = () => {
  const stats = [
    {
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      title: "Temperature Rise",
      value: "1.2°C (2.2°F)",
      description: "since the late 19th century",
    },
    {
      icon: <Timer className="w-8 h-8 text-orange-500" />,
      title: "Hottest Years",
      value: "2016 & 2020",
      description: "broke all previous records",
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: "Sea Level Rise",
      value: "8-9 inches",
      description: "(21-24 cm) since 1880",
    },
    {
      icon: <ChevronUp className="w-8 h-8 text-purple-500" />,
      title: "CO₂ Levels",
      value: "Highest in 2M Years",
      description: "due to human activity",
    },
  ];

  return (
    <div className="space-y-6 w-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <AlertTriangle className="text-yellow-500" />
          Climate Change Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6 text-left -mt-6">
          Climate change refers to long-term shifts in global temperatures and
          weather patterns. While some changes occur naturally, human
          activities—especially the burning of fossil fuels—have significantly
          accelerated this process in recent decades.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-2">
                {stat.icon}
                <h3 className="font-semibold text-lg">{stat.title}</h3>
              </div>
              <div className="ml-11">
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold">Key Findings:</p>
            <ul className="list-disc ml-5 mt-2 space-y-2">
              <li>
                The Arctic is warming nearly four times faster than the rest of
                the planet
              </li>
              <li>
                97% of climate scientists agree that human activity is driving
                climate change
              </li>
              <li>
                Climate-related disasters have increased by 83% since 1980
              </li>
              <li>The last decade (2010–2020) was the warmest on record</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ClimateChangeInfo;
