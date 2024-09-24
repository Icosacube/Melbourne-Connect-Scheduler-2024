import React from 'react'
import { CheckboxForm } from './CheckboxForm'
import { useLoaderData, useParams } from 'react-router-dom'
import { Canvassing as CanvassingType } from '../../types/frontendTypes'

export const Canvassing: React.FC = () => {
    const { canvassings } = useLoaderData() as {
        canvassings: CanvassingType[]
    }

    return canvassings != undefined && canvassings.length > 0 ? (
        <CheckboxForm canvassingSlots={canvassings} />
    ) : (
        <></>
    )
}
