// Dynamically load JavaScript file.
const loadScript = (url) => {
  let script = document.createElement('script'); // Create script tag.
  script.type = 'text/javascript';

  script.src = url; // Loaded by url.
  document.getElementsByTagName('head')[0].appendChild(script); // Append to head.
};

export default loadScript;
