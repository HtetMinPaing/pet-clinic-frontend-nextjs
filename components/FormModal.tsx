"use client";

import { useSearchContext } from "@/app/manage/users/layout";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

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

const FormModal = () => {
  const [formData, setFormData] = useState({
    petName: "",
    status: "",
    breed: "",
    gender: "",
    dateOfBirth: "",
    pawrent: "",
  });
  const { isModalOpen, handleModalClose } = useSearchContext();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data: ", formData);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" onSubmit={handleSubmit} sx={style}>
        <TextField
          label="Pet Name"
          variant="outlined"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="status">Age</InputLabel>
          <Select
            labelId="status"
            id="status"
            name="status"
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
          <InputLabel id="gender">Age</InputLabel>
          <Select
            labelId="gender"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, gebder: e.target.value }))
            }
            required
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default FormModal;
