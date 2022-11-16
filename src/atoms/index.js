import { atom } from 'recoil';

export const uploadPercent = atom({
    key: 'uploadPercent',
    default: 0,
});

export const videoSelection = atom({
    key: 'videoSelection',
    default: ['', {}],
});

export const showPodcasts = atom({
    key: 'showPodcasts',
    default: true,
});


//                               //
//  Upload States // // Below // //
//                               //

// Example: 
// default: [
//     { percent: 60, name: "A decentland part 5", id: 1 },
//     { percent: 25, name: "yet another podcast...", id: 2 },
//     { percent: 80, name: "some episode ", id: 3 },
//     { percent: 55, name: "some other episode ", id: 4 },
//     { percent: 100, name: "some other episode ", id: 5 },
// ],

export const videoUploads = atom({
    key: 'videoUploads',
    default: [],
});

export const audioUploads = atom({
    key: 'audioUploads',
    default: [],
});

export const coverUploads = atom({
    key: 'coverUploads',
    default: [],
});