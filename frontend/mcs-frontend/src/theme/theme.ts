import { createTheme, ThemeOptions } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
    palette: {
        background: {
            default: '#F5F5F5', // light-grey Background color
            paper: '#FFFFFF', // Background color for Paper, Card, etc.
        },
        text: {
            primary: '#2A2A2A', // blue-ish black
            secondary: '#595959', // grey
        },
        primary: {
            main: '#FBAB18', // orange
            light: '#FBCB18',
            dark: '#FBAB18',
        },
        secondary: {
            main: '#FBCB18', // yellow highlight
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h1: {
            fontFamily: 'Mohave, sans-serif',
            maxLines: 2,
        },
        h2: {
            fontFamily: 'Mohave, sans-serif',
            fontSize: '42px',
            letterSpacing: '2px',
            color: '#000000',
            lineHeight: 1,
        },
        h3: {
            fontFamily: 'Futura, sans-serif',
            maxLines: 2,
            lineHeight: 1.2,
            fontWeight: 500,
        },
        h4: {
            fontFamily: 'Futura, sans-serif',
            color: '2A2A2A',
            letterSpacing: '1px',
            maxLines: 2,
            lineHeight: 1.5,
            fontWeight: 500,
            overflow: 'hidden',
        },
        h5: {
            fontFamily: 'Futura, sans-serif',
            color: '2A2A2A',
            maxLines: 2,
            lineHeight: 1.2,
            fontWeight: 500,
        },
        h6: {
            fontFamily: 'Futura, sans-serif',
            color: '2A2A2A',
            maxLines: 2,
            lineHeight: 1.2,
        },
        subtitle1: {
            color: '#595959',
            lineHeight: 1.3,
        },
        subtitle2: {
            color: '#595959',
            lineHeight: 1.3,
        },
        body1: {
            color: '#2A2A2A',
            lineHeight: 1.3,
        },
        body2: {
            color: '#2A2A2A',
            lineHeight: 1.2,
        },
        caption: {
            lineHeight: 1.2,
        },
        button: {
            fontFamily: 'Futura, sans-serif',
            color: '2A2A2A',
            fontSize: '18pt',
            letterSpacing: '1px',
            maxLines: 2,
            fontWeight: 500,
            lineHeight: 1.2,
        },
    },
    components: {
        /* Text field styling */
        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: '8px 0',
                    '& .MuiInputBase-root': {
                        backgroundColor: '#EDEEEF', // Light grey background
                        borderRadius: '5px',
                        border: 'none',
                        padding: '12px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiInputBase-input': {
                        padding: 0,
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    '& .MuiInputBase-input': {
                        padding: '0px', // Removes padding inside the input
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    position: 'absolute',
                    transform: 'translate(0, -1.5rem) scale(1)', // fixed textfield title position
                    transformOrigin: 'top left',
                    transition: 'none',
                    zIndex: 1,
                    pointerEvents: 'none',
                },
                shrink: {
                    transform: 'translate(0, -1.5rem) scale(1)', // fixed textfield title position
                },
            },
        },
        /* Dropdown select field styling */
        MuiSelect: {
            styleOverrides: {
                select: {
                    backgroundColor: '#EDEEEF', // Light grey background
                    borderRadius: '5px',
                    padding: '12px',
                },
                icon: {
                    color: '#2A2A2A', // Color of the dropdown arrow
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    border: 'none',
                },
            },
        },
        /* Tab styling */
        MuiTabs: {
            styleOverrides: {
                root: {
                    '& .MuiTab-root.Mui-selected': {
                        color: '#FBAB18', // Text color when selected
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#FBAB18',
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: 20,
                    textTransform: 'none', // avoid capitalization
                    fontFamily: '"Futura", sans-serif',
                    letterSpacing: '1px',
                    '&.Mui-selected': {
                        color: '#FBAB18',
                    },
                },
            },
        },
        /* Button styling */
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    textTransform: 'none',
                    height: 'auto',
                    '&:hover': {
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
        /* Paper styling */
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
}

const theme = createTheme(themeOptions)

export default theme
