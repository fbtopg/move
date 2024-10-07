const gradients = [
  'bg-gradient-to-r from-blue-200 to-purple-300',
  'bg-gradient-to-r from-green-200 to-blue-300',
  'bg-gradient-to-r from-yellow-200 to-red-300',
  'bg-gradient-to-r from-pink-200 to-red-300',
  'bg-gradient-to-r from-indigo-200 to-purple-300',
  'bg-gradient-to-r from-teal-200 to-blue-300',
  'bg-gradient-to-r from-orange-200 to-pink-300',
  'bg-gradient-to-r from-purple-200 to-indigo-300'
];

export const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};