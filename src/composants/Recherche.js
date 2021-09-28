import React, { useState } from "react";
import { Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import MonSelect from "./MonSelect";

export default function Recherche({
  filteredlistCoinsIds,
  listCurrencies,
  convertir,
  vider,
}) {
  const [ID, setID] = useState("");
  const [currency, setCurrency] = useState("");

  return (
    <Stack direction="row" spacing={15} sx={{ mt: 10 }}>
      <Stack direction="row" spacing={5}>
        <MonSelect
          label={"De"}
          menuItems={filteredlistCoinsIds}
          getValue={(id) => setID(id)}
        />
        <MonSelect
          label={"vers"}
          menuItems={listCurrencies}
          getValue={(currency) => setCurrency(currency)}
        />
      </Stack>
      <Stack direction="row" spacing={6}>
        <Button
          onClick={() => convertir(ID, currency)}
          variant="contained"
          sx={{ width: "15vh" }}
          endIcon={<AutorenewIcon />}
        >
          Convertir
        </Button>
        <Button
          onClick={() => vider()}
          variant="contained"
          sx={{ backgroundColor: "#E45155", width: "15vh" }}
          startIcon={<DeleteIcon />}
        >
          Vider
        </Button>
      </Stack>
    </Stack>
  );
}
