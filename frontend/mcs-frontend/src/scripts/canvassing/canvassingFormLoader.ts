import { LoaderFunctionArgs } from 'react-router-dom'
import { Canvassing } from '../../types/frontendTypes'
import { getCanvassingByEventId } from './functions'

export async function loader({
    params,
}: LoaderFunctionArgs): Promise<
    { canvassings: Canvassing[] } | any
> {
    try {
        const eventID = String(params.eventid)
        const academicID = String(params.academicid)
        const canvassings = await getCanvassingByEventId(eventID);
        // check if the academic id is valid (i.e. it is added in the form)
        if(!canvassings[0].Academic.includes(academicID)){
            return {}
        }
        return { canvassings }
    } catch (error) {
        console.log(error)
        return {}
    }
}
