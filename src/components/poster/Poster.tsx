import { ComponentPropsWithoutRef } from 'react'
import './Poster.scss'

const Poster = (props: ComponentPropsWithoutRef<'div'>) => {
    return (
        <div className="poster" {...props}>
            Click to start
        </div>
    )
}

export default Poster
