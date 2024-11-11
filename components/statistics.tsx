import {
  Album,
  AlertCircle,
  Check,
  Home,
  Paperclip,
  User,
  X,
} from "lucide-react";
import StatisticsCard from "./statistics-card";

export default function Statistics() {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap w-full">
      <StatisticsCard
        title="Persoane și firme"
        value={100}
        icon={<User size={50} />}
      />

      <StatisticsCard
        title="Total impozite plătite (an)"
        value={100}
        icon={<Check size={50} />}
      />

      <StatisticsCard
        title="Total subvenții acordate (an)"
        value={100}
        icon={<Album size={50} />}
      />

      <StatisticsCard
        title="Restanțe la impozite"
        value={100}
        icon={<AlertCircle size={50} />}
      />
    </div>
  );
}
