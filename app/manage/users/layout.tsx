import BasicTabs from "@/components/UserTab";
import React from "react";

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <BasicTabs />
      {children}
    </div>
  );
};

export default layout;
