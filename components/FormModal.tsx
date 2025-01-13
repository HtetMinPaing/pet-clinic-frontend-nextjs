"use client";

import { addUser, findPawrentByEmail } from "@/api/fetchAPI";
import { addPatient } from "@/api/patientAPI";
import { useSearchContext } from "@/app/manage/users/layout";
import { breeds, mandalayTownships, yangonTownships } from "@/constants/utils";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

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

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  gap: 2,
  margin: "0 auto",
};

const PawrentInput = ({ onPawrentSelect }) => {
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
          label="Search Pawrent by Email"
          variant="outlined"
          placeholder="Enter email"
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
    password: "",
    contactPhone: "",
    address: "",
    city: "",
    township: "",
  });
  const { isModalOpen, handleModalClose } = useSearchContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data: ", formData);
    const data = await addUser(formData);
    console.log("Submit Data: ", data);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      contactPhone: "",
      address: "",
      city: "",
      township: "",
    });
    handleModalClose();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" onSubmit={handleSubmit} sx={style}>
        <FormControl fullWidth>
          <TextField
            label="Full Name"
            variant="outlined"
            name="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Contact Phone"
            variant="outlined"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))
            }
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="city">City</InputLabel>
          <Select
            labelId="city"
            id="city"
            name="city"
            label="city"
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            required
          >
            {["Yangon", "Mandalay"].map((city) => (
              <MenuItem value={city} key={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="township">Township</InputLabel>
          <Select
            labelId="township"
            id="township"
            name="township"
            label="township"
            value={formData.township}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, township: e.target.value }))
            }
            required
          >
            {formData.city
              ? formData.city === "Yangon"
                ? yangonTownships.map((city) => (
                    <MenuItem value={city} key={city}>
                      {city}
                    </MenuItem>
                  ))
                : mandalayTownships.map((city) => (
                    <MenuItem value={city} key={city}>
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
            type="address"
            name="address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            required
          />
        </FormControl>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export const PatientForm = () => {
  const [formData, setFormData] = useState({
    petName: "",
    status: "",
    breed: "",
    gender: "",
    dateOfBirth: "",
    pawrent: "",
  });
  const { isModalOpen, handleModalClose } = useSearchContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data: ", formData);
    const data = await addPatient(formData);
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
      pawrent: "",
    });
    handleModalClose();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" onSubmit={handleSubmit} sx={style}>
        <FormControl fullWidth>
          <TextField
            label="Pet Name"
            variant="outlined"
            name="petName"
            value={formData.petName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, petName: e.target.value }))
            }
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            label="Status"
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, status: e.target.value }))
            }
            required
          >
            <MenuItem value={"picky_eater"}>Picky eater</MenuItem>
            <MenuItem value={"allergy"}>Allergy</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="breed">Breed</InputLabel>
          <Select
            labelId="breed"
            id="breed"
            name="breed"
            label="Breed"
            value={formData.breed}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, breed: e.target.value }))
            }
            required
          >
            {breeds.map((breed) => (
              <MenuItem value={breed} key={breed}>
                {breed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            id="gender"
            name="gender"
            label="Gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, gender: e.target.value }))
            }
            required
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
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
            InputLabelProps={{
              shrink: true, // Ensures the label stays above the input
            }}
            required
          />
        </FormControl>
        <PawrentInput
          onPawrentSelect={(selectedPawrent) =>
            setFormData((prev) => ({
              ...prev,
              pawrent: selectedPawrent.email,
            }))
          }
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
