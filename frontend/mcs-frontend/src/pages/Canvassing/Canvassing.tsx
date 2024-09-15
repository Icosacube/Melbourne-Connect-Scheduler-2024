import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { CheckboxForm } from './CheckboxForm'
import { useLoaderData, useParams } from 'react-router-dom'
import { Canvassing as CanvassingType } from '../../types/frontendTypes'

export const Canvassing: React.FC = () => {
    let { eventid, academicid } = useParams()
    const { canvassings } = useLoaderData() as {
        canvassings: CanvassingType[]
    }

    return canvassings != undefined && canvassings.length > 0 ? (
        <CheckboxForm academic={academicid!} canvassingSlots={canvassings} />
    ) : (
        <></>
    )
}
