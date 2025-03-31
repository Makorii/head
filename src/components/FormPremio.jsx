import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";
import MiStepper from "./MiStepper";

export default function FormPremio() {
    const [codigosGanadores, setCodigosGanadores] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Cargar códigos ganadores desde MockAPI
    useEffect(() => {
        const fetchCodigosGanadores = async () => {
            try {
                const response = await axios.get(
                    "https://65214fb8a4199548356d0a7d.mockapi.io/api/codigosGanadores"
                );
                setCodigosGanadores(response.data);
            } catch (error) {
                console.error("Error obteniendo los códigos ganadores:", error);
            }
        };

        fetchCodigosGanadores();
    }, []);

    // Generar automáticamente el número mágico
    useEffect(() => {
        if (codigosGanadores.length > 0) {
            const esGanador = Math.random() < 0.5; // 50% de probabilidad de ganar

            if (esGanador) {
                // Elegir un código ganador aleatorio
                const codigoGanador =
                    codigosGanadores[
                        Math.floor(Math.random() * codigosGanadores.length)
                    ];
                setCodigo(codigoGanador.codigo);
            } else {
                // Generar un código perdedor de 8 dígitos
                const codigoPerdedor = Math.floor(
                    10000000 + Math.random() * 90000000
                ).toString();
                setCodigo(codigoPerdedor);
            }
        }
    }, [codigosGanadores]);

    // Verificar si el código es ganador o no
    const verificarCodigo = () => {
        setError("");

        if (!codigo) {
            setError(
                "Hubo un problema al generar tu código. Inténtalo de nuevo."
            );
            return;
        }

        // Buscar si el código es ganador
        const ganador = codigosGanadores.find((item) => item.codigo === codigo);

        if (ganador) {
            navigate("/ganador", { state: { premio: ganador.premio } });
        } else {
            navigate("/segui-participando");
        }
    };

    return (
        <Container
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                padding: "0",
            }}
        >
            <Container
                sx={{
                    backgroundColor: "#000",
                    borderRadius: "0 0 20px 20px",
                    paddingTop: "20px",
                }}
            >
                <Typography
                    textAlign="center"
                    sx={{
                        fontSize: "42px",
                        fontWeight: "600",
                        padding: "10px 0",
                        fontFamily: "Interstate, sans-serif",
                        color: "#fff",
                    }}
                >
                    ¡ES EL MOMENTO DE DESBLOQUEAR TU CÓDIGO MÁGICO!
                </Typography>
            </Container>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{ padding: "10px 0", width: { sm: "70%", md: "50%" } }}
                >
                    Introduce tu código único en el campo de abajo y descubre si
                    la magia está de tu lado.
                </Typography>
                <MiStepper />
                <Typography
                    variant="h3"
                    sx={{
                        padding: "15px",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        margin: "20px 0",
                    }}
                >
                    {codigo || "Generando código..."}
                </Typography>

                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    onClick={verificarCodigo}
                    sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        textTransform: "none",
                        margin: "24px 0",
                        width: "342px",
                        padding: "8px 0",
                        fontSize: "16px",
                        borderRadius: "16px"
                    }}
                >
                    DESCUBRIR MI PREMIO
                </Button>
            </Container>
        </Container>
    );
}
