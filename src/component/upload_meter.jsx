// @flow 
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { uploadPercent } from '../atoms';

export const UploadMeter = (props) => {
    const { t, percent, title } = props;
    // const percent = 
    // 100;
    // useRecoilValue(uploadPercent);

    const color = percent >= 75 ? " bg-green-900" : percent >= 50 ? " bg-teal-900" : " bg-blue-900";


    return (
        <div className="w-full">
            {
                (percent >= 1) ?
                    <div className="my-4 w-full relative">

                        
                        {/* <div className="block px-2 md:px-[8px] my-2 py-2 md:py-[8px] text-xs md:text-base w-full h-8 rounded-full bg-zinc-900 text-zinc-100 outline-none"> */}
                        <div className={"flex text-xs md:text-base h-7 rounded-full bg-zinc-900 text-zinc-100 outline-none relative border-2 overflow-hidden border-zinc-500" + color} >
                            <div className={"flex text-xs md:text-base h-6 rounded-full bg-green-900 text-zinc-100 outline-none absolute" + color} style={{ width: `${percent}%`}}>
                                <div className="flex flex-row w-full my-auto px-2 justify-between">
                                <p className="truncate text-left">{title}</p>
                                <p className="ml-2 font-extrabold text-right">{percent}%</p>
                                </div>
                            </div>
                            
                        </div>
                    </div> :
                    <></>
            }
        </div>
    );
};