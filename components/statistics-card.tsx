import React, { ReactNode } from "react";
import { Card } from "./ui/card";

interface IStatisticsCard {
  icon: ReactNode;
  title: string;
  value: string | number;
}

export default function StatisticsCard({
  icon,
  title,
  value,
}: IStatisticsCard) {
  return (
    <Card className="w-full md:w-2/6 lg:w-1/6 h-[250px] p-10 flex items-center justify-center flex-col gap-2 text-center">
      {icon}
      <h5 className="font-light">{title}</h5>
      <p className="text-5xl font-bold">{value}</p>
    </Card>
  );
}
