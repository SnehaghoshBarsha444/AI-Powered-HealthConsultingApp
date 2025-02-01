import { DoctorCard } from "@/components/DoctorCard";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "PCOS Specialist",
      experience: "13",
      status: "Busy",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Pediatrician",
      experience: "17",
      status: "Busy",
      imageUrl: "https://plus.unsplash.com/premium_photo-1702598505193-dfbc11237822?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Dr. Pranjalika Agarwal",
      specialty: "Heart Specialist",
      experience: "15",
      status: "Busy",
      imageUrl: "https://plus.unsplash.com/premium_photo-1682089872205-dbbae3e4ba32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Dr. Swarnil Mallick",
      specialty: "Dermatologist",
      experience: "12",
      status: "Busy",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      name: "Dr. Manisha Sen",
      specialty: "Ophthalmologist",
      experience: "5",
      status: "Busy",
      imageUrl: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4 flex justify-between items-center">
          <h1 className="font-display text-3xl font-bold text-secondary">
            IsoHeal AI </h1>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 mt-2">
            Connect with specialists and get instant medical guidance
          </p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 space-y-12">
        <section className="space-y-6">
          <div className="text-center">
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
              Our Specialists
            </span>
            <h2 className="font-display text-2xl font-semibold mt-4 text-secondary">
              Meet Our Expert Doctors
            </h2>
          </div>
          <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-center">
               {doctors.map((doctor) => (
      <DoctorCard key={doctor.name} {...doctor} />
    ))}
  </div>
</div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
              AI Chat Assistant
            </span>
            <h2 className="font-display text-2xl font-semibold mt-4 text-secondary">
              Ask Your Health Questions
            </h2>
          </div>
          <ChatInterface />
        </section>
      </main>
    </div>
  );
};

export default Index;
