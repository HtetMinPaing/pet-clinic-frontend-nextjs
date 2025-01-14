import DataTable from "@/components/Table";
import React from "react";

const page = async ({ params }: { params: Promise<SegmentParams> }) => {
  const type = (await params).type || "";

  return (
    <div>
      <DataTable type={type} />
    </div>
  );
};

export default page;
