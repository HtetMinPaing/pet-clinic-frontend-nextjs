"use client";
import { DoctorForm, PatientForm, UserForm } from "@/components/FormModal";
import TabsWrapper from "@/components/UserTab";
import { Alert, Snackbar, Typography } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext<any>(null);

export function useSearchContext() {
  return useContext(SearchContext);
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [breed, setBreed] = useState("");
  const [city, setCity] = useState("");
  const [township, setTownship] = useState("");
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
  const ChooseForm = () => {
    if (type === "patients") {
      return <PatientForm />
    } else if (type === "owners") {
      return <UserForm />
    } else {
      return <DoctorForm />
    }
  }
  return (
    <SearchContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
        search,
        setSearch,
        type,
        setType,
        status,
        setStatus,
        breed,
        setBreed,
        city,
        setCity,
        township,
        setTownship,
        isModalOpen,
        handleModalOpen,
        handleModalClose,
        alert,
        handleAlertOpen,
        handleAlertClose,
      }}
    >
      <Typography color="primary" variant="body1" margin="0.875rem">
        {type.charAt(0).toUpperCase() + type.slice(1) + " List"}
      </Typography>
      <TabsWrapper />
      {children}
      <ChooseForm />
      {alert.isOpen && (
        <Snackbar
          open={alert.isOpen}
          onClose={handleAlertClose}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert severity="success" onClose={handleAlertClose}>
            {alert.description}
          </Alert>
        </Snackbar>
      )}
    </SearchContext.Provider>
  );
};

export default Layout;
