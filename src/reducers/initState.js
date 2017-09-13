import data from '../data.json';

const subjectIndex = sessionStorage.getItem('subjectIndex') || 0;
const topicIndex = sessionStorage.getItem('topicIndex') || 0;
const challengeIndex = sessionStorage.getItem('challengeIndex') || 0;

const subjects = data[Object.keys(data)[subjectIndex]];
const topic = subjects[topicIndex];
const challenge = topic.challenges[challengeIndex];

const initState = {
  code: '$$\n' + challenge.challengeSeed.join('\n') + '\n$$',
  challenge,
  data
};

export default initState;
