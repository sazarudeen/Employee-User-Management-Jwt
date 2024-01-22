import React from 'react'

const ProgressBar = ({width}) => {
    return (
        <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width: width+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{width+"%"}</div>
        </div>
    )
}

export default ProgressBar