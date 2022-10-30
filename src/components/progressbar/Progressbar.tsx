import { useEffect, useRef, useState } from 'react'

interface Props {
    left?: boolean
    progress: number
}

const Progressbar = (props: Props) => {
    const barSmallRef = useRef<SVGPathElement>(null)
    const barBigRef = useRef<SVGPathElement>(null)

    const [lengthSmall, setLengthSmall] = useState(0)
    const [lengthBig, setLengthBig] = useState(0)

    useEffect(() => {
        setLengthSmall(barSmallRef.current!.getTotalLength())
        setLengthBig(barBigRef.current!.getTotalLength())
    }, [])

    let component
    if (props.left)
        component = (
            <svg
                x="20"
                y="calc(50% - 559px / 2)"
                width="98"
                height="559"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    ref={barSmallRef}
                    d="M52.6573 1C52.6573 1 2.02059 144.029 2.02059 285C2.02059 421.972 52.6573 557 52.6573 557"
                    stroke="#FF0059"
                    strokeWidth="2"
                    strokeDasharray={`${lengthSmall * props.progress} ${
                        lengthSmall * (1 - props.progress)
                    }`}
                    strokeDashoffset={`${0.5 * lengthSmall * (1 + props.progress)}`}
                />
                <path
                    d="M52.6573 1C52.6573 1 2.02059 144.029 2.02059 285C2.02059 421.972 52.6573 557 52.6573 557"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray={`${(lengthSmall * (1 - props.progress)) / 2}
                         ${lengthSmall * props.progress} ${
                        (lengthSmall * (1 - props.progress)) / 2
                    }`}
                />
                <path
                    ref={barBigRef}
                    opacity="0.2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M65.6701 39.511L57.5876 6C57.5876 6 8.08247 143.235 8.08247 280.351C8.08247 417.234 57.5876 554 57.5876 554L65.6701 520.49C65.6701 520.49 16.1649 417.427 16.1649 280.641C16.1649 143.427 65.6701 39.511 65.6701 39.511Z"
                    fill="url(#linear-gradient)"
                />
                <text
                    x="40"
                    y="284"
                    className="Progressbar-text"
                    color="red"
                    fontSize="20px"
                    fill="white"
                >
                    {`${Math.round(props.progress * 100)}`}
                </text>

                <linearGradient x1="1" y2="1" id="linear-gradient">
                    <stop offset={`${(1 - props.progress) * 50}%`} stopColor="white" />
                    <stop offset={`${(1 - props.progress) * 50}%`} stopColor="#FF0059" />
                    <stop offset={`${(1 + props.progress) * 50}%`} stopColor="#FF0059" />
                    <stop offset={`${(1 + props.progress) * 50}%`} stopColor="white" />
                </linearGradient>
            </svg>
        )
    else
        component = (
            <svg
                x="calc(100% - 98px - 20px)"
                y="calc(50% - 559px / 2)"
                width="98"
                height="559"
                viewBox="0 0 98 559"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    ref={barSmallRef}
                    d="M45.88 1C45.88 1 96 144.029 96 285C96 421.972 45.88 557 45.88 557"
                    stroke="#FF0059"
                    strokeWidth="2"
                    strokeDasharray={`${lengthSmall * props.progress} ${
                        lengthSmall * (1 - props.progress)
                    }`}
                    strokeDashoffset={`${0.5 * lengthSmall * (1 + props.progress)}`}
                />
                <path
                    d="M45.88 1C45.88 1 96 144.029 96 285C96 421.972 45.88 557 45.88 557"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray={`${(lengthSmall * (1 - props.progress)) / 2}
                         ${lengthSmall * props.progress} ${
                        (lengthSmall * (1 - props.progress)) / 2
                    }`}
                />
                <path
                    ref={barBigRef}
                    opacity="0.2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33 39.511L41 6C41 6 90 143.235 90 280.351C90 417.234 41 554 41 554L33 520.49C33 520.49 82 417.427 82 280.641C82 143.427 33 39.511 33 39.511Z"
                    fill="url(#linear-gradient)"
                />
                <text
                    x="40"
                    y="284"
                    className="Progressbar-text"
                    color="red"
                    fontSize="20px"
                    fill="white"
                >
                    {`${Math.round(props.progress * 100)}`}
                </text>
                <linearGradient x1="1" y2="1" id="linear-gradient">
                    <stop offset={`${(1 - props.progress) * 50}%`} stopColor="white" />
                    <stop offset={`${(1 - props.progress) * 50}%`} stopColor="#FF0059" />
                    <stop offset={`${(1 + props.progress) * 50}%`} stopColor="#FF0059" />
                    <stop offset={`${(1 + props.progress) * 50}%`} stopColor="white" />
                </linearGradient>
            </svg>
        )

    return component
}

export default Progressbar
