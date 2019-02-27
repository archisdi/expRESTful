const events = require('events');
const fs = require('fs');
const path = require('path');

let instance;
const jobDir = '../jobs';
const DIR = path.join(__dirname, jobDir);

const snakeToKebab = str => str.replace(/_/g, '-');

exports.registerListeners = () => {
    fs.readdirSync(DIR).forEach((jobFile) => {
        const [jobName] = jobFile.split('.');
        const job = require(`${DIR}/${jobFile}`);
        instance.on(`${snakeToKebab(jobName)}`, job);
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

module.exports = exports;
