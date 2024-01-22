import React from 'react'

const RedisFlush = ({text,handleRefresh}) => {
    return(
        <div className='redis_flush_parent'>
            <div className="btn btn-primary" title = {`Clicking on this will flush the existing redis key of ${text} and then you can get the latest data by clicking the below Refresh ${text} button`} style={{ marginTop: "20px" }} onClick={handleRefresh} >Flush {text} data in Redis</div>
        </div>
    )
}

export default RedisFlush