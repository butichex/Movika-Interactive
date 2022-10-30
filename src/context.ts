import { createContext } from 'react'
import { TrackInfoInterface } from './interface/TrackProps'

interface ContextTrackProps {
    trackInfo?: TrackInfoInterface
    setTrackInfo?: React.Dispatch<React.SetStateAction<TrackInfoInterface | undefined>>
}

export const TrackInfoContext = createContext<ContextTrackProps>({
    trackInfo: undefined,
    setTrackInfo: undefined
})
