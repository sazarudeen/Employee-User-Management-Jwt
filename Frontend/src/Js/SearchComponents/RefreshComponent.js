import React from 'react'

const RefreshBox = ({text,handleRefresh}) => {
    return(
        <div className='refresh_parent'>
            <div className="btn btn-success" style={{ marginTop: "20px" }} onClick={handleRefresh} >Refresh {text}</div>
        </div>
    )
}

export default RefreshBox