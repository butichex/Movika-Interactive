import { useCallback, useEffect, useState } from 'react'
import { TrackInfoInterface } from '../interface/TrackProps'

interface Props {
    boxRef: any
    pathRef: any
}

const useTrack = (props: Props) => {
    const { boxRef, pathRef } = props

    const [trackInfo, setTrackInfo] = useState<TrackInfoInterface>()
    const [trackDoneLength, _setTrackDoneLength] = useState(0)
    const [trackPercentDone, setTrackPercentDone] = useState(0)
    const [distance, setDistance] = useState<number>(Infinity)
    const [cursor, setCursor] = useState<DOMPoint>()
    const [isComplete, setIsComplete] = useState(false)

    const translatePoint = useCallback(
        (point: DOMPoint) => {
            const box = boxRef.current!
            point.x += box.x.baseVal.value + (trackInfo?.offsetX || 0)
            point.y += box.y.baseVal.value + (trackInfo?.offsetY || 0)

            return point
        },
        [boxRef, trackInfo]
    )

    const getTrackPoint = useCallback(
        (trackLength?: number) => {
            trackLength = trackLength || trackDoneLength
            const point = pathRef.current!.getPointAtLength(trackLength)
            return translatePoint(point)
        },
        [pathRef, translatePoint, trackDoneLength]
    )

    const getDistance = (A: DOMPoint, B: DOMPoint) => {
        return Math.abs(((B.x - A.x) ** 2 + (B.y - A.y) ** 2) ** 0.5)
    }

    const setTrackDoneLength = useCallback(
        (newTrackLength: number) => {
            const minLength = 0
            const maxLength = trackInfo?.maxLength!

            if (newTrackLength < minLength) newTrackLength = minLength
            else if (newTrackLength > maxLength) newTrackLength = maxLength

            setTrackPercentDone(newTrackLength / maxLength)
            _setTrackDoneLength(newTrackLength)
        },
        [trackInfo]
    )

    useEffect(() => {
        if (!cursor) return

        const newDistance = getDistance(cursor!, getTrackPoint(trackDoneLength))
        const distanceToNext = getDistance(cursor!, getTrackPoint(trackDoneLength + 1))
        const direction = distanceToNext <= newDistance ? 1 : -1

        if (newDistance < distance) {
            setTrackDoneLength(trackDoneLength + direction)
            setDistance(newDistance)
        } else {
            setCursor(undefined)
            setDistance(Infinity)
        }

        if (trackDoneLength >= trackInfo?.maxLength! - 5) setIsComplete(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursor, distance, getTrackPoint, setTrackDoneLength])

    return {
        trackInfo,
        setTrackInfo,
        trackDoneLength,
        getTrackPoint,
        trackPercentDone,
        distance,
        cursor,
        setCursor,
        isComplete
    }
}
export default useTrack
