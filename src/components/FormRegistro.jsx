import { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import axios from "axios";
import { useNavigate } from "react-router";
import { useStepper } from "../context/StepperContext";
import MiStepper from "./MiStepper";

export default function FormRegistro() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [genero, setGenero] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    const [telefono, setTelefono] = useState("");
    const [mail, setMail] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { nextStep } = useStepper();

    const handleChange = (event) => {
        setGenero(event.target.value);
    };

    const handleSubmit = async () => {
        const newErrors = {};
        if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
        if (!apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
        if (!telefono.trim()) newErrors.telefono = "El teléfono es obligatorio";
        if (!mail.trim()) {
            newErrors.mail = "El correo es obligatorio";
        } else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/;
            if (!emailRegex.test(mail)) {
                newErrors.mail = "Mail no válido";
            }
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        try {
            const response = await axios.post(
                "https://67db35b41fd9e43fe473ed65.mockapi.io/addnice/usuarios",
                {
                    nombre,
                    apellido,
                    genero,
                    fechaNacimiento,
                    telefono,
                    mail,
                }
            );

            if (response.status >= 200 && response.status < 300) {
                nextStep();
                navigate("/validacion-de-compra");
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
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    textAlign="center"
                    variant="body1"
                    sx={{ padding: "10px 0", width: { sm: "70%", md: "50%" } }}
                >
                    Cada compra con HEAD puede traer una sorpresa. Sigue estos pasos y averigua si eres uno de los afortunados ganadores.
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
                        id="Nombre"
                        label="Nombre"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        error={!!errors.nombre}
                        helperText={errors.nombre}
                        fullWidth
                    />
                    <TextField
                        id="Apellido"
                        label="Apellido"
                        variant="outlined"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        error={!!errors.apellido}
                        helperText={errors.apellido}
                        fullWidth
                    />
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="genero-label">Género</InputLabel>
                        <Select
                            labelId="genero-label"
                            id="genero"
                            value={genero}
                            onChange={handleChange}
                            label="Género"
                        >
                            <MenuItem value="femenino">Femenino</MenuItem>
                            <MenuItem value="masculino">Masculino</MenuItem>
                            <MenuItem value="no-especificar">
                                No especificar
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={es}
                        locale={es}
                    >
                        <DatePicker
                            label="Fecha de nacimiento"
                            sx={{ width: "100%" }}
                            value={fechaNacimiento}
                            onChange={(newFecha) =>
                                setFechaNacimiento(newFecha)
                            }
                            format="dd/MM/yyyy"
                        />
                    </LocalizationProvider>
                    <TextField
                        id="telefono"
                        label="Teléfono"
                        variant="outlined"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        error={!!errors.telefono}
                        helperText={errors.telefono}
                        fullWidth
                    />
                    <TextField
                        id="mail"
                        label="Mail"
                        variant="outlined"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        error={!!errors.mail}
                        helperText={errors.mail}
                        fullWidth
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            backgroundColor: "#000",
                            color: "#fff",
                            margin: "24px 0",
                            textTransform: "none",
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
