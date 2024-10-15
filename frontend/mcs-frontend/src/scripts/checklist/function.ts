import axios from 'axios'
import { Checklist as ChecklistFrontend } from '../../types/frontendTypes'
import { Checklist as ChecklistBackend } from '../../types/backendTypes'
import { getMainEventById } from '../event/functions'

// Default Checklist object
export const defaultChecklist: ChecklistFrontend = {
    RecordID: '',
    MainEvent: [],
    EventTask: [],
    Completed: [],
    Description: [],
}

// Function to reformat Checklist response data
function reformatChecklistResponseData(data: any): ChecklistFrontend {
    const checklist: ChecklistFrontend = {
        ...defaultChecklist,
        RecordID: data.id || defaultChecklist.RecordID,
        MainEvent: data.MainEvent || defaultChecklist.MainEvent,
        EventTask: data.EventTask || defaultChecklist.EventTask,
        Completed: data.Completed
            ? data.Completed.split('').map((val: string) => val === '1')
            : defaultChecklist.Completed,
        Description: data.Description
            ? data.Description
            : defaultChecklist.Description,
    }

    return checklist
}

// Function to reformat Checklist for backend
function reformatChecklistRequest(data: ChecklistFrontend): ChecklistBackend {
    const checklistBackend: ChecklistBackend = {
        MainEvent: data.MainEvent,
        EventTask: data.EventTask,
        Completed: data.Completed.map((val: boolean) => (val ? '1' : '0')).join(
            ''
        ),
    }

    return checklistBackend
}

// Function to get all Checklists
export async function getAllChecklists(): Promise<ChecklistFrontend[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CHECKLIST_API_PATH}`
        )
        const rawChecklists = res.data
        const formattedChecklists = rawChecklists.map((checklist: any) =>
            reformatChecklistResponseData(checklist)
        )
        console.log(formattedChecklists)
        return formattedChecklists
    } catch (error) {
        console.error('Error fetching all checklists:', error)
        return []
    }
}

// Function to get Checklist by event ID
export async function getChecklistByEventID(
    eventID: string
): Promise<ChecklistFrontend[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CHECKLIST_API_PATH}?mainEvent=${eventID}`
        )
        const rawChecklists = res.data
        const formattedChecklists = rawChecklists.map((checklist: any) =>
            reformatChecklistResponseData(checklist)
        )
        console.log(formattedChecklists)
        return formattedChecklists
    } catch (error) {
        console.error('Error fetching checklist by event ID:', error)
        return []
    }
}

// Function to create a new Checklist
export async function createNewChecklist(checklist: ChecklistFrontend) {
    const checklistBackend = reformatChecklistRequest(checklist)
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CHECKLIST_API_PATH}/${checklistBackend.MainEvent[0]}`,
        checklistBackend
    )
    return res.status
}

// Function to update an existing Checklist
export async function updateChecklist(checklist: ChecklistFrontend) {
    const checklistBackend = reformatChecklistRequest(checklist)
    const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CHECKLIST_API_PATH}/${checklist.RecordID}`,
        checklistBackend
    )
    return res.status
}
