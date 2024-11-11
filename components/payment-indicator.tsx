import { Badge } from "@/components/ui/badge";

interface PaymentStatusIndicatorProps {
  status: number;
}

export default function PaymentStatusIndicator({
  status,
}: PaymentStatusIndicatorProps) {
  let statusConfig: { label: string; color: string };

  switch (status) {
    case 0:
      statusConfig = { label: "Plătit", color: "bg-green-500" };
      break;
    case 1:
      statusConfig = { label: "Neplătit", color: "bg-red-500" };
      break;
    case 2:
      statusConfig = { label: "Plătit parțial", color: "bg-yellow-500" };
      break;
    default:
      statusConfig = { label: "Necunoscut", color: "bg-gray-500" };
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
