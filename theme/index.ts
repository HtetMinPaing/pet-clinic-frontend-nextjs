export const textFieldStyle = {
  
};
export const inputLabelStyle = {

};
export const selectStyle = {
  "& .MuiOutlinedInput-root": {
    borderColor: "#54BAB9", // Border color
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    borderColor: "#54BAB9", // Focused border color
  },
  "& .MuiInputBase-input": {
    fontSize: "0.875rem", // 14px
    fontWeight: 400, // Regular
    color: "black", // Text color
  },
};
export const menuStyle = {
  fontSize: "0.875rem",
  fontWeight: 400,
  color: "black",
};
export const pawrentInputStyle = {
  "& .MuiInputBase-root": {
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "#54BAB9", // Border color
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#54BAB9", // Border color on hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#54BAB9", // Border color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: "fade", // Label text color
    fontSize: "0.875rem", // Label font size
    fontWeight: 600, // Label font weight
  },
  "& .MuiAutocomplete-inputRoot": {
    paddingRight: "35px", // Add space for the loading spinner
  },
};
export const formContainerStyle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
  gap: 2,
  margin: "0 auto",
};
export const checkBoxLabelStyle = {
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem", // Font size for the label
    fontWeight: 400, // Font weight for the label
    color: "black", // Label text color
  },
};
export const checkBoxStyle = {
  color: "#EDC339", // Checkbox color
  "&.Mui-checked": {
    color: "#EDC339", // Color when checked
  },
};
