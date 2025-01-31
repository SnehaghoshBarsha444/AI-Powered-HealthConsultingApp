import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface DoctorCardProps {
  name: string;
  specialty: string;
  experience: string;
  status: string;
  imageUrl: string;
}

export const DoctorCard = ({ name, specialty, experience,status, imageUrl }: DoctorCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <img src={imageUrl} alt={name} className="object-cover" />
        </Avatar>
        <div>
          <h3 className="font-display text-lg font-semibold text-secondary">{name}</h3>
          <p className="text-sm text-gray-600">{specialty}</p>
          <p className="text-sm text-gray-600">Status: {status}</p>
          <p className="text-xs text-gray-500">{experience} years experience</p>
        </div>
      </div>
    </Card>
  );
};
