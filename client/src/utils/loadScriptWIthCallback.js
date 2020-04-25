// Dynamically load JavaScript file with callback when finished
const loadScriptWithCallback = (url, callback) => {
  let script = document.createElement('script'); // create script tag
  script.type = 'text/javascript';

  // When script state is ready and loaded or complete, call callback
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url; // Loaded by url
  document.getElementsByTagName('head')[0].appendChild(script); // Append to head
};

export default loadScriptWithCallback;
