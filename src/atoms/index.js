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
//     { percent: 60, name: "A decentland part 5", id: "a5_du7BfZ3aCqAjVYWROr1uFogvX1O5oN-rMTV3GB1I" },
//     { percent: 25, name: "yet another podcast...", id: "Pcmceo8RUqDM16r1-yl-9cRgd0vC0hWU9ccPLk33_h0" },
//     { percent: 80, name: "some episode ", id: "oy_w8DWg2voZ9pJ-58NlrssAp8ISQ2_TYGyGtvzwMtw" },
//     { percent: 55, name: "some other episode ", id: "lP7N-dodWJ1smpYG3jGSu4aQvcqf5zzSm5hdsjTSivM" },
//     { percent: 100, name: "some other episode ", id: "lP7N-dodWJ1smpYG3jGSu4aQvcqf5zzSm5hdsjTSivM" },    
// ],

export const videoUploads = atom({
    key: 'videoUploads',
    default: [
            { percent: 60, name: "A decentland part 5", id: "a5_du7BfZ3aCqAjVYWROr1uFogvX1O5oN-rMTV3GB1I" },
            { percent: 25, name: "yet another podcast...", id: "Pcmceo8RUqDM16r1-yl-9cRgd0vC0hWU9ccPLk33_h0" },
            { percent: 80, name: "some episode ", id: "oy_w8DWg2voZ9pJ-58NlrssAp8ISQ2_TYGyGtvzwMtw" },
            { percent: 55, name: "some other episode ", id: "lP7N-dodWJ1smpYG3jGSu4aQvcqf5zzSm5hdsjTSivM" },
            { percent: 100, name: "some other episode ", id: "lP7N-dodWJ1smpYG3jGSu4aQvcqf5zzSm5hdsjTSivM" },    
        ]
});

export const audioUploads = atom({
    key: 'audioUploads',
    default: [],
});

export const coverUploads = atom({
    key: 'coverUploads',
    default: [],
});