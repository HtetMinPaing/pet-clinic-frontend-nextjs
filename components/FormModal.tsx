"use client";

import { findPawrentByEmail, updateUser } from "@/api/userAPI";
import { addUser } from "@/api/userAPI";
import { addPatient, updatePatient } from "@/api/patientAPI";
import { useSearchContext } from "@/app/manage/users/layout";
import { breeds, mandalayTownships, yangonTownships } from "@/constants/utils";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  pawrentInputStyle,
  textFieldStyle,
  inputLabelStyle,
  selectStyle,
  menuStyle,
  formContainerStyle,
  checkBoxLabelStyle,
  checkBoxStyle,
} from "@/theme";
import { addDoctor, updateDoctor } from "@/api/doctorAPI";

interface Role {
  id: number;
  name: string;
}

interface Pawrent {
  id: number;
  fullName: string;
  email: string;
  password: string;
  contactPhone: string;
  address: string;
  city: string;
  township: string;
  roles: Role[];
}

const PawrentInput = ({ isDisable, email, onPawrentSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue) {
      fetchPawrentByEmail(debouncedValue);
    } else {
      setOptions([]);
    }
  }, [debouncedValue]);

  const fetchPawrentByEmail = async (email) => {
    try {
      setLoading(true);
      const foundOwner = await findPawrentByEmail(email);
      setOptions(foundOwner); // Set it as an array for the autocomplete dropdown
    } catch (error) {
      console.error("Error fetching pawrent by email:", error);
      setOptions([]); // Clear options on error
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  return (
    <Autocomplete
      freeSolo
      disabled={isDisable}
      options={options}
      getOptionLabel={(option) => option.email}
      onInputChange={handleInputChange}
      onChange={(event, value) => {
        onPawrentSelect(value); // Pass selected pawrent to parent component
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={email ? email : "Search Pawrent by Email"}
          variant="outlined"
          placeholder="Enter email"
          sx={pawrentInputStyle}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export const UserForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactPhone: "",
    address: "",
    city: "",
    township: "",
  });
  const { isModalOpen, handleModalClose, handleAlertOpen } = useSearchContext();
  const formType = isModalOpen.type;
  useEffect(() => {
    if (isModalOpen.rowData && Object.keys(isModalOpen.rowData).length > 0) {
      setFormData({ ...isModalOpen.rowData });
    }
    console.log("Testing: ", formData);
    console.log("Context testing: ", isModalOpen.rowData);
  }, [isModalOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data: ", formData);
    const data =
      isModalOpen.type === "update"
        ? await updateUser(isModalOpen.rowData.id, formData)
        : await addUser(formData);
    handleAlertOpen(
      isModalOpen.type === "update"
        ? "Pawrent Update successfully"
        : "Pawrent register sucessfully"
    );
    console.log("Submit Data: ", data);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      contactPhone: "",
      address: "",
      city: "",
      township: "",
    });
    handleModalClose();
  };

  return (
    <Modal
      open={isModalOpen.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" onSubmit={handleSubmit} sx={formContainerStyle}>
        <Typography
          variant="header1"
          textAlign="center"
          color={isModalOpen.type === "update" ? "warning" : "primary"}
          gutterBottom
        >
          {isModalOpen.type === "update"
            ? "Update existing pawrent"
            : "Add new pawrent"}
        </Typography>
        <FormControl fullWidth>
          <TextField
            label="Full Name"
            variant="outlined"
            name="fullName"
            value={formData.fullName}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            sx={textFieldStyle}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            sx={textFieldStyle}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Contact Phone"
            variant="outlined"
            name="contactPhone"
            value={formData.contactPhone}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))
            }
            sx={textFieldStyle}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="city" sx={inputLabelStyle}>
            City
          </InputLabel>
          <Select
            labelId="city"
            id="city"
            name="city"
            label="city"
            value={formData.city}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            sx={selectStyle}
            required
          >
            {["Yangon", "Mandalay"].map((city) => (
              <MenuItem value={city} key={city} sx={menuStyle}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="township" sx={inputLabelStyle}>
            Township
          </InputLabel>
          <Select
            labelId="township"
            id="township"
            name="township"
            label="township"
            value={formData.township}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, township: e.target.value }))
            }
            sx={selectStyle}
            required
          >
            {formData.city
              ? formData.city === "Yangon"
                ? yangonTownships.map((city) => (
                    <MenuItem value={city} key={city} sx={menuStyle}>
                      {city}
                    </MenuItem>
                  ))
                : mandalayTownships.map((city) => (
                    <MenuItem value={city} key={city} sx={menuStyle}>
                      {city}
                    </MenuItem>
                  ))
              : ""}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={formData.address}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            sx={textFieldStyle}
            required
          />
        </FormControl>
        <Button
          variant="contained"
          color={isModalOpen.type === "update" ? "warning" : "primary"}
          sx={{typography: "subtitle2", color: "white"}}
          type="submit"
        >
          {isModalOpen.type}
        </Button>
      </Box>
    </Modal>
  );
};

