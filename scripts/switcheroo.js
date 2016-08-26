function setActiveStyleSheets(ids){
  ids = ids.split(',');
  var i, j, l, link;
  for(i=0; (link = document.getElementById(ids[i])); i++){
    for(j=0; (l = document.getElementsByTagName('link')[j]); j++){
      if(l.hasAttribute('switch') && l.className.indexOf(link.className) !== -1)
        l.removeAttribute('href');
    }
    link.href = link.getAttribute('switch');
  }
}

function getActiveStyleSheets(){
  var i, link, active = [];
  for(i=0; (link = document.getElementsByTagName('link')[i]); i++){
    if(link.hasAttribute('switch') && link.href){
      active.push(link.id);
    }
  }
  return active.join(',');
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var i, c, ca = document.cookie.split(';');
  for(i=0; (c = ca[i]); i++) {
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie || getActiveStyleSheets();
  setActiveStyleSheets(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheets();
  createCookie("style", title, 365);
}
