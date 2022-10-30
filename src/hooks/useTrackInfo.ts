import { useContext, useEffect } from 'react'
import { TrackInfoContext } from '../context'
import { TrackInfoInterface } from '../interface/TrackProps'

const useTrackInfo = (trackInfo: TrackInfoInterface, pathRef: React.RefObject<SVGPathElement>) => {
    const { setTrackInfo } = useContext(TrackInfoContext)
    useEffect(() => {
        const maxLength = pathRef.current!.getTotalLength() - 1
        trackInfo.maxLength = maxLength
        setTrackInfo!({ ...trackInfo, maxLength })
    }, [pathRef, setTrackInfo, trackInfo])
}
export default useTrackInfo
