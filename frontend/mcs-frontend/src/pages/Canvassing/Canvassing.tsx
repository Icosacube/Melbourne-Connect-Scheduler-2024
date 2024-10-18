import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Canvassing as CanvassingType } from '../../types/frontendTypes'
import { CheckboxForm } from './CheckboxForm'

export const Canvassing: React.FC = () => {
    const { canvassings } = useLoaderData() as {
        canvassings: CanvassingType[]
    }

    return canvassings !== undefined && canvassings.length > 0 ? (
        <CheckboxForm canvassingSlots={canvassings} />
    ) : (
        <></>
    )
}
