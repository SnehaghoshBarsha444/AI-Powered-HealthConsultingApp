// import { Card } from "@/components/ui/card";
// import { Avatar } from "@/components/ui/avatar";

// interface DoctorCardProps {
//   name: string;
//   specialty: string;
//   experience: string;
//   status: string;
//   imageUrl: string;
// }

// export const DoctorCard = ({ name, specialty, experience,status, imageUrl }: DoctorCardProps) => {
//   return (
//     <Card className="p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
//       <div className="flex items-center space-x-4">
//         <Avatar className="h-16 w-16">
//           <img src={imageUrl} alt={name} className="object-cover" />
//         </Avatar>
//         <div>
//           <h3 className="font-display text-lg font-semibold text-secondary">{name}</h3>
//           <p className="text-sm text-gray-600">{specialty}</p>
//           <p className="text-sm text-gray-600">Status: {status}</p>
//           <p className="text-xs text-gray-500">{experience} years experience</p>
//         </div>
//       </div>
//     </Card>
//   );
// };

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useHistory } from "react-router-dom";

interface DoctorCardProps {
  name: string;
  specialty: string;
  experience: string;
  imageUrl: string;
}

export const DoctorCard = ({ name, specialty, experience, imageUrl }: DoctorCardProps) => {
  const history = useHistory();

  const handleCardClick = () => {
    if (specialty === "PCOS Specialist") {
      history.push("/pcos-specialist");
    } else if (specialty === "Pediatrician") {
      history.push("/pediatrician");
    }
  };

  return (
    <Card 
      className="p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in cursor-pointer" 
      onClick={handleCardClick}
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <img src={imageUrl} alt={name} className="object-cover" />
        </Avatar>
        <div>
          <h3 className="font-display text-lg font-semibold text-secondary">{name}</h3>
          <p className="text-sm text-gray-600">{specialty}</p>
          <p className="text-xs text-gray-500">{experience} years experience</p>
          {specialty === "PCOS Specialist" && (
            <div className="mt-2 text-sm text-gray-700">
              <p>As a PCOS specialist, I can provide general insights into Polycystic Ovary Syndrome (PCOS), its symptoms, and management strategies.</p>
              <h4 className="font-semibold">General Opinions on PCOS</h4>
              <ol className="list-decimal list-inside">
                <li>PCOS Is a Complex Condition – PCOS is not just about ovarian cysts; it's an endocrine disorder that affects hormones, metabolism, and overall health. It requires a holistic approach to management.</li>
                <li>Lifestyle Changes Are Key – While there is no "cure" for PCOS, a well-balanced diet, regular exercise, and stress management can significantly improve symptoms.</li>
                <li>Insulin Resistance Plays a Huge Role – Many individuals with PCOS experience insulin resistance, which can lead to weight gain and increased risk of diabetes.</li>
                <li>Not Everyone With PCOS Has the Same Symptoms – PCOS presents differently in each person.</li>
                <li>Early Diagnosis and Management Matter – PCOS can increase the risk of long-term health issues.</li>
                <li>Medication Can Help but Isn't the Only Solution – Treatments can help manage symptoms.</li>
                <li>Mental Health Support Is Important – Many individuals with PCOS experience anxiety and depression.</li>
                <li>Fertility Challenges Are Common but Manageable – PCOS is a leading cause of infertility.</li>
              </ol>
            </div>
          )}
          {specialty === "Pediatrician" && (
            <div className="mt-2 text-sm text-gray-700">
              <p>As a pediatrician, my general opinions on children's health and well-being focus on prevention, early intervention, and holistic care.</p>
              <h4 className="font-semibold">General Opinions on Pediatric Health</h4>
              <ol className="list-decimal list-inside">
                <li>Prevention Is the Best Medicine – Routine checkups, vaccinations, and good hygiene habits are crucial.</li>
                <li>Nutrition Shapes Lifelong Health – A balanced diet supports growth and development.</li>
                <li>Sleep Is Non-Negotiable – Children need adequate sleep for brain development.</li>
                <li>Screen Time Should Be Limited – Excessive screen time can contribute to behavioral issues.</li>
                <li>Vaccinations Save Lives – Immunizations are one of the most effective ways to protect children.</li>
                <li>Emotional Health Is Just as Important as Physical Health – Children need a supportive environment.</li>
                <li>Physical Activity Is Essential – Kids should engage in at least 60 minutes of physical activity daily.</li>
                <li>Early Intervention Helps Development – Early assessment and intervention can greatly improve outcomes.</li>
                <li>Parental Involvement Matters – Children thrive when parents are actively involved.</li>
                <li>Every Child Develops at Their Own Pace – Growth and milestones vary.</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
