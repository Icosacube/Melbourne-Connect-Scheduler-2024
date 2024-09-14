import axios from 'axios'
import { Academic as AcademicFrontend } from '../../types/frontendTypes'
import { Academic as AcademicBackend } from '../../types/backendTypes'

// Function to get all Academics
export async function getAllAcademics(): Promise<AcademicFrontend[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ACADEMIC_API_PATH}`
        )
        const rawAcademics = res.data
        const formattedAcademics = rawAcademics.map((academic: any) =>
            reformatAcademicResponse(academic)
        )
        return formattedAcademics
    } catch (error) {
        console.error('Error fetching all academics:', error)
        return []
    }
}

export async function getAcademicById(id: string): Promise<AcademicFrontend> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ACADEMIC_API_PATH}/${id}`
        )
        const rawAcademic = res.data
        const formattedAcademic = reformatAcademicResponse(rawAcademic)
        return formattedAcademic
    } catch (error) {
        console.error('Error fetching academic by ID:', error)
        return {} as AcademicFrontend
    }
}

// Function to create a new Academic
export async function createAcademic(academic: AcademicFrontend) {
    const academicBackend = reformatAcademicRequest(academic)
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ACADEMIC_API_PATH}`,
        academicBackend
    )
    return res.status
}

// Default Academic object
export const defaultAcademic: AcademicFrontend = {
    RecordID: '',
    Email: '',
    Name: '',
    MainEvent: [],
    Canvassing: [],
}

// Function to reformat Academic response to frontend format
function reformatAcademicResponse(data: any): AcademicFrontend {
    const academic: AcademicFrontend = {
        ...defaultAcademic,
        RecordID: data.id || defaultAcademic.RecordID,
        Email: data.Email || defaultAcademic.Email,
        Name: data.Name || defaultAcademic.Name,
        MainEvent: data.MainEvent || defaultAcademic.MainEvent,
        Canvassing: data.Canvassing || defaultAcademic.Canvassing,
    }

    return academic
}

// Function to reformat Academic to backend format
function reformatAcademicRequest(data: AcademicFrontend): AcademicBackend {
    const academic: AcademicBackend = {
        Email: data.Email,
        Name: data.Name,
        MainEvent: data.MainEvent,
        Canvassing: data.Canvassing,
    }

    return academic
}
