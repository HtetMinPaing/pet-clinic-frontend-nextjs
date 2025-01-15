"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { fetchOwners } from "@/api/userAPI";
import { deletePatient, fetchPatients } from "@/api/patientAPI";
import { Button, colors, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useSearchContext } from "@/app/manage/users/layout";
import FormModal from "./FormModal";
import DialogBox from "./DialogBox";

const PatientColumns: GridColDef[] = [
  { field: "id", headerName: "Pet ID", width: 70 },
  { field: "petName", headerName: "Pet Name", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "breed", headerName: "Breed", width: 130 },
  { field: "gender", headerName: "Gender", width: 130 },
  { field: "dateOfBirth", headerName: "DOB", width: 130 },
  { field: "pawrentName", headerName: "Pawrent Name", width: 130 },
  { field: "pawrentEmail", headerName: "Pawrent Email", width: 200 },
  { field: "pawrentPhone", headerName: "Pawrent Phone", width: 130 },
  { field: "pawrentAddress", headerName: "Pawrent Address", width: 200 },
  {
    field: "actions",
    headerName: "",
    width: 70,
    sortable: false,
    renderCell: (params) => <ActionsMenu row={params.row} />,
  },
];

const OwnerColumns: GridColDef[] = [
  { field: "id", headerName: "Pet ID", width: 70 },
  { field: "fullName", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "contactPhone", headerName: "Phone", width: 150 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "township", headerName: "Township", width: 150 },
  { field: "city", headerName: "City", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => <ActionsMenu row={params.row} />,
  },
];

const ActionsMenu = ({ row }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { handleModalOpen, handleAlertOpen } = useSearchContext();

  const data = {
    id: row.id,
    petName: row.petName,
    status: row.status,
    breed: row.breed,
    gender: row.gender,
    dateOfBirth: row.dateOfBirth,
    pawrentEmail: row.pawrentEmail,
  }

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = async () => {
    handleModalOpen("update", data);
    handleClose();
  };

  const handleDelete = async () => {
    console.log("Delete row:", data);
    await deletePatient(data.id);
    handleAlertOpen( "Patient delete sucessfully");
    setIsDialogOpen(false);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={() => setIsDialogOpen(true)}>Delete</MenuItem>
      </Menu>
      <DialogBox isDialogOpen={isDialogOpen} closeDialog={() => setIsDialogOpen(false)} confirmDelete={handleDelete} />
    </div>
  );
};

export default function DataTable({ type }: { type: string }) {
  const columns = type === "patients" ? PatientColumns : OwnerColumns;
  const [rows, setRows] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0,
      pageSize: 10,
    });
  const [loading, setLoading] = React.useState(false);
  const { setSelectedRows, search, setType, status, breed, city, township } =
    useSearchContext();

  React.useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data =
        type === "patients"
          ? await fetchPatients({
              type,
              size: paginationModel.pageSize,
              page: paginationModel.page,
              search: search,
              status: status,
              breed: breed,
            })
          : await fetchOwners({
              type,
              size: paginationModel.pageSize,
              page: paginationModel.page,
              search: search,
              city: city,
              township: township,
            });
      setRows(data.content);
      setRowCount(data.totalElements);
      setType(type);
      setLoading(false);
    };
    fetch();
  }, [paginationModel, search, type, status, breed, city, township]);

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[1, 10, 20, 50]}
        loading={loading}
        checkboxSelection
        // onRowSelectionModelChange={handleRowSelectionChange}
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection); // Update selected rows
        }}
        sx={{
          border: 0,
          "& .MuiDataGrid-scrollbar--vertical": {
            "&::-webkit-scrollbar": {
              width: "8px", // Vertical scrollbar width
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Vertical scrollbar thumb color
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Hover effect for thumb
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1", // Track color for vertical
            },
          },
          "& .MuiDataGrid-scrollbar--horizontal": {
            "&::-webkit-scrollbar": {
              height: "8px", // Horizontal scrollbar height
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Horizontal scrollbar thumb color
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Hover effect for thumb
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1", // Track color for horizontal
            },
          },
        }}
      />
    </Paper>
  );
}
