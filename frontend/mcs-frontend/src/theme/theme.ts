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
        },
        h3: {
            fontFamily: 'Futura, sans-serif',
            maxLines: 2,
            lineHeight: 1.1,
            fontWeight: 500,
        },
        h4: {
            fontFamily: 'Futura, sans-serif',
            color: 'text.primary',
            maxLines: 2,
            lineHeight: 1.2,
            fontWeight: 500,
            overflow: 'hidden' /* Hides overflow text */,
        },
        h5: {
            fontFamily: 'Futura, sans-serif',
            color: 'text.primary',
            maxLines: 2,
            lineHeight: 1.2,
        },
        h6: {
            fontFamily: 'Futura, sans-serif',
            color: 'text.primary',
            maxLines: 2,
            lineHeight: 1.2,
        },
        subtitle1: {
            fontFamily: 'Poppins, sans-serif',
            color: 'text.secondary',
            lineHeight: 1.2,
        },
        subtitle2: {
            fontFamily: 'Poppins, sans-serif',
            color: 'text.secondary',
            lineHeight: 1.2,
        },
        body1: {
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.2,
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
}

const theme = createTheme(themeOptions)

export default theme
