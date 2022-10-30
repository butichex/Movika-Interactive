import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'svg'> {
    linePath: string
    boxRef?: React.RefObject<SVGSVGElement>
    pathRef?: React.RefObject<SVGPathElement>
}

const UserLine = forwardRef<SVGSVGElement, Props>((props, ref) => (
    <svg className="user-line-box" ref={props.boxRef}>
        <g className="user-line">
            <path
                d={props.linePath}
                stroke="white"
                strokeWidth="2px"
                fill="transparent"
                ref={props.pathRef}
            />
        </g>
    </svg>
))

export default UserLine
