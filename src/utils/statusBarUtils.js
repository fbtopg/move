export const updateStatusBarColor = (color) => {
  const metaThemeColor = document.querySelector("meta[name=theme-color]");
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", color);
  } else {
    const newMetaThemeColor = document.createElement('meta');
    newMetaThemeColor.name = "theme-color";
    newMetaThemeColor.content = color;
    document.head.appendChild(newMetaThemeColor);
  }
};