import { Badge } from "@/components/ui/badge";

interface RegisteredIndicatorProps {
  status: boolean;
}

export default function RegisteredIndicator({
  status,
}: RegisteredIndicatorProps) {
  let statusConfig: { label: string; color: string };

  switch (status) {
    case true:
      statusConfig = { label: "Inregistrat", color: "bg-green-500" };
      break;
    case false:
      statusConfig = { label: "Neinregistrat", color: "bg-red-500" };
      break;
  }

  return (
    <Badge
      variant="secondary"
      className={`${statusConfig.color} text-white font-medium px-2 py-0.5 rounded-full text-xs`}
    >
      {statusConfig.label}
    </Badge>
  );
}
