import initTests from '../helpers/initTests';
import data from '../data.json';

// Sort Challenges
for (let key in data) {
  if (data.hasOwnProperty(key)) {
    data[key].sort((a, b) => a.order - b.order);
  }
}

const subject = sessionStorage.getItem('subject');
const topicIndex =
  sessionStorage.getItem('topicIndex') || 0;
const challengeIndex =
  sessionStorage.getItem('challengeIndex') || 0;

const subjects = data[subject || Object.keys(data)[0]];
const topic = subjects[topicIndex];
const challenge = topic.challenges[challengeIndex];

const initState = {
  code: '$$\n' + challenge.challengeSeed.join('\n') + '\n$$',
  challenge,
  tests: challenge.tests.map(initTests),
  data
};

export default initState;
