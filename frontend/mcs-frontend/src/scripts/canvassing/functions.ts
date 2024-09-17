import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import {
    Canvassing as CanvassingFrontend,
    CanvassingTemp as CanvassingTempFrontend,
} from '../../types/frontendTypes'
import {
    Canvassing as CanvassingBackend,
    CanvassingTemp as CanvassingTempBackend,
} from '../../types/backendTypes'

dayjs.extend(utc)
dayjs.extend(timezone)

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
        return formattedCanvassings.sort(
            (a: CanvassingFrontend, b: CanvassingFrontend) => {
                return a.StartTime.isAfter(b.StartTime) ? 1 : -1
            }
        )
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

export async function updateCanvassing(canvassingList: CanvassingFrontend[]) {
    for (const canvassing of canvassingList) {
        const canvassingBackend = reformatCanvassingRequest(canvassing)
        const res = await axios.put(
            // change later
            `${process.env.REACT_APP_BACKEND_URL}/canvassing/${canvassing.RecordID}`,
            canvassingBackend
        )
        if (res.status !== 200) {
            return res.status // Return immediately if error
        }
    }
    return 200 // all updates were successful
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
    EventName: [],
    AcademicName: [],
}

// Function to reformat Canvassing response to frontend format
function reformatCanvassingResponse(data: any): CanvassingFrontend {
    const canvassing: CanvassingFrontend = {
        ...defaultCanvassing,
        RecordID: data.id || defaultCanvassing.RecordID,
        StartTime: data.StartTime
            ? dayjs(data.StartTime).utc().tz('Australia/Melbourne')
            : defaultCanvassing.StartTime,
        EndTime: data.EndTime
            ? dayjs(data.EndTime).utc().tz('Australia/Melbourne')
            : defaultCanvassing.EndTime,
        MainEvent: data.MainEvent || defaultCanvassing.MainEvent,
        Venue: data.Venue || defaultCanvassing.Venue,
        Academic: data.Academic || defaultCanvassing.Academic,
        AvailableAcademic:
            data.AvailableAcademic || defaultCanvassing.AvailableAcademic,
        EventName: data.EventName || defaultCanvassing.EventName,
        AcademicName: data.AcademicName || defaultCanvassing.AcademicName,
    }

    return canvassing
}

// Function to reformat Canvassing to backend format
function reformatCanvassingRequest(
    data: CanvassingFrontend
): CanvassingBackend {
    const canvassing: CanvassingBackend = {
        StartTime: data.StartTime.tz('Australia/Melbourne')
            .utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        EndTime: data.EndTime.tz('Australia/Melbourne')
            .utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        MainEvent: data.MainEvent,
        Academic: data.Academic,
        Venue: data.Venue,
        AvailableAcademic: data.AvailableAcademic,
    }

    return canvassing
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

// Function to reformat CanvassingTemp to backend format
function reformatCanvassingTempRequest(
    data: CanvassingTempFrontend
): CanvassingTempBackend {
    const canvassing: CanvassingTempBackend = {
        StartTime: data.StartTime.tz('Australia/Melbourne')
            .utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        EndTime: data.EndTime.tz('Australia/Melbourne')
            .utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        MainEvent: data.MainEvent,
        Venue: data.Venue,
        MixedAcademic: data.MixedAcademic,
        AvailableAcademic: data.AvailableAcademic,
    }

    return canvassing
}

export function formatCanvassingToTemp(
    canvassing: CanvassingFrontend
): CanvassingTempFrontend {
    return {
        id: canvassing.RecordID,
        StartTime: canvassing.StartTime,
        EndTime: canvassing.EndTime,
        MainEvent: canvassing.MainEvent,
        Venue: canvassing.Venue,
        AvailableAcademic: canvassing.AvailableAcademic,
        MixedAcademic: canvassing.Academic.map((academicId, index) => ({
            id: academicId,
            name: canvassing.AcademicName[index] || '',
            email: `${academicId}@university.edu`, // Example email logic
        })),
    }
}
