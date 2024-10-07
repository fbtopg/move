const gradients = [
  'bg-gradient-to-r from-blue-400 to-purple-500',
  'bg-gradient-to-r from-green-400 to-blue-500',
  'bg-gradient-to-r from-yellow-400 to-red-500',
  'bg-gradient-to-r from-pink-400 to-red-500',
  'bg-gradient-to-r from-indigo-400 to-purple-500',
  'bg-gradient-to-r from-teal-400 to-blue-500',
  'bg-gradient-to-r from-orange-400 to-pink-500',
  'bg-gradient-to-r from-purple-400 to-indigo-500'
];

export const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};