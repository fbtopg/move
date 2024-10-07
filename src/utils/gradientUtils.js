const gradients = [
  'bg-gradient-to-r from-blue-300 to-purple-400',
  'bg-gradient-to-r from-green-300 to-blue-400',
  'bg-gradient-to-r from-yellow-300 to-red-400',
  'bg-gradient-to-r from-pink-300 to-red-400',
  'bg-gradient-to-r from-indigo-300 to-purple-400',
  'bg-gradient-to-r from-teal-300 to-blue-400',
  'bg-gradient-to-r from-orange-300 to-pink-400',
  'bg-gradient-to-r from-purple-300 to-indigo-400'
];

export const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};