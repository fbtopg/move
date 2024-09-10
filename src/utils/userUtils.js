const adjectives = ['Happy', 'Clever', 'Brave', 'Gentle', 'Witty', 'Kind', 'Calm', 'Bright', 'Swift', 'Wise'];
const nouns = ['Panda', 'Tiger', 'Eagle', 'Dolphin', 'Fox', 'Wolf', 'Bear', 'Lion', 'Owl', 'Hawk'];

export const getRandomUsername = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adjective}${noun}${number}`;
};