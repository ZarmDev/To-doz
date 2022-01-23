const allpanes = document.getElementById('allpanes');
const popup = document.getElementById('popup');
const data = document.getElementById('data');

const item = document.createElement('div');

const items = document.getElementsByClassName('pane');

let mql = window.matchMedia('(max-width: 760px)');
//rgb(153 153 153 / 70%)
if (mql.matches && localStorage.getItem('localMobile') == undefined) {
  //console.log(';test');
  localStorage.setItem('localMobile', 'done')
  document.getElementById('mobile').style.visibility = 'visible';
  document.getElementById('title').style.marginLeft = '5%';
}

if (localStorage.getItem('enableData') == undefined) {
  document.getElementById('data').style.display = 'inline-block';
}

if (mql.matches) {
  document.getElementById('allpanes').style.gridTemplateColumns = '1fr 1fr 1fr';
}

function setCookie(cname, cvalue) {
  var d = new Date();
  d.setDate(d.getDate())
  d.setUTCHours(23, 59, 59, 999);
  // d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("streak");
  if (user != "") {
    document.getElementById('streak').innerHTML = `Your streak: ${user}🔥`;
  } else {
    setCookie('streak', '0', 1)
    document.getElementById('streak').innerHTML = `Your streak: 0🔥`;
  }
}

checkCookie('streak')

if (localStorage.getItem('localGoal') == undefined) {
  localStorage.setItem('localGoal', '0')
}
document.getElementById('goal').innerHTML = `Goal: ${localStorage.getItem('localGoal')} days`;

function getData(id, ls, color) {
  if (localStorage.getItem(ls) == undefined) {
    localStorage.setItem(ls, color)
    document.getElementById(id).value = color;
  } else {
    console.log(localStorage.getItem(ls));
    document.getElementById(id).value = localStorage.getItem(ls);
  }
}

getData('topcolor', 'localTop', '#0c770c')
getData('paneColor', 'localPan', '#c0c0c0')
getData('backColor', 'localBackground', '#fcfcfc')
getData('textFontColor', 'localFontColor', '#000000')
getData('buttonColor', 'localButtonColor', '#d0d0d7')
getData('blurCheck', 'localBlurCheck', 'Off')
getData('rounded', 'localRoundedCheck', 'Off')
getData('toggleStreak', 'localStreakEnabled', 'On')
getData('fonts', 'localFontFamily', 'Open Sans')
getData('textFontSize', 'localFontSize', '2ch')
getData('toggleExtend', 'localExtendEnabled', 'Off')
getData('popupColor', 'localPopupColor', '#808080')

var textTag = 'pre';

var toggle = false;

function clickPane(t) {
  let tc = t.parentElement.children;
  if (toggle == false) {
    for (var i = 0; i < tc.length; i++) {
      tc[i].style.opacity = '0.2';
    }
    t.style.backgroundImage = 'url("assets/drawing-11.svg")';
  } else {
    let tc = t.parentElement.children;
    if (toggle == false) {
      for (var i = 0; i < tc.length; i++) {
        tc[i].style.opacity = '1';
      }
      t.style.backgroundImage = 'none';
    }
  }
}

