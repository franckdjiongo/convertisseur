import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Stack, Typography, Link } from "@mui/material";
import Recherche from "./composants/Recherche";
import Erreur from "./composants/Erreur";

function App() {
  const [listCoins, setListCoins] = useState([]);
  const [listCurrencies, setListCurrencies] = useState([]);
  const [erreurRecherche, setErreurRecherche] = useState(false);
  const [resultat, setResultat] = useState("");
  const [ID, setID] = useState("");
  const [currency, setCurrency] = useState("");

  const fetchListCoins = useCallback(() => {
    fetch("https://api.coingecko.com/api/v3/coins/list")
      .then((response) => response.json())
      .then((data) => setListCoins(data.sort((a, b) => 0.5 - Math.random())));
  }, []);

  const fetchCurrencies = useCallback(() => {
    fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
      .then((response) => response.json())
      .then((data) =>
        setListCurrencies(data.sort((a, b) => 0.5 - Math.random()))
      );
  }, []);

  useEffect(() => {
    fetchListCoins();
    fetchCurrencies();
  }, [fetchCurrencies, fetchListCoins]);

  const filteredlistCoinsIds = listCoins
    .map((coin) => coin.id)
    .filter((id) => id.length < 6);

  const convertir = useCallback((id, currency) => {
    if (!(id && currency)) {
      setErreurRecherche(true);
      setResultat("");
      return;
    }
    setID(id);
    setCurrency(currency);
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResultat(Object.values(Object.values(data)[0])[0]);
      });
    setErreurRecherche(false);
  }, []);

  return (
    <main style={{ position: "relative" }}>
      <Box
        sx={{
          bgcolor: "#0B5ED7",
          height: "50vh",
          position: "relative",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h3"
            sx={{ p: 15, textAlign: "center", mx: 35 }}
          >
            Les données proviennent dynamiquement de cet API{" "}
            <Link
              color="inherit"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.coingecko.com/api/documentations/v3#/"
            >
              https://www.coingecko.com/api/documentations/v3#/
            </Link>
            {". "}
            Les données affichées par les selects changent et sont générés
            aléatoirement à chaque chargement de la page. Il est a noté que
            seulement 10 valeurs sont sélectionnées parmis 1500 et plus.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "#EFEFEF", height: "50vh", position: "relative" }} />
      <Container
        sx={{
          bgcolor: "#EFEFEF",
          height: "50vh",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -20%)",
          textAlign: "center",
          width: "90%",
          borderRadius: 4,
          boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
        }}
      >
        <Typography
          sx={{ mt: "1.5rem", letterSpacing: 3 }}
          variant="h3"
          component="h3"
        >
          Convertisseur de monnaie
        </Typography>
        <Recherche
          filteredlistCoinsIds={filteredlistCoinsIds}
          listCurrencies={listCurrencies}
          convertir={convertir}
          vider={() => {
            setResultat("");
            setErreurRecherche(false);
          }}
        />
        {resultat ? (
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                mt: "3.5rem",
                color: "#0B5ED7",
                fontWeight: "bold",
                width: "fit-content",
                borderRadius: 1,
                boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
                p: 5,
              }}
              variant="h4"
              component="h4"
            >
              {`${ID} = ${resultat} ${currency}`}
            </Typography>
          </Stack>
        ) : undefined}

        {erreurRecherche ? (
          <Erreur erreurMessage={"Merci de faire un choix à convertir"} />
        ) : undefined}
      </Container>
    </main>
  );
}

export default App;
