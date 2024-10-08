import { createTheme } from "@mui/material/styles";

export const themeLight = createTheme({
    typography: {
        fontFamily: '"Poppins", "Roboto", "Arial", "sans-serif"',
        body1: { fontWeight: 200 },
        button: { fontFamily: '"Poppins", "Roboto", "Arial", "sans-serif"' },
    },
    palette: {
        mode: "light",
        background: {
            default: "#ffffff",
        },
        primary: {
            main: "#003153",
        },
        secondary: {
            main: "#40657E",
        },
        text: {
            primary: "#000d15",
            secondary: "#00192a",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    background: "#000d15",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { variant: "cardButton" },
                            style: {
                                color: "#003153",
                            },
                        },
                    ],
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "#ffffff",
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    background: "#F8F9FA",
                },
            },
        },
    },
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
        easing: {
            easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
            easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
        },
    },
});

export const themeDark = createTheme({
    typography: {
        fontFamily: '"Poppins", "Roboto", "Arial", "sans-serif"',
        body1: { fontWeight: 200 },
        button: { fontFamily: '"Poppins", "Roboto", "Arial", "sans-serif"' },
    },
    palette: {
        mode: "dark",
        background: {
            default: "#000d15",
            paper: "#000d15",
        },
        primary: {
            main: "#003153",
        },
        secondary: {
            main: "#40657E",
        },
        text: {
            primary: "#ffffff",
            secondary: "#C0C4C8",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    background: "#000d15",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { variant: "cardButton" },
                            style: {
                                color: "#003153",
                            },
                        },
                    ],
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "#000d15",
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    background: "#00192A",
                },
            },
        },
    },
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
        easing: {
            easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
            easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
        },
    },
});

/* rich black darkest : #000D15;
    rich black darker : #001320;
    rich black blue : #00192A;
    prussian blue darker: #00253F;
    prussian blue: #003153;
    indigo dye: #204B69;
    paynes gray: #40657E;
    cadet grey: #8098A9;
    french grey: #C0CCD4; */

/*
    rich black darker : #001320;
    gunmetal: #20313C;
    charcoal: #404e58;
    slate grey: #808990;
    very french grey: #C0C4C8;
    */