function addPane(choice, extraParam) {
  // create function with all of this accept you can change the attributes
  console.log(localStorage, 'Oh...');
  if (choice.includes('temp')) {
    var pane = document.createElement('div');
    pane.setAttribute('class', 'pane quietDown panenew')
    console.log(pane.className)
    var backgroundDiv = document.createElement('div');
    backgroundDiv.style = `position: absolute; width: 14ch; height: 15ch; padding: inherit;`;
    backgroundDiv.setAttribute('onclick', 'clickPane(this)')
    // pane.style.backgroundColor = document.getElementById('paneColor');
    var button = document.createElement('button');
    button.setAttribute('onclick', 'removeT(this)')
    button.innerHTML = 'X';
    button.setAttribute('class', 'button')
    var title = document.createElement(textTag);
    title.setAttribute('contenteditable', 'true')
    title.setAttribute('class', 'newp')
    title.innerHTML = 'Unnamed pane';
    title.style = `margin-top: 0.5vw; margin-bottom: 1vw;`;
    var description = document.createElement(textTag);
    description.setAttribute('contenteditable', 'true')
    description.setAttribute('oninput', 'longerPane(this)')
    description.innerHTML = 'Description';
    description.setAttribute('class', 'newp')
    var button2 = document.createElement('button');
    button2.setAttribute('onclick', 'extend(this)')
    button2.setAttribute('class', 'button2 extend')
    button2.innerHTML = '^';
  } else {
    var pane = document.createElement('div');
    pane.setAttribute('class', 'pane quietDown panenew')
    console.log(pane.className);
    // pane.style.backgroundColor = document.getElementById('paneColor');
    var button = document.createElement('button');
    button.setAttribute('onclick', 'removeT(this)')
    button.innerHTML = 'X';
    button.setAttribute('class', 'button')
    var title = document.createElement(textTag);
    title.setAttribute('contenteditable', 'true')
    title.setAttribute('class', 'newp')
    title.innerHTML = 'Unnamed pane';
    title.style = 'margin-top: 0.5vw; margin-bottom: 1vw;';
    var description = document.createElement(textTag);
    description.setAttribute('contenteditable', 'true')
    description.setAttribute('oninput', 'longerPane(this)')
    description.innerHTML = 'Description';
    description.setAttribute('class', 'newp')
    var button2 = document.createElement('button');
    button2.setAttribute('onclick', 'extend(this)')
    button2.setAttribute('class', 'button2 extend')
    button2.innerHTML = '^';
  }
  switch (choice) {
    case 'default':
      if (extraParam.includes('rounded')) {
        pane.style.borderRadius = '10px';
        button.style.borderRadius = '10px';
        button2.style.borderRadius = '10px';
      }
      allpanes.appendChild(pane)
      pane.appendChild(button)
      if (extraParam.includes('extend')) {
        pane.appendChild(button2)
      }
      pane.appendChild(title)
      pane.appendChild(description)
      break;
    case 'load':
      // It's not nessarcy to create new elements every loop as only some elements need to be recreated (the pre tags)
      for (var t = 0; t < localStorage.getItem('localItems').split(',').length; t++) {
        // Unnamed pane|Description|important^
        var lpane = document.createElement('div');
        console.log(`${localStorage.getItem('localItems').split(',')[t].split('|')[2]}`);
        lpane.setAttribute('class', `${localStorage.getItem('localItems').split(',')[t].split('|')[2]}`)
        // if (localStorage.getItem('localItems').split(',')[t].split('|')[2].split('^')[0]) {
        // add label
        // }
        var ltitle = document.createElement(textTag);
        ltitle.setAttribute('contenteditable', 'true')
        ltitle.setAttribute('class', 'newp popupChange')
        ltitle.innerHTML = `${localStorage.getItem('localItems').split(',')[t].split('|')[0]}`;
        ltitle.style = 'margin-top: 0.5vw; margin-bottom: 1vw;';
        var ldescription = document.createElement(textTag);
        ldescription.setAttribute('contenteditable', 'true')
        ldescription.setAttribute('oninput', 'longerPane(this)')
        ldescription.innerHTML = `${localStorage.getItem('localItems').split(',')[t].split('|')[1]}`;
        ldescription.setAttribute('class', 'newp popupChange')
        // for some reason when moving button out of scope, it doesn't work
        var lbutton = document.createElement('button');
        lbutton.setAttribute('onclick', 'removeT(this)')
        lbutton.innerHTML = 'X';
        lbutton.setAttribute('class', 'popupChange button')
        var lbackgroundDiv = document.createElement('div');
        lbackgroundDiv.setAttribute('onclick', 'clickPane(this)')
        lbackgroundDiv.style = `position: absolute; width: 14ch; height: 15ch; padding: inherit;`;
        if (localStorage.getItem('localItems').split(',')[t].split('|')[2].includes('panetemp')) {
          allpanes.appendChild(lpane)
          lpane.appendChild(lbackgroundDiv)
          lpane.appendChild(lbutton)
          lpane.appendChild(ltitle)
          lpane.appendChild(ldescription)
        } else if (localStorage.getItem('localItems').split(',')[t].split('|')[2].includes('panenew')) {
          allpanes.appendChild(lpane)
          console.log(lbutton, lpane);
          lpane.appendChild(lbutton)
          lpane.appendChild(ltitle)
          lpane.appendChild(ldescription)
        }
      }
      break;
    case 'defaultoption':
      title.innerHTML = 'Unnamed pane';
      description.innerHTML = 'Do homework';
      allpanes.appendChild(pane)
      pane.appendChild(button)
      pane.appendChild(title)
      pane.appendChild(description)
      break;
    case 'defaulttemp':
      pane.setAttribute('class', 'panetemp popupChange pane')
      if (extraParam.includes('rounded')) {
        pane.style.borderRadius = '10px';
        button.style.borderRadius = '10px';
        button2.style.borderRadius = '10px';
      }
      allpanes.appendChild(pane)
      pane.appendChild(backgroundDiv)
      pane.appendChild(button)
      if (extraParam.includes('extend')) {
        pane.appendChild(button2)
      }
      pane.appendChild(title)
      pane.appendChild(description)
      break;
  }
  changeTopbar(document.getElementById('topcolor'))
  changeAllColors(document.getElementById('paneColor'))
  changeBackColor(document.getElementById('backColor'))
  changeFontColor(document.getElementById('textFontColor'))
  changeButtonColor(document.getElementById('buttonColor'))
  setBlurOn(document.getElementById('blurCheck'))
  roundC(document.getElementById('rounded'))
  streakEnable(document.getElementById('toggleStreak'))
  newFontFamily(document.getElementById('fonts'))
  changeFontSize(document.getElementById('textFontSize'))
  extendEnable(document.getElementById('toggleExtend'))
}

