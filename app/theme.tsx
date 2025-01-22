"use client";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { fontGrid } from "@mui/material/styles/cssUtils";
import { Padding } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#54BAB9",
    },
    warning: {
      main: "#EDC339",
    },
    error: {
      main: "#CD211D",
    },
    success: {
      main: "#1AB45D",
    },
    background: {
      primary: "#54BAB9",
      warm: "#EDC339",
      error: "#CD211D",
      success: "#1AB45D",
    },
    text: {
      black: "#000000",
      gray: "#444444",
      placeholder: "#ACB3C0",
      fade: "rgba(68, 68, 68, 0.5)",
      primary: "#54BAB9",
      white: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Poppins', Roboto, Arial, sans-serif", // Add Poppins font
    // h1: {
    //   fontSize: "2.5rem", // Default 40px
    //   fontWeight: 600, // Semibold
    // },
    // h2: {
    //   fontSize: "2rem", // Default 32px
    //   fontWeight: 600, // Semibold
    // },
    header1: {
      fontSize: "1.375rem", // 22px
      fontWeight: 600, // Semibold
    },
    body2: {
      fontSize: "1.125rem", // 18px
      fontWeight: 500, // Medium
    },
    subtitle1: {
      fontSize: "0.875rem", // 14px
      fontWeight: 600, // Semibold
    },
    subtitle2: {
      fontSize: "0.875rem", // 14px
      fontWeight: 400, // Regular
    },
    caption: {
      fontSize: "0.75rem", // 12px
      fontWeight: 400, // Regular
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => {
          if (ownerState.type) {
            return {
              "& .MuiInputLabel-root": {
                fontSize: "0.875rem",
                color: "fade", // Label color
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor:
                    ownerState.type === "add" ? "#76C9C7" : "#FFC857", // Hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    ownerState.type === "add" ? "#54BAB9" : "#EDC339", // Focused border color
                },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: ownerState.type === "add" ? "#54BAB9" : "#EDC339", // Focused border color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: ownerState.type === "add" ? "#54BAB9" : "#EDC339", // Label color when focused
              },
              "& .MuiOutlinedInput-root:hover .MuiInputLabel-root": {
                color: ownerState.type === "add" ? "#54BAB9" : "#EDC339", // Label color on hover
              },
              "& .MuiInputBase-input": {
                fontSize: "0.875rem", // 14px
                fontWeight: 400, // Regular
                color: "black", // Text color
              },
            };
          }
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#54BAB9",
            fontSize: "0.875rem",
            fontWeight: 600,
            fontFamily: "'Poppins', Roboto, Arial, sans-serif",
          },
          "& .MuiDataGrid-cell": {
            color: "#000000",
            fontSize: "0.875rem",
            fontWeight: 400,
            fontFamily: "'Poppins', Roboto, Arial, sans-serif",
          },
          "& .MuiTablePagination-toolbar": {
            color: "#000000",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              color: "#000000",
              fontSize: "0.875rem",
              fontWeight: 400,
            },
          "& .MuiTablePagination-select": {
            color: "#000000",
            fontSize: "0.875rem",
            fontWeight: 400,
          },
          "& .MuiTablePagination-selectIcon": {
            color: "#54BAB9", // Dropdown arrow color
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#EDF7F6", // Background color for hovered rows
          },
          "& .MuiDataGrid-selectedRowCount": {
            color: "#000000",
            fontSize: "0.875rem",
            fontWeight: 400,
          },
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
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        menuItem: {
          color: "#000000",
          fontSize: "0.875rem",
          fontWeight: 400,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          fontSize: "0.875rem", // 14px
          fontWeight: 400, // Regular
          color: "black",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "fade",
          fontSize: "0.875rem",
          fontWeight: 600,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: 400,
          color: "black",
        },
      },
    },
  },
});

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
