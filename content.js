var jQuery = document.createElement("script");
jQuery.src = chrome.runtime.getURL("jquery-3.6.1.min.js");
(document.head || document.documentElement).appendChild(jQuery);

var p5 = document.createElement("script");
p5.src = chrome.runtime.getURL("p5.min.js");
(document.head || document.documentElement).appendChild(p5);

var canvas = document.createElement("script");
canvas.src = chrome.runtime.getURL("canvas.js");
(document.head || document.documentElement).appendChild(canvas);
canvas.onload = async function () {
  this.remove();
};
