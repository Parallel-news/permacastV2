// @flow 
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { uploadPercent } from '../atoms';

export const UploadCount = ({count = 0}) => {

    const percent = useRecoilValue(uploadPercent);

    return (
        // count > 0 ?
        //     <span className="flex absolute -top-3 -right-3 py-1 px-2 text-white bg-red-600 rounded-full">
        //         <p>{count}</p>
        //     </span> :
        //     <></>

        count > 0 ?
        <span className="flex absolute -top-2 -right-2 py-1 px-2 text-white bg-red-600 rounded-full">
            <p>{count}</p>
        </span> :
        <></>
    );
};