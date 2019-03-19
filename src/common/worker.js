const events = require('events');
const fs = require('fs');
const path = require('path');

let instance;
const jobs = [];

const jobDir = '../jobs';
const DIR = path.join(__dirname, jobDir);

const snakeToKebab = str => str.replace(/_/g, '-');

const walkSync = (dir, listed) => {
    const files = fs.readdirSync(dir);
    let filelist = listed || [];
    files.forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

exports.registerListeners = () => {
    const files = walkSync(DIR);
    files.forEach((file) => {
        const splited = file.split('/');
        const fileName = splited[splited.length - 1];
        const [jobName] = fileName.split('.');
        const job = require(file);
        const dispatchName = `${snakeToKebab(jobName)}`;
        instance.on(dispatchName, job);
        jobs.push(dispatchName);
    });
};

exports.initialize = () => {
    instance = new events.EventEmitter();
    exports.registerListeners();
};

exports.getInstance = () => {
    if (!instance) exports.initialize();
    return instance;
};

exports.dispatch = async (job, data) => {
    const emmiter = await exports.getInstance();
    return emmiter.emit(job, data);
};

exports.getAvailableJobs = () => jobs;

module.exports = exports;
