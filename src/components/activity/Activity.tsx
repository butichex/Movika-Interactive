import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { TrackInfoContext } from '../../context'

import TrackPoint from '../track-point/TrackPoint'
import GreenDevPoint from '../GreenDevPoint'
import useTrackPoint from '../../hooks/useTrackPoint'
import useTrack from '../../hooks/useTrack'
import UserLine from '../user-line/UserLine'
import useLineDrawActivity from '../../hooks/useLineDrawActivity'
import Progressbar from '../progressbar/Progressbar'

interface Props {
    track: any
    time?: number
    type: string
    onResult: Dispatch<SetStateAction<boolean | undefined>>
}

const Activity = (props: Props) => {
    const trackBoxRef = useRef<SVGSVGElement>(null)
    const trackPathDoneRef = useRef<SVGPathElement>(null)
    const trackPointRef = useRef<SVGSVGElement>(null)
    const userLinePathRef = useRef<SVGPathElement>(null)

    const {
        setCursor,
        trackInfo,
        setTrackInfo,
        trackPercentDone,
        getTrackPoint,
        distance,
        isComplete
    } = useTrack({
        boxRef: trackBoxRef,
        pathRef: trackPathDoneRef
    })
    useTrackPoint(trackPointRef, getTrackPoint)

    const isUseLineDraw = props.type === 'draw'
    const { userLinePath, setUserLinePath } = useLineDrawActivity(
        isUseLineDraw,
        userLinePathRef,
        distance
    )

    const [isDrawing, setIsDrawing] = useState(false)
    const [greenDot, setGreenDot] = useState(new DOMPoint(0, 0))

    const onMouseHandler = (event: React.MouseEvent, drawing: boolean) => {
        setIsDrawing(drawing)
        if (!drawing) return

        const cursor = new DOMPoint(event!.nativeEvent.offsetX, event!.nativeEvent.offsetY)
        setCursor(cursor)
        setGreenDot(cursor)
    }
    const onMouseMoveHandler = (event: React.MouseEvent) => {
        if (!isDrawing) return

        const cursor = new DOMPoint(event!.nativeEvent.offsetX, event!.nativeEvent.offsetY)
        setCursor(cursor)
        setGreenDot(cursor)
        if (isUseLineDraw) setUserLinePath(cursor)
    }
    const TRACK = props.track

    const [progress, setProgress] = useState(0)
    const [counter, setCounter] = useState((props.time || 0) * 1000)
    useEffect(() => {
        const mode = props.time ? 'check timer' : 'check accuracy'

        if (mode === 'check timer') {
            if (isComplete) props.onResult!(true)
            if (counter <= 0) props.onResult!(false)
            setProgress(counter / props.time! / 1000)
            setTimeout(() => {
                setCounter((prev) => prev - 100)
            }, 100)
        } else {
            // 'check accuracy'
        }
    }, [props.time, counter, isComplete, props.onResult])

    return (
        <TrackInfoContext.Provider value={{ trackInfo, setTrackInfo }}>
            <svg
                className="activity-box"
                onMouseMove={(event) => onMouseMoveHandler(event)}
                onMouseUp={(event) => onMouseHandler(event, false)}
                onMouseLeave={(event) => onMouseHandler(event, false)}
            >
                {isUseLineDraw && <UserLine linePath={userLinePath} pathRef={userLinePathRef} />}

                <TRACK
                    trackBoxRef={trackBoxRef}
                    pathRef={trackPathDoneRef}
                    percentDone={trackPercentDone}
                />
                <TrackPoint
                    ref={trackPointRef}
                    onMouseDown={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                        onMouseHandler(event, true)
                    }
                />
                <GreenDevPoint greenDot={greenDot} />
                <Progressbar progress={progress} />
                <Progressbar progress={progress} left={true} />
            </svg>
        </TrackInfoContext.Provider>
    )
}
export default Activity
