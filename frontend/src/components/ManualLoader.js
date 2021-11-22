import React from 'react'
import LoaderGif from '../assets/loader.gif'

export default function ManualLoader() {
    return (
        <div id="manual-loader">
            <img src={LoaderGif} />
        </div>
    )
}
