import { useEffect } from 'react'

const useTrackPoint = (ref: any, pointerGetter: any) => {
    useEffect(() => {
        const point = pointerGetter()
        if (!point.x || !point.y) return

        const ball = ref.current!
        ball.setAttribute('x', `${point.x - ball.width.animVal.value / 2}`)
        ball.setAttribute('y', `${point.y - ball.height.animVal.value / 2}`)
    }, [ref, pointerGetter])
}
export default useTrackPoint
