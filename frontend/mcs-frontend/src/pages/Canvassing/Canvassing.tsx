import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { CheckboxRow } from './CheckboxRow'
import { useLoaderData, useParams } from 'react-router-dom'
import { Canvassing as CanvassingType } from '../../types/frontendTypes'

export const Canvassing: React.FC = () => {
    let { eventid, academicid } = useParams()
    const { canvassings } = useLoaderData() as {
        canvassings: CanvassingType[]
    }

    return canvassings.length > 0 ? (
        <CheckboxRow academic={academicid!} canvassingSlots={canvassings} />
    ) : (
        <></>
    )
}
