import { ComponentPropsWithoutRef } from 'react'
import useTrackInfo from '../../hooks/useTrackInfo'
import { TrackInfoInterface } from '../../interface/TrackProps'

interface Props extends ComponentPropsWithoutRef<'svg'> {
    trackBoxRef: React.RefObject<SVGSVGElement>
    pathRef: React.RefObject<SVGPathElement>
    percentDone: number
}

const trackInfo: TrackInfoInterface = {
    boxWidth: '278',
    boxHeight: '141',
    offsetX: -45.0,
    offsetY: -66.0,
    maxLength: undefined
}

const TRACK_1 = (props: Props) => {
    useTrackInfo(trackInfo, props.pathRef)

    return (
        <svg
            ref={props.trackBoxRef}
            x={`calc(50% - ${trackInfo.boxWidth}px / 2)`}
            y={`calc(50% - ${trackInfo.boxHeight}px / 2)`}
            width={`${trackInfo.boxWidth}px`}
            height={`${trackInfo.boxHeight}px`}
            viewBox={`0 0 ${trackInfo.boxWidth} ${trackInfo.boxHeight}`}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <title>Path</title>
            <g
                className="trajectory"
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="iPhone-SE"
                    transform={`translate(${trackInfo.offsetX}, ${trackInfo.offsetY})`}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                >
                    <path
                        id="Path"
                        d="M46.0246678,206.280196 C46.0246678,206.280196 45.7990331,201.160935 46.7125784,192.885591 C50.5508137,158.107359 83.5478971,67.5869292 322.991533,67"
                    ></path>
                    <path
                        ref={props.pathRef}
                        id="Path"
                        d="M46.0246678,206.280196 C46.0246678,206.280196 45.7990331,201.160935 46.7125784,192.885591 C50.5508137,158.107359 83.5478971,67.5869292 322.991533,67"
                        stroke="#FF0059"
                        strokeDasharray={`calc(${trackInfo.maxLength} * ${props.percentDone}) ${trackInfo.maxLength}`}
                    ></path>
                </g>
            </g>
        </svg>
    )
}

export default TRACK_1
