"use client";

import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext<any>(null);

export function useSearchContext() {
  return useContext(SearchContext);
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = React.useState({
    type: "",
    isOpen: false,
    rowData: {},
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    description: "",
  });
  const handleModalOpen = (type, data) =>
    setIsModalOpen({
      type: type,
      isOpen: true,
      rowData: data,
    });
  const handleModalClose = () =>
    setIsModalOpen({
      type: "",
      isOpen: false,
      rowData: {},
    });
  const handleAlertOpen = (dialog: string) => {
    setAlert({
      isOpen: true,
      description: dialog,
    });
  };
  const handleAlertClose = () => {
    setAlert({
      isOpen: false,
      description: "",
    });
  };
  return <SearchContext.Provider></SearchContext.Provider>;
};

export default Layout;
