import React from 'react';

const RequestBanner = ({ type, message }) => {
    return (
        <div className={`request-banner ${type} ${type}-banner`}>
            {message}
        </div>
    );
};


export default RequestBanner;