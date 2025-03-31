import { CardMedia, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useStepper } from "../context/StepperContext";

export default function Header() {
    const { resetStep } = useStepper();
    const navigate = useNavigate();

    const handleClick = () => {
        resetStep();
        navigate("/");
    };
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "left",
                padding: "16px",
                backgroundColor: "#000",
                maxWidth: "100% !important",
            }}
        >
            <Container>
                <CardMedia
                    component="img"
                    height="46px"
                    image="/logo.png"
                    alt="Logo HEAD"
                    onClick={handleClick}
                    sx={{
                        width: "100px",
                        objectFit: "contain",
                    }}
                />
            </Container>
        </Container>
    );
}
