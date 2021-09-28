import React, { useEffect, useState } from "react";
import {
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

export default function MonSelect({ label, menuItems, getValue }) {
  const [selectValue, setSelectValue] = useState("");
  useEffect(() => getValue(selectValue), [getValue, selectValue]);

  return (
    <Container>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          sx={{ fontWeight: "bold", fontSize: "2rem", mt: -3 }}
          id="demo-simple-select-standard-label"
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectValue}
          onChange={(event) => setSelectValue(event.target.value)}
          label={label}
          sx={{ width: "25vh", fontSize: "2rem" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItems.slice(10, 20).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
}
