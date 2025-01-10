import Navigation from "@/components/Navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <Navigation pages={["User", "Appointment", "Inventory"]} />
        {children}
    </div>
  );
};

export default layout;
