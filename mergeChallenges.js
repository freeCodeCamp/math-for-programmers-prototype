/* eslint-disable import/unambiguous */

/*
 * CLI Node utility to generate a
 * merge of all challenge data.
 * */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { format } = require('prettier');

const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const challengesPath = path.resolve('./src/challenges');

let topics = [];

readDirAsync(challengesPath)
  .then(subjects =>
    Promise.all(
      subjects.map(dir => {
        topics.push(dir);
        return readDirAsync(path.join(challengesPath, dir));
      })
    )
  )
  .then(fileNames =>
    Promise.all(
      topics.map((topic, i) =>
        Promise.all(
          fileNames[i].map(y =>
            readFileAsync(path.join(challengesPath, topic, y), 'utf8')
          )
        )
      )
    )
  )
  .then(challenges => {
    const dataObj = {};
    topics.forEach((topic, i) => {
      dataObj[topic] = challenges[i].map(c => JSON.parse(c));
    });
    const dataPath = path.resolve(challengesPath, '../', 'data.json');
    fs.writeFileSync(
      dataPath,
      format(JSON.stringify(dataObj), { parser: 'json' })
    );
  })
  .catch(err => console.log(err));
