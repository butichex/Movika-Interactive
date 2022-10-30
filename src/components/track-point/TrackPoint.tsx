import { forwardRef, ComponentPropsWithoutRef } from 'react'

const TrackPoint = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<'svg'>>((props, ref) => (
    <svg {...props} ref={ref} viewBox="0 0 24 24" width="24" height="24">
        <g className="ball">
            <ellipse cx="12" cy="12" fill="#FF0059" id="svg_ball" rx="12" ry="12" />
        </g>
    </svg>
))

export default TrackPoint
