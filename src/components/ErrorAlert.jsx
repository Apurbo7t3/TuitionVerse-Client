import React from 'react';

const ErrorAlert = ({ error = 'SomeThing Went Please Try Again' }) => {
    return (
        <div role="alert" className="alert alert-error">
            <span className='text-white font-medium'>{error}.</span>
        </div>
    );
};

export default ErrorAlert;