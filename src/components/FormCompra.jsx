import React, { useState } from "react";
import {
    Button,
    Container,
    FormControl,
    TextField,
    Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import axios from "axios";
import MiStepper from "./MiStepper";
import { useStepper } from "../context/StepperContext";

export default function FormCompra() {
    const navigate = useNavigate();

    const [nroTicket, setNroTicket] = useState("");
    const [fechaCompra, setFechaCompra] = useState(null);
    const [tienda, setTienda] = useState("");
    const { nextStep } = useStepper();

    const handleSubmit = async () => {
        //hay que agregar campos requeridos??

        const fechaFormateada = fechaCompra
            ? format(fechaCompra, "dd-MM-yyyy")
            : null;
        try {
            const response = await axios.post(
                "https://67db35b41fd9e43fe473ed65.mockapi.io/addnice/validacion-compra",
                {
                    nroTicket,
                    fechaCompra: fechaFormateada,
                    tienda,
                }
            );

            if (response.status >= 200 && response.status < 300) {
                nextStep()
                navigate("/nro-magico", {
                    state: { nroTicket, fechaCompra: fechaFormateada, tienda },
                });
            } else {
                console.error("Error al guardar los datos");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <Container
            sx={{
                maxWidth: "100% !important",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                padding: "0 !important",
            }}
        >
            <Container
                sx={{
                    maxWidth: "100% !important",
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
                    ACTIVA TU CÓDIGO MÁGICO CON HEAD
                </Typography>
            </Container>
            <Container sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="body1"
                    textAlign="center"
                    sx={{ padding: "10px 0", width: { sm: "70%", md: "50%" } }}
                >
                    Tu “Código Mágico” puede convertir cada compra en una experiencia única. Completa los datos y descubre si tienes premio.
                </Typography>
                <MiStepper />
                <FormControl
                    fullWidth
                    sx={{
                        gap: "10px",
                        width: { sm: "70%", md: "50%" },
                        alignItems: "center",
                    }}
                >
                    <TextField
                        id="ticket"
                        label="Nro de Ticket"
                        variant="outlined"
                        value={nroTicket}
                        onChange={(e) => setNroTicket(e.target.value)}
                        fullWidth
                    />
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        localeText={es}
                        adapterLocale={es}
                        locale={es}
                    >
                        <DatePicker
                            label="Fecha de compra"
                            sx={{ width: "100%" }}
                            value={fechaCompra}
                            onChange={(newfechaCompra) =>
                                setFechaCompra(newfechaCompra)
                            }
                            format="dd/MM/yyyy"
                        />
                    </LocalizationProvider>
                    <TextField
                        id="tienda"
                        label="Tienda"
                        variant="outlined"
                        value={tienda}
                        onChange={(e) => setTienda(e.target.value)}
                        fullWidth
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
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
                        SIGUIENTE
                    </Button>
                </FormControl>
            </Container>
        </Container>
    );
}