if (localStorage.getItem('localItems') == undefined || localStorage.getItem('localItems').split('|')[1] == 'undefined' || localStorage.getItem('localItems') == '') {
  if (localStorage.getItem('localExtendEnabled') == 'Off') {
    addPane('defaultoption', '')
  } else {
    addPane('defaultoption', 'extend')
  }
} else {
  if (localStorage.getItem('localExtendEnabled') == 'Off') {
    addPane('load', '')
  } else {
    addPane('load', 'extend')
  }
}

var allItems = [];

setInterval(function () {
  // Update the panes with how they are configured
  // checkConfig()
  // Push all pane text in one array with a format of Title|Description|config
  // Add oninput to all pane divs to trgiger a oninput
  for (var i = 0; i < items.length; i++) {
    allItems.push(`${items[i].getElementsByClassName('newp')[0].textContent}|${items[i].getElementsByClassName('newp')[1].innerText}|${items[i].className}`);
    // Push code before and `${items[i].getElementsByClassName('label')[0].textContent}`) so the format:
    // Unnamed pane|Description|important
  }
  localStorage.setItem('localItems', allItems)
  allItems = []
}, 1000)

function newItem(t) {
  if (t == '+') {
    if (document.getElementById('rounded').value == 'Off') {
      if (document.getElementById('toggleExtend').value == 'Off') {
        addPane('default', '')
      } else {
        addPane('default', 'extend')
      }
    } else {
      if (document.getElementById('toggleExtend').value == 'Off') {
        addPane('default', 'rounded')
      } else {
        addPane('default', 'rounded extend')
      }
    }
  } else if (t == 'temp') {
    if (document.getElementById('rounded').value == 'Off') {
      if (document.getElementById('toggleExtend').value == 'Off') {
        addPane('defaulttemp', '')
      } else {
        addPane('defaulttemp', 'extend')
      }
    } else {
      if (document.getElementById('toggleExtend').value == 'Off') {
        addPane('defaulttemp', 'rounded')
      } else {
        addPane('defaulttemp', 'rounded extend')
      }
    }
  }
}

function removeT(t) {
  t.parentElement.remove()
}

function popupAnim() {
  let t2 = document.getElementsByClassName('quietDown');
  for (var i = 0; i < t2.length; i++) {
    t2[i].style.mixBlendMode = 'multiply';
  }
  let t3 = document.getElementsByClassName('popupChange');
  for (var i = 0; i < t3.length; i++) {
    t3[i].style.mixBlendMode = 'luminosity';
  }
  if (mql.matches) {
    let t = 0;
    var myInterval = setInterval(function () {
      popup.style.bottom = `${10 - t}vw`;
      popup.style.visibility = 'visible';
      t += 0.8;
      if (t > 45) {
        clearInterval(myInterval)
      }
    }, 1)
  } else {
    let t = 0;
    let a = 500;
    var myInterval = setInterval(function () {
      popup.style.bottom = `${500 - t}px`;
      popup.style.visibility = 'visible';
      a--
      t += a * 0.05;
      if (t > 500) {
        clearInterval(myInterval)
      }
    }, 1)
  }
}

function popupClose() {
  let t2 = document.getElementsByClassName('quietDown');
  for (var i = 0; i < t2.length; i++) {
    t2[i].style.mixBlendMode = 'normal';
  }
  let t3 = document.getElementsByClassName('popupChange');
  for (var i = 0; i < t3.length; i++) {
    t3[i].style.mixBlendMode = 'normal';
  }
  document.getElementById('popup').style.visibility = 'hidden';
}

function changeTopbar(t) {
  document.getElementById('topbar').style.backgroundColor = t.value;
  localStorage.setItem('localTop', t.value)
}

function changeFontColor(t) {
  let t2 = document.querySelectorAll('div');
  for (var i = 0; i < t2.length; i++) {
    t2[i].style.color = t.value;
  }
  let t3 = document.getElementsByClassName('buttonClass');
  for (var i = 0; i < t3.length; i++) {
    t3[i].style.color = t.value;
  }
  localStorage.setItem('localFontColor', t.value)
}

