import axios from 'axios'
import dayjs from 'dayjs'
import {
    Canvassing as CanvassingFrontend,
    CanvassingTemp as CanvassingTempFrontend,
} from '../../types/frontendTypes'
import {
    Canvassing as CanvassingBackend,
    CanvassingTemp as CanvassingTempBackend,
} from '../../types/backendTypes'

// Function to get all Canvassings
export async function getAllCanvassings(): Promise<CanvassingFrontend[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CANVASSING_API_PATH}`
        )
        const rawCanvassings = res.data
        const formattedCanvassings = rawCanvassings.map((canvassing: any) =>
            reformatCanvassingResponse(canvassing)
        )
        return formattedCanvassings
    } catch (error) {
        console.error('Error fetching all canvassings:', error)
        return []
    }
}

// Function to get a Canvassing List by Event ID
export async function getCanvassingByEventId(
    eventId: string
): Promise<CanvassingFrontend[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CANVASSING_API_PATH}?mainEvent=${eventId}`
        )
        const rawCanvassings = res.data
        const formattedCanvassings = rawCanvassings.map((raw: any) =>
            reformatCanvassingResponse(raw)
        )
        return formattedCanvassings
    } catch (error) {
        console.error('Error fetching canvassing by event ID:', error)
        return []
    }
}

// Function to create a new Canvassing
export async function createCanvassing(
    canvassingList: CanvassingTempFrontend[]
) {
    const canvassingBackend = canvassingList.map((canvassing) =>
        reformatCanvassingTempRequest(canvassing)
    )
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CANVASSING_API_PATH}`,
        canvassingBackend
    )
    return res.status
}

export async function updateCanvassing(
    canvassingList: CanvassingTempFrontend[]
) {
    const canvassingBackend = canvassingList.map((canvassing) =>
        reformatCanvassingTempRequest(canvassing)
    )

    const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CANVASSING_API_PATH}`,
        canvassingBackend
    )
    return res.status
}

// Default Canvassing object
export const defaultCanvassing: CanvassingFrontend = {
    RecordID: '',
    StartTime: dayjs(),
    EndTime: dayjs(),
    MainEvent: [],
    Venue: [],
    Academic: [],
    AvailableAcademic: [],
}

export const defaultCanvassingTemp: CanvassingTempFrontend = {
    id: '',
    StartTime: dayjs(),
    EndTime: dayjs(),
    MainEvent: [],
    Venue: [],
    MixedAcademic: [],
    AvailableAcademic: [],
}

// Function to reformat Canvassing response to frontend format
function reformatCanvassingResponse(data: any): CanvassingFrontend {
    const canvassing: CanvassingFrontend = {
        ...defaultCanvassing,
        RecordID: data.id || defaultCanvassing.RecordID,
        StartTime: data.StartTime
            ? dayjs(data.StartTime)
            : defaultCanvassing.StartTime,
        EndTime: data.EndTime ? dayjs(data.EndTime) : defaultCanvassing.EndTime,
        MainEvent: data.MainEvent || defaultCanvassing.MainEvent,
        Venue: data.Venue || defaultCanvassing.Venue,
        Academic: data.Academic || defaultCanvassing.Academic,
    }

    return canvassing
}

// Function to reformat Canvassing to backend format
function reformatCanvassingRequest(
    data: CanvassingFrontend
): CanvassingBackend {
    const canvassing: CanvassingBackend = {
        StartTime: data.StartTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        EndTime: data.EndTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        MainEvent: data.MainEvent,
        Academic: data.Academic,
        Venue: data.Venue,
        AvailableAcademic: data.AvailableAcademic,
    }

    return canvassing
}

// Function to reformat CanvassingTemp to backend format
function reformatCanvassingTempRequest(
    data: CanvassingTempFrontend
): CanvassingTempBackend {
    const canvassing: CanvassingTempBackend = {
        StartTime: data.StartTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        EndTime: data.EndTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        MainEvent: data.MainEvent,
        Venue: data.Venue,
        MixedAcademic: data.MixedAcademic,
        AvailableAcademic: data.AvailableAcademic,
    }

    return canvassing
}
