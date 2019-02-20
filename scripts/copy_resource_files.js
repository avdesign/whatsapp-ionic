#!/usr/bin/env node

// each object in the array consists of a key which refers to the source and
// the value which is the destination.
const filestocopy = [
    {
        "./icons/drawable-hdpi/ic_stat_school.png": [
            "./platforms/android/app/src/main/res/drawable-land-hdpi/ic_stat_school.png",
            "./platforms/android/app/src/main/res/drawable-port-hdpi/ic_stat_school.png",
        ],
        "./icons/drawable-mdpi/ic_stat_school.png": [
            "./platforms/android/app/src/main/res/drawable-land-mdpi/ic_stat_school.png",
            "./platforms/android/app/src/main/res/drawable-port-mdpi/ic_stat_school.png",
        ],
        "./icons/drawable-xhdpi/ic_stat_school.png": [
            "./platforms/android/app/src/main/res/drawable-land-xhdpi/ic_stat_school.png",
            "./platforms/android/app/src/main/res/drawable-port-xhdpi/ic_stat_school.png",
        ],
        "./icons/drawable-xxhdpi/ic_stat_school.png": [
            "./platforms/android/app/src/main/res/drawable-land-xxhdpi/ic_stat_school.png",
            "./platforms/android/app/src/main/res/drawable-port-xxhdpi/ic_stat_school.png",
        ],
        "./icons/drawable-xxxhdpi/ic_stat_school.png": [
            "./platforms/android/app/src/main/res/drawable-land-xxxhdpi/ic_stat_school.png",
            "./platforms/android/app/src/main/res/drawable-port-xxxhdpi/ic_stat_school.png",
        ],
    },
];

const fs = require('fs');
const path = require('path');

filestocopy.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
        const srcfile = key;
        for(const val of obj[key]){
            const destfile = val;
            console.log("copying "+srcfile+" to "+destfile);
            const destdir = path.dirname(destfile);
            if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
                fs.createReadStream(srcfile).pipe(
                    fs.createWriteStream(destfile));
            }
        }
    });
});