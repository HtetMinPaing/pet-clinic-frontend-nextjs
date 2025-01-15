"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { usePathname, useRouter } from "next/navigation";
import {
  alpha,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { useSearchContext } from "@/app/manage/users/layout";
import SearchIcon from "@mui/icons-material/Search";
import { filterOptions } from "@/constants/utils";
import DialogBox from "./DialogBox";
import { deleteSelectedPatient } from "@/api/patientAPI";
import { deleteSelectedUser } from "@/api/userAPI";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname.includes("patients")) {
      setValue(0);
    } else if (pathname.includes("owners")) {
      setValue(1);
    } else if (pathname.includes("staffs")) {
      setValue(2);
    }
  }, [pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push(`/manage/users/patients`);
        break;
      case 1:
        router.push("/manage/users/owners");
        break;
      case 2:
        router.push("/manage/users/staffs");
        break;
      default:
        router.push("/manage/users");
        break;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Patients" {...a11yProps(0)} />
          <Tab label="Owners" {...a11yProps(1)} />
          <Tab label="Staffs" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
}

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

function Buttons() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { selectedRows, handleModalOpen, handleAlertOpen, type } =
    useSearchContext();

  const handleDeleteSelected = async () => {
    console.log("Delete selected rows:", selectedRows);
    if (type === "patients") {
      await deleteSelectedPatient(selectedRows);
      handleAlertOpen("Delete selected patients successfully");
    } else {
      await deleteSelectedUser(selectedRows);
      handleAlertOpen("Delete selected pawrents successfully");
    }
    setIsDialogOpen(false);
  };

  const handleAddModalOpen = () => {
    handleModalOpen("add", null);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ height: "53px" }}
        onClick={handleAddModalOpen}
      >
        Add Patient
      </Button>
      <Button
        variant="outlined"
        color="error"
        sx={{ height: "53px" }}
        disabled={selectedRows.length === 0}
        onClick={() => setIsDialogOpen(true)}
      >
        Delete Selected
      </Button>
      <DialogBox
        isDialogOpen={isDialogOpen}
        closeDialog={() => setIsDialogOpen(false)}
        confirmDelete={handleDeleteSelected}
      />
    </div>
  );
}

function SearchInput() {
  const { search, setSearch } = useSearchContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log("Search value:", e.target.value);
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={search}
      onChange={handleSearchChange}
    />
  );
}

function SelectDropDown({ label, options }) {
  const {
    status,
    setStatus,
    breed,
    setBreed,
    city,
    setCity,
    township,
    setTownship,
  } = useSearchContext();

  const handleChange = (event: SelectChangeEvent) => {
    switch (label) {
      case "status":
        setStatus(event.target.value);
        break;
      case "breed":
        setBreed(event.target.value);
        break;
      case "city":
        setCity(event.target.value);
        break;
      case "township":
        setTownship(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        // value={}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function TabsWrapper() {
  const { type, city } = useSearchContext();
  const dropdownItems = filterOptions(type, city ? city : "");
  return (
    <div>
      <BasicTabs />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchInput />
          {Object.entries(dropdownItems).map(([key, options]) => {
            console.log(key, options);

            return <SelectDropDown key={key} label={key} options={options} />;
          })}
        </div>
        <Buttons />
      </div>
    </div>
  );
}
