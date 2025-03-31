import {
    faFacebook,
    faSquareInstagram,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, CardMedia, Container, Link, Typography } from "@mui/material";
import React from "react";

const preventDefault = (event) => event.preventDefault();

export default function Footer() {
    return (
        <Container
            component="footer"
            sx={{
                minWidth: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "black",
                padding: "0 !important",
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "16px 16px",
                }}
            >
                <Box>
                    <CardMedia
                        height="46px"
                        component="img"
                        image="/logo.png"
                        alt="Logo HEAD"
                        sx={{
                            width: "100px",
                            objectFit: "contain",
                            backgroundColor: "black",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        gap: "14px",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        typography: "body1",
                        "& > :not(style) ~ :not(style)": {
                            ml: 2,
                        },
                    }}
                    onClick={preventDefault}
                >
                    <Link href="#" underline="none" sx={{color:"#fff", fontSize:"20px"}}>
                        <FontAwesomeIcon icon={faTiktok}/>
                    </Link>
                    <Link href="#" underline="none" sx={{color:"#fff", fontSize:"20px"}}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link href="#" underline="none" sx={{color:"#fff", fontSize:"20px"}}>
                        <FontAwesomeIcon icon={faSquareInstagram} />
                    </Link>
                </Box>
            </Container>
            <Typography
                variant="caption"
                textAlign="center"
                color="#fff"
                sx={{
                    backgroundColor: "black",
                    paddingBottom: "8px",
                    fontWeight: "300 !important",
                }}
            >
                Addnice | Terminos y condiciones
            </Typography>
        </Container>
    );
}
