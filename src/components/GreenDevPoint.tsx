interface Props {
    greenDot: DOMPoint
}

const GreenDevPoint = ({ greenDot }: Props) => {
    return (
        <svg>
            <ellipse
                cx={`${greenDot.x}`}
                cy={`${greenDot.y}`}
                fill="green"
                id="svg_3"
                rx="2"
                ry="2"
            />
        </svg>
    )
}

export default GreenDevPoint