function changeAllColors(t) {
  for (var i = 0; i < document.getElementsByClassName('pane').length; i++) {
    document.getElementsByClassName('pane')[i].style.backgroundColor = t.value;
  }
  localStorage.setItem('localPan', t.value)
}

function changeBackColor(t) {
  document.getElementsByTagName('body')[0].style.backgroundColor = t.value;
  localStorage.setItem('localBackground', t.value)
}

function changeButtonColor(t) {
  let buttons = document.getElementsByClassName('buttonClass');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = t.value;
  }
  localStorage.setItem('localButtonColor', t.value)
}

function setBlurOn(t) {
  if (t.value == 'On') {
    document.getElementById('popup').style.backdropFilter = 'blur(15px)';
    document.getElementById('dropdown-content').style.backdropFilter = 'blur(15px)';
  } else {
    document.getElementById('popup').style.backdropFilter = 'none';
    document.getElementById('dropdown-content').style.backdropFilter = 'none';
  }
  localStorage.setItem('localBlurCheck', t.value)
}

function roundC(t) {
  if (t.value == 'On') {
    document.getElementById('topbar').style.borderRadius = '0 0 10px 10px';
    document.getElementById('popup').style.borderRadius = '5px';
    document.getElementById('dropdown-content').style.borderRadius = '5px';
    for (var i = 0; i < document.getElementsByClassName('pane').length; i++) {
      document.getElementsByClassName('pane')[i].style.borderRadius = '10px';
    }
    for (var i2 = 0; i2 < document.getElementsByTagName('button').length; i2++) {
      document.getElementsByTagName('button')[i2].style.borderRadius = '10px';
    }
    for (var i3 = 0; i3 < document.getElementsByTagName('select').length; i3++) {
      document.getElementsByTagName('select')[i3].style.borderRadius = '10px';
    }
  } else {
    document.getElementById('topbar').style.borderRadius = '0';
    document.getElementById('popup').style.borderRadius = '0';
    document.getElementById('dropdown-content').style.borderRadius = '0';
    for (var i = 0; i < document.getElementsByClassName('pane').length; i++) {
      document.getElementsByClassName('pane')[i].style.borderRadius = '0';
    }
    for (var i2 = 0; i2 < document.getElementsByTagName('button').length; i2++) {
      document.getElementsByTagName('button')[i2].style.borderRadius = '0';
    }
    for (var i3 = 0; i3 < document.getElementsByTagName('select').length; i3++) {
      document.getElementsByTagName('select')[i3].style.borderRadius = '0';
    }
  }
  localStorage.setItem('localRoundedCheck', t.value)
}

function streakEnable(t) {
  if (t.value == 'Off') {
    document.getElementsByClassName('quietDown')[3].style.display = 'none';
    document.getElementsByClassName('quietDown')[4].style.display = 'none';
    document.getElementsByClassName('quietDown')[5].style.display = 'none';
  } else {
    document.getElementsByClassName('quietDown')[3].style.display = 'inline-block';
    document.getElementsByClassName('quietDown')[4].style.display = 'inline-block';
    document.getElementsByClassName('quietDown')[5].style.display = 'inline-block';
  }
  localStorage.setItem('localStreakEnabled', t.value)
}

function newFontFamily(t) {
  let t2 = document.querySelectorAll('div');
  for (var i = 0; i < t2.length; i++) {
    t2[i].style.fontFamily = t.value;
  }
  let t3 = document.getElementsByClassName('buttonClass');
  for (var i = 0; i < t3.length; i++) {
    t3[i].style.fontFamily = t.value;
  }
  localStorage.setItem('localFontFamily', t.value)
}

function extendEnable(t) {
  document.querySelectorAll('.button2').forEach(e => e.remove());
  if (t.value == 'On') {
    for (var i = 0; i < document.getElementsByClassName('pane').length; i++) {
      document.getElementById('rounded').value == 'On' ? document.getElementsByClassName('pane')[i].getElementsByTagName('button')[0].insertAdjacentHTML('afterend', `<button class="button2" style="border-radius: 10px;" onclick="extend(this)">^</button>`) : document.getElementsByClassName('pane')[i].getElementsByTagName('button')[0].insertAdjacentHTML('afterend', `<button class="button2" onclick="extend(this)">^</button>`);
    }
  }
  localStorage.setItem('localExtendEnabled', t.value)
}

// Consider making a function to automate

