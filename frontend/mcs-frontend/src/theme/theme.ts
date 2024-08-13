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
            fontSize: '48px',
            letterSpacing: '2px',
            color: '#000000',
            lineHeight: 1.2,
        },
        h3: {
            fontFamily: 'Futura, sans-serif',
            maxLines: 2,
            lineHeight: 1.2,
            fontWeight: 500,
        },
        h4: {
            fontFamily: 'Futura, sans-serif',
            color: 'text.primary',
            maxLines: 2,
            lineHeight: 1.5,
            fontWeight: 500,
            overflow: 'hidden',
        },
        h5: {
            fontFamily: 'Futura, sans-serif',
            color: 'text.primary',
            maxLines: 2,
            lineHeight: 1.3,
        },
        h6: {
            fontFamily: 'Futura, sans-serif',
            color: 'text.primary',
            maxLines: 2,
            lineHeight: 1.3,
        },
        subtitle1: {
            fontFamily: 'Poppins, sans-serif',
            color: 'text.secondary',
            lineHeight: 1.3,
        },
        subtitle2: {
            fontFamily: 'Poppins, sans-serif',
            color: 'text.secondary',
            lineHeight: 1.3,
        },
        body1: {
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.3,
        },
        body2: {
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.2,
        },
        caption: {
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.2,
        },
        button: {
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.2,
        },
    },
    components: {
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
    },
}

const theme = createTheme(themeOptions)

export default theme
