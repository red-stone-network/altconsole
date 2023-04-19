var altConsoleOpen = false;

var style = `.altConsole-body {
  width: 100vw;
  background-color: black;
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 180px;
  z-index: 9999;
}
.altConsole-titlebar {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  border-bottom: 2px solid white;
}
.altConsole-consolebar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 75%;
  border: none;
  border-top: 2px solid white;
  background-color: black;
  color: white;
  font-family: monospace;
}
.altConsole-console {
  position: absolute;
  bottom: 19px;
  left: 0;
  width: calc(75% + 4px);
  height: 141px;
  overflow: scroll;
}
.altConsole-console > p {
  margin: 2px;
  padding-left: 4px;
  font-family: monospace;
}
.altConsole-stylebox {
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(25% - 9px);
  height: 156px;
  border: none;
  border-left: 2px solid white;
  background-color: black;
  color: white;
  font-family: monospace;
}
.altConsole-debug {
  display: none;
}
.altConsole-displayDebug > .altConsole-debug {
  border-left: 4px solid #444;
  color: #444;
  display: block;
}
.altConsole-eval {
  border-left: 4px solid #336;
}
.altConsole-log {
  border-left: 4px solid gray;
}
.altConsole-info {
  border-left: 4px solid cyan;
}
.altConsole-warn {
  border-left: 4px solid orange;
  color: orange;
}
.altConsole-err {
  border-left: 4px solid red;
  color: red;
}`;
var el = document.createElement("STYLE");
el.id = "altConsole-consoleStyle"
el.innerHTML = style;
document.body.appendChild(el);

var el = document.createElement("STYLE");
el.id = "altConsole-userStyle"
document.body.appendChild(el);

var el = document.createElement("DIV");
el.className = "altConsole-body";
el.style.display = "none";
el.innerHTML = `<div class="altConsole-titlebar">
altConsole, by Redstone Network
</div>
<div class="altConsole-console altConsole-displayDebug">
</div>
<textarea class="altConsole-stylebox">
/* Put CSS here, then press CTRL + ENTER to apply */
</textarea>
<input class="altConsole-consolebar" placeholder="Type code here, then press Enter" onchange="runJavascript();">`
document.body.appendChild(el);

var console = {};
console.eval = function(eva){
  if (eva == undefined) {return}
  var msg;
  msg = eva.toString().replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  document.getElementsByClassName("altConsole-console")[0].innerHTML += `<p class="altConsole-eval">${msg}</p>`;
  setTimeout(function() {
    var g = document.getElementsByClassName("altConsole-console")[0]; g.scrollTop = g.scrollHeight;
  }, 50);
};
console.debug = function(debug){
  if (debug == undefined) {return}
  msg = debug.replace(/&/g, "&amp;")
  msg = msg.replace(/</g, "&lt;")
  msg = msg.replace(/>/g, "&gt;")
  document.getElementsByClassName("altConsole-console")[0].innerHTML += `<p class="altConsole-debug">${msg}</p>`;
  setTimeout(function() {
    var g = document.getElementsByClassName("altConsole-console")[0]; g.scrollTop = g.scrollHeight;
  }, 50);
};
console.log = function(logy){
  if (logy == undefined) {return}
  msg = logy.replace(/&/g, "&amp;")
  msg = msg.replace(/</g, "&lt;")
  msg = msg.replace(/>/g, "&gt;")
  document.getElementsByClassName("altConsole-console")[0].innerHTML += `<p class="altConsole-log">${msg}</p>`;
  setTimeout(function() {
    var g = document.getElementsByClassName("altConsole-console")[0]; g.scrollTop = g.scrollHeight;
  }, 50);
};
console.info = function(info){
  if (info == undefined) {return}
  msg = info.replace(/&/g, "&amp;")
  msg = msg.replace(/</g, "&lt;")
  msg = msg.replace(/>/g, "&gt;")
  document.getElementsByClassName("altConsole-console")[0].innerHTML += `<p class="altConsole-info">${msg}</p>`;
  setTimeout(function() {
    var g = document.getElementsByClassName("altConsole-console")[0]; g.scrollTop = g.scrollHeight;
  }, 50);
};
console.warn = function(warn){
  msg = warn.replace(/&/g, "&amp;")
  msg = msg.replace(/</g, "&lt;")
  msg = msg.replace(/>/g, "&gt;")
  if (warn == undefined) {return}
  document.getElementsByClassName("altConsole-console")[0].innerHTML += `<p class="altConsole-warn">${msg}</p>`;
  setTimeout(function() {
    var g = document.getElementsByClassName("altConsole-console")[0]; g.scrollTop = g.scrollHeight;
  }, 50);
};
console.error = function(err){
  if (err == undefined) {return}
  document.getElementsByClassName("altConsole-console")[0].innerHTML += `<p class="altConsole-err">${err}</p>`;
  setTimeout(function() {
    var g = document.getElementsByClassName("altConsole-console")[0]; g.scrollTop = g.scrollHeight;
  }, 50);
};
window.addEventListener("error", (event) => {
  if (event.filename == document.location.href) {
    event.filename = "unsafe_eval"
  }
  console.error(`${event.message}<br><span style="font-size: 11px;">
  In ${event.filename}, ${event.lineno}:${event.colno}</span>`)
});

function runJavascript(ev) {
  if (ev != "undefined") {
    console.eval(ev);
    console.eval(eval("(function() {"+ev+"})()"));
  }
}

function applyStyle(sty) {
  document.getElementById("altConsole-userStyle").innerHTML = sty;
}

document.addEventListener("keydown", function(event) {
	if (event.code == "Enter") {
  	if (document.activeElement == document.getElementsByClassName("altConsole-consolebar")[0]) {
  		event.preventDefault();
		  runJavascript(document.activeElement.value);
  	  document.activeElement.blur();
  	}
    if (document.activeElement == document.getElementsByClassName("altConsole-stylebox")[0] && event.ctrlKey == true) {
  		event.preventDefault();
		  applyStyle(document.activeElement.value);
  	  document.activeElement.blur();
  	}
	}
  if (event.shiftKey && event.ctrlKey && event.code == "KeyI") {
    event.preventDefault();
    if (document.getElementsByClassName("altConsole-body")[0].style.display == "block") {
      document.getElementsByClassName("altConsole-body")[0].style.display = "none";
    } else {
      document.getElementsByClassName("altConsole-body")[0].style.display = "block";
    }
  }
});
