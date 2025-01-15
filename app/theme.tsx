"use client";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#54BAB9",
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
    body1: {
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
