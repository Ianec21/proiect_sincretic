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
import { createClient } from "@/utils/supabase/server";

export default async function Statistics() {
  const supabase = await createClient();

  const { data: entities } = await supabase
    .from("entitati")
    .select("*", { count: "exact" });

  const { data: impozite } = await supabase
    .from("impozite")
    .select("*")
    .eq("status", "0");

  const { data: impoziteNotPayed } = await supabase
    .from("impozite")
    .select("*")
    .eq("status", "1");

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap w-full h-[50vh]">
      <StatisticsCard
        title="Persoane și firme"
        value={entities?.length || 0}
        icon={<User size={50} />}
      />

      <StatisticsCard
        title="Total impozite plătite (an)"
        value={impozite?.length || 0}
        icon={<Check size={50} />}
      />

      <StatisticsCard
        title="Total subvenții acordate (an)"
        value={impoziteNotPayed?.length || 0}
        icon={<Album size={50} />}
      />

      <StatisticsCard
        title="Restanțe la impozite"
        value={impoziteNotPayed?.length || 0}
        icon={<AlertCircle size={50} />}
      />
    </div>
  );
}
