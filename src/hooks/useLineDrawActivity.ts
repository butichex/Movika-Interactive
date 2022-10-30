import { useCallback, useEffect, useState } from 'react'

const maxRange = 25

const useLineDrawActivity = (
    enable: boolean,
    pathRef: React.RefObject<SVGPathElement>,
    distance: number
) => {
    const [userLinePath, _setUserLinePath] = useState('')
    const [userLineIsDrawing, setUserLineIsDrawing] = useState('true')

    const [lengthTotal, setLengthTotal] = useState(0)
    const [lengthInRange, setLengthInRange] = useState(0)
    const [, setCursor] = useState<DOMPoint>()
    const [accuracy, setAccuracy] = useState<number>(1)

    const setUserLinePath = useCallback(
        (newCursor: DOMPoint) => {
            if (!userLinePath) _setUserLinePath(`M${newCursor.x},${newCursor.y}`)
            else _setUserLinePath((prevPath) => `${prevPath} L${newCursor.x},${newCursor.y}`)
            setCursor(newCursor)
        },
        [userLinePath]
    )

    useEffect(() => {
        if (!enable) return
        if (distance === Infinity) return

        const isInRange = distance <= maxRange
        const newTotalLength = pathRef.current!.getTotalLength() || 0
        const newLength = newTotalLength - lengthTotal
        if (isInRange) setLengthInRange((prev) => prev + newLength)
        setLengthTotal(newTotalLength)
        setAccuracy(lengthInRange / lengthTotal)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [distance])

    return { userLinePath, setUserLinePath, userLineIsDrawing, setUserLineIsDrawing, accuracy }
}
export default useLineDrawActivity
