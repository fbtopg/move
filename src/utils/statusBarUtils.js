export const updateStatusBarColor = (color) => {
  // Convert RGB to hex if necessary
  const hexColor = color.startsWith('rgb') ? rgbToHex(color) : color;

  // Update meta tag
  const metaThemeColor = document.querySelector("meta[name=theme-color]");
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", hexColor);
  } else {
    const newMetaThemeColor = document.createElement('meta');
    newMetaThemeColor.name = "theme-color";
    newMetaThemeColor.content = hexColor;
    document.head.appendChild(newMetaThemeColor);
  }

  // Update status bar color for Android
  if (window.StatusBar) {
    window.StatusBar.backgroundColorByHexString(hexColor);
  }
};

const rgbToHex = (rgb) => {
  // Convert "rgb(r, g, b)" to "#rrggbb"
  const [r, g, b] = rgb.match(/\d+/g);
  return `#${((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)}`;
};