export const PatientForm = () => {
  const { isModalOpen, handleModalClose, handleAlertOpen } = useSearchContext();
  const [formData, setFormData] = useState({
    petName: "",
    status: "",
    breed: "",
    gender: "",
    dateOfBirth: "",
    pawrentEmail: "",
  });
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (isModalOpen.rowData && Object.keys(isModalOpen.rowData).length > 0) {
      setFormData({ ...isModalOpen.rowData });
    }
    if (isModalOpen.type === "update") {
      setIsDisable(true);
    }
    console.log("Testing: ", formData);
    console.log("Context testing: ", isModalOpen.rowData);
    console.log("Disable: ", isDisable);
  }, [isModalOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data: ", formData);
    const data =
      isModalOpen.type === "update"
        ? await updatePatient(isModalOpen.rowData.id, formData)
        : await addPatient(formData);
    handleAlertOpen(
      isModalOpen.type === "update"
        ? "Patient Update successfully"
        : "Patient register sucessfully"
    );
    console.log("Submit Data: ", data);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      petName: "",
      status: "",
      breed: "",
      gender: "",
      dateOfBirth: "",
      pawrentEmail: "",
    });
    setIsDisable(false);
    handleModalClose();
  };

  return (
    <Modal
      open={isModalOpen.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" onSubmit={handleSubmit} sx={formContainerStyle}>
        <Typography
          variant="header1"
          textAlign="center"
          color={isModalOpen.type === "update" ? "warning" : "primary"}
          gutterBottom
        >
          {isModalOpen.type === "update"
            ? "Update existing patient"
            : "Add new patient"}
        </Typography>
        <FormControl fullWidth>
          <TextField
            label="Pet Name"
            variant="outlined"
            name="petName"
            value={formData.petName}
            type={isModalOpen.type}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, petName: e.target.value }))
            }
            sx={textFieldStyle}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status-label" sx={inputLabelStyle}>
            Status
          </InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            label="Status"
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, status: e.target.value }))
            }
            sx={selectStyle}
            required
          >
            <MenuItem value={"picky_eater"} sx={menuStyle}>
              Picky eater
            </MenuItem>
            <MenuItem value={"allergy"} sx={menuStyle}>
              Allergy
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="breed" sx={inputLabelStyle}>
            Breed
          </InputLabel>
          <Select
            labelId="breed"
            id="breed"
            name="breed"
            label="Breed"
            value={formData.breed}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, breed: e.target.value }))
            }
            sx={selectStyle}
            required
          >
            {breeds.map((breed) => (
              <MenuItem value={breed} key={breed} sx={menuStyle}>
                {breed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="gender" sx={inputLabelStyle}>
            Gender
          </InputLabel>
          <Select
            labelId="gender"
            id="gender"
            name="gender"
            label="Gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, gender: e.target.value }))
            }
            sx={selectStyle}
            required
          >
            <MenuItem value={"male"} sx={menuStyle}>
              Male
            </MenuItem>
            <MenuItem value={"female"} sx={menuStyle}>
              Female
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))
            }
            sx={textFieldStyle}
            InputLabelProps={{
              shrink: true, // Ensures the label stays above the input
            }}
            required
          />
        </FormControl>
        {isModalOpen.type === "update" && (
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!isDisable}
                  onChange={() => setIsDisable(!isDisable)}
                  sx={checkBoxStyle}
                />
              }
              label="Are you sure to update owner?"
              sx={checkBoxLabelStyle}
            />
          </FormControl>
        )}
        <PawrentInput
          isDisable={isDisable}
          email={formData.pawrentEmail}
          onPawrentSelect={(selectedPawrent) =>
            setFormData((prev) => ({
              ...prev,
              pawrentEmail: selectedPawrent.email,
            }))
          }
        />
        <Button
          variant="contained"
          color={isModalOpen.type === "update" ? "warning" : "primary"}
          sx={{typography: "subtitle2", color: "white"}}
          type="submit"
        >
          {isModalOpen.type}
        </Button>
      </Box>
    </Modal>
  );
};

