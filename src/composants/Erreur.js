import React from "react";
import { Alert, Stack } from "@mui/material";

export default function Erreur({ erreurMessage }) {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert
        variant="filled"
        severity="error"
        sx={{
          transition: "all 0.9s ease",
          mt: "5rem",
          fontSize: "1.5rem",
          width: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {erreurMessage}
      </Alert>
    </Stack>
  );
}
