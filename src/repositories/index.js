'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const repoDirPath = '../repositories/';
const { DBContext } = require('../common');

const normalizeRepoName = (name) => {
    const splitted = name.split('_').slice(0, -1);
    return _.camelCase(splitted.join('_'));
};

let paths;
const generateRepoPath = () => {
    if (!paths) {
        paths = fs.readdirSync(path.join(__dirname, repoDirPath)).reduce((acc, item) => {
            const normal = normalizeRepoName(item);
            if (normal) acc[normal] = `${repoDirPath}${item}`;
            return acc;
        }, {});
    }
    return paths;
};
class RepoFactory {
    constructor(context) {
        this.context = context;
        this.instance = {};
        this.repoPath = generateRepoPath();
        this.DBContext = DBContext;
    }

    get(repoName) {
        if (!this.instance[repoName]) {
            const Repo = require(this.repoPath[repoName]);
            this.instance[repoName] = new Repo(this.context);
        }
        return this.instance[repoName];
    }
}

module.exports = RepoFactory;
