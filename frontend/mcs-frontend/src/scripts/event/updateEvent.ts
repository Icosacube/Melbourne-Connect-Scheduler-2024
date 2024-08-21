import axios from 'axios'
import { MainEvent } from '../../types/frontendTypes'

export default async function updateEvent(event: MainEvent) {
    console.log('POSTing to ' + process.env.REACT_APP_BACKEND_URL)
    const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + '/event/' + event.RecordID,
        event
    )
    // if it doesn't work an error message should pop up for user feedback
    return res.status
}
