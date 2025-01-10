"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { fetchOwners, fetchUsers } from "@/api/fetchAPI";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const PatientColumns: GridColDef[] = [
  { field: "id", headerName: "Pet ID", width: 70 },
  { field: "petName", headerName: "Pet Name", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "breed", headerName: "Breed", width: 130 },
  { field: "gender", headerName: "Gender", width: 130 },
  { field: "dateOfBirth", headerName: "DOB", width: 130 },
  { field: "pawrentName", headerName: "Pawrent Name", width: 150 },
  { field: "pawrentEmail", headerName: "Pawrent Email", width: 200 },
  { field: "pawrentPhone", headerName: "Pawrent Phone", width: 150 },
  { field: "pawrentAddress", headerName: "Pawrent Address", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
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

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log("Edit row:", row);
    handleClose();
  };

  const handleDelete = () => {
    console.log("Delete row:", row);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default function DataTable({ type }) {
  const columns = type === "patients" ? PatientColumns : OwnerColumns;
  const [rows, setRows] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0,
      pageSize: 1,
    });
  const [loading, setLoading] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data =
        type === "patients"
          ? await fetchUsers({
              type,
              size: paginationModel.pageSize,
              page: paginationModel.page,
            })
          : await fetchOwners({
              type,
              size: paginationModel.pageSize,
              page: paginationModel.page,
            });
      setRows(data.content);
      setRowCount(data.totalElements);
      setLoading(false);
    };
    fetch();
  }, [paginationModel]);

  const handleEditSelected = () => {
    console.log("Edit selected rows:", selectedRows);
  };

  const handleDeleteSelected = () => {
    console.log("Delete selected rows:", selectedRows);
  };

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Button
          variant="outlined"
          color="primary"
          disabled={selectedRows.length === 0}
          onClick={handleEditSelected}
          sx={{ marginRight: 1 }}
        >
          Edit Selected
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={selectedRows.length === 0}
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
      </div>
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
        onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