export const DoctorForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactPhone: "",
    address: "",
    city: "",
    township: "",
  });
  const { isModalOpen, handleModalClose, handleAlertOpen } = useSearchContext();
  const formType = isModalOpen.type;
  useEffect(() => {
    if (isModalOpen.rowData && Object.keys(isModalOpen.rowData).length > 0) {
      setFormData({ ...isModalOpen.rowData });
    }
  }, [isModalOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data: ", formData);
    const data =
      isModalOpen.type === "update"
        ? await updateDoctor(isModalOpen.rowData.id, formData)
        : await addDoctor(formData);
    handleAlertOpen(
      isModalOpen.type === "update"
        ? "Doctor Update successfully"
        : "Doctor register sucessfully"
    );
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      contactPhone: "",
      address: "",
      city: "",
      township: "",
    });
    handleModalClose();
  };

  return (
    <Modal
      open={isModalOpen.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" onSubmit={handleSubmit} sx={formContainerStyle}>
        <Typography
          variant="header1"
          textAlign="center"
          color={isModalOpen.type === "update" ? "warning" : "primary"}
          gutterBottom
        >
          {isModalOpen.type === "update"
            ? "Update existing doctor"
            : "Add new doctor"}
        </Typography>
        <FormControl fullWidth>
          <TextField
            label="Full Name"
            variant="outlined"
            name="fullName"
            value={formData.fullName}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            sx={textFieldStyle}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            sx={textFieldStyle}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Contact Phone"
            variant="outlined"
            name="contactPhone"
            value={formData.contactPhone}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))
            }
            sx={textFieldStyle}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="city" sx={inputLabelStyle}>
            City
          </InputLabel>
          <Select
            labelId="city"
            id="city"
            name="city"
            label="city"
            value={formData.city}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            sx={selectStyle}
            required
          >
            {["Yangon", "Mandalay"].map((city) => (
              <MenuItem value={city} key={city} sx={menuStyle}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="township" sx={inputLabelStyle}>
            Township
          </InputLabel>
          <Select
            labelId="township"
            id="township"
            name="township"
            label="township"
            value={formData.township}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, township: e.target.value }))
            }
            sx={selectStyle}
            required
          >
            {formData.city
              ? formData.city === "Yangon"
                ? yangonTownships.map((city) => (
                    <MenuItem value={city} key={city} sx={menuStyle}>
                      {city}
                    </MenuItem>
                  ))
                : mandalayTownships.map((city) => (
                    <MenuItem value={city} key={city} sx={menuStyle}>
                      {city}
                    </MenuItem>
                  ))
              : ""}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={formData.address}
            type={formType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            sx={textFieldStyle}
            required
          />
        </FormControl>
        <Button
          variant="contained"
          color={isModalOpen.type === "update" ? "warning" : "primary"}
          sx={{typography: "subtitle2", color: "white"}}
          type="submit"
        >
          {isModalOpen.type}
        </Button>
      </Box>
    </Modal>
  );
};
