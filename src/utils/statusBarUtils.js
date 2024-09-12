// Function to convert RGB to hexadecimal
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}).join('');

// Function to get the background color in hexadecimal format
const getBackgroundColor = (element) => {
  const style = window.getComputedStyle(element);
  const bgcolor = style.backgroundColor;
  const match = bgcolor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  
  if (match) {
    return rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
  }
  
  return bgcolor; // Return as-is if it's already in hex format or another valid color format
};

export const updateStatusBarColor = () => {
  const bodyBackgroundColor = getBackgroundColor(document.body);
  const metaThemeColor = document.querySelector("meta[name=theme-color]");
  
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", bodyBackgroundColor);
  } else {
    const newMetaThemeColor = document.createElement('meta');
    newMetaThemeColor.name = "theme-color";
    newMetaThemeColor.content = bodyBackgroundColor;
    document.head.appendChild(newMetaThemeColor);
  }
};