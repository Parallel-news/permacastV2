// @flow 
import * as React from 'react';

export const UploadCount = ({ count = 0 }) => {

    return (
        count > 0 ?
            <span className="flex absolute -top-2 -right-2 py-1 px-2 text-white bg-red-600 rounded-full">
                <p>{count}</p>
            </span> :
            <></>
    );
};