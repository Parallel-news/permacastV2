// @flow 
import * as React from 'react';
import Modal from './reusables/modal';
import { appContext } from '../utils/initStateGen';
import { UploadMeter } from './upload_meter';
import { useRecoilState } from 'recoil';
import { coverUploads, audioUploads, videoUploads } from '../atoms';

import { LinkIcon } from "@heroicons/react/24/solid";

export const UploadsModal = (props) => {
    const { t, } = props;

    const appState = React.useContext(appContext);
    const { isOpen, setIsOpen } = appState.globalModal;


    const [coverList, setCoverList] = useRecoilState(coverUploads);
    const [audioList, setAudioList] = useRecoilState(audioUploads);
    const [videoList, setVideoList] = useRecoilState(videoUploads);
    React.useEffect(() => {


    }, [])

    const ListElement = ({ ListType, children }) => <>
        {ListType.length > 0 && <h1 className="text-2xl tracking-wider text-white mt-8">{children}</h1>}
        {ListType.map(({ percent, id, name }, index) => <div key={index} className="mx-auto flex flex-row flex-wrap">
            <div className="flex flex-wrap bg-zinc-700 px-2 py-0.5 mt-4 rounded-3xl w-full border-2 border-zinc-500">
                <div className="w-full flex flex-row flex-nowrap ">
                    <div style={{ width: percent >= 100 ? "calc(100% - 3rem)" : "100%" }}>
                        <UploadMeter t={t} percent={percent} title={name} id={id} />
                    </div>
                    {percent === 100 && <div onClick={() => {
                        const remove = l => [...l].filter(coverObj => coverObj.id !== id);
                        switch (children) {
                            case "Audio Episodes":
                                setAudioList(remove)
                                break;
                            case "Video Episodes":
                                setVideoList(remove)
                                break;
                            case "Podcast Cover Images":
                                setCoverList(remove)
                                break;
                            default:
                                break;
                        }
                    }}
                        className="text-xl text-center content-center w-7 h-7 leading-6 my-4 ml-4 bg-zinc-900 rounded-full cursor-pointer active:bg-zinc-700 border-2 border-zinc-500" >
                        ×
                    </div>}
                </div>

                    <div className="flex flex-nowrap bg-zinc-900 h-6 p-2 mb-4 rounded-3xl w-full btn btn-ghost btn-sm btn-square hover:text-zinc-200 text-white  border-2 border-zinc-500">
                        <div className="my-auto w-4 h-4" onClick={console.log}>
                            <LinkIcon />
                        </div>
                        <div className="ml-2 my-auto h-4 text-ellipsis truncate" onClick={() => window.open(`https://v2.viewblock.io/arweave/tx/${id}`, '_blank')}>
                            {id}
                        </div>

                    </div>

            </div>
        </div>
        )}
    </>

    return (
        <Modal>
            <div className="py-6 w-full">
                <div className="absolute text-2xl right-2 top-0  w-10 h-10 rounded-lg border-2 border-transparent hover:border-gray-100 cursor-pointer" onClick={() => setIsOpen(false)}>
                    ×
                </div>
                <h1 className="text-3xl font-bold tracking-wider text-white pb-4">{t("uploadshow.uploadstitle")}</h1>
                <div className="mx-auto max-h-96 overflow-y-auto px-8 customBar">
                    <ListElement ListType={audioList}>Audio Episodes</ListElement>
                    <ListElement ListType={videoList}>Video Episodes</ListElement>
                    <ListElement ListType={coverList}>Podcast Cover Images</ListElement>
                </div>
            </div>
        </Modal>
    );
};