function changeFontSize(t) {
  document.getElementsByTagName('body')[0].style.fontSize = `${t.value}px`;
  localStorage.setItem('localFontSize', t.value)
}

function changePopupColor(t) {
  document.getElementById('popup').style.backgroundColor = `${t.value}`;
  document.getElementById('popup').style.opacity = '0.85';
  localStorage.setItem('localPopupColor', t.value)
}


changeTopbar(document.getElementById('topcolor'))
changeAllColors(document.getElementById('paneColor'))
changeBackColor(document.getElementById('backColor'))
changeFontColor(document.getElementById('textFontColor'))
changeButtonColor(document.getElementById('buttonColor'))
setBlurOn(document.getElementById('blurCheck'))
roundC(document.getElementById('rounded'))
streakEnable(document.getElementById('toggleStreak'))
newFontFamily(document.getElementById('fonts'))
changeFontSize(document.getElementById('textFontSize'))
extendEnable(document.getElementById('toggleExtend'))
changePopupColor(document.getElementById('popupColor'))

// Doesn't take rgb for some reason
function setPalette(top, panes, background, fontColor, buttons, popup) {
  document.getElementById('topcolor').value = top;
  document.getElementById('paneColor').value = panes;
  document.getElementById('backColor').value = background;
  document.getElementById('textFontColor').value = fontColor;
  document.getElementById('buttonColor').value = buttons;
  document.getElementById('popupColor').value = popup;
  changeTopbar(document.getElementById('topcolor'))
  changeAllColors(document.getElementById('paneColor'))
  changeBackColor(document.getElementById('backColor'))
  changeFontColor(document.getElementById('textFontColor'))
  changeButtonColor(document.getElementById('buttonColor'))
  changePopupColor(document.getElementById('popupColor'))
}

function paletteC(t) {
  if (t == "Default") {
    setPalette('#0c770c', '#c0c0c0', '#fcfcfc', 'black', '#d0d0d7', '#808080')
  }
  if (t == "Light") {
    setPalette('#D0D0D0', '#c0c0c0', '#b5b5b5', 'black', '#d0d0d7', '#808080')
  }
  if (t == "Dark") {
    setPalette('#040303', '#333333', '#171717', '#cea4a4', '#515151', '#484848')
  }
}

function addStreak() {
  setCookie('streak', parseInt(getCookie('streak')) + 1, 1)
  document.getElementById('streak').innerHTML = `Your streak: ${getCookie('streak')}🔥`;
}

function resetStreak() {
  setCookie('streak', '0', 1)
}

function extend(t) {
  var scrollHeight = t.parentElement.getElementsByTagName(textTag)[1].scrollHeight;
  var height = t.parentElement.clientHeight;
  var m = height;
  if (height < 120 + scrollHeight) {
    let newInterval = setInterval(function () {
      m += height / 50;
      t.parentElement.style.height = `${m}px`;
      if (260 + scrollHeight < height + m) {
        clearInterval(newInterval)
      }
    }, 1)
  } else {
    let newInterval = setInterval(function () {
      m -= height / 10;
      t.parentElement.style.height = `${m}px`;
      console.log(`height: ${height}, 260, scrollHeight: ${scrollHeight}, add ${260 + scrollHeight}`);
      if (m < 50 - scrollHeight) {
        clearInterval(newInterval)
      }
    }, 1)
  }
  // This means that 25 * 1 and 25 *2 matches scrollHeight
}

function clearData() {
  localStorage.clear()
  document.cookie = ''
  window.close()
}

function test(t) {
  console.log('t', t.scrollHeight, t.parentElement.clientHeight);
  if (t.scrollHeight >= t.parentElement.clientHeight) {
    t.parentElement.style.overflowY = 'auto'
  } else {
    t.parentElement.style.overflowY = 'visible'
  }
}

function longerPane(t) {
  console.log(t);
  if (document.getElementById('toggleExtend').value != 'On') {
    t.parentElement.style.height = 80 + t.scrollHeight + "px";
  }
}

function enableData() {
  data.style.display = 'none';
  localStorage.setItem('enableData', 'done')
}

function disableData() {
  // Give popup to decide if user wants to remove localstorage
  data.style.display = 'none';
  document.getElementById('toggleStreak').value = 'Off';
  streakEnable(document.getElementById('toggleStreak'))
  localStorage.setItem('enableData', 'done')
}

// Either this or take this for loop out so there is one main size that changes if you input

for (var i = 0; i < document.getElementsByClassName('pane').length; i++) {
  document.getElementsByClassName('pane')[i].style.height = 80 + document.getElementsByClassName('pane')[i].getElementsByClassName('newp')[1].scrollHeight + "px";
}