/*
Credits:
https://stackoverflow.com/question/is-there-a-way-to-get-a-textarea-to-stretch-to-fit-its-content-without-using-php
https://stackoverflow.com/questions/25305719/change-css-for-all-elements-from-js
https://github.com/jsjoeio/use-streak/blob/main/src/lib.ts
https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance
https://www.w3schools.com/js/js_cookies.asp
https://stackoverflow.com/questions/10842471/how-to-remove-all-elements-of-a-certain-class-from-the-dom
https://stackoverflow.com/questions/9330671/add-linebreak-to-textcontent-or-innertext-only-in-chrome
https://www.w3schools.com/Css/css_dropdowns.asp
*/

/*
Bugs/features:

- User added comma could interfere with split

After testing the below doesn't work...
- User can inject code because of use of innerHTML

Include selects when changing button background colors

If the website can be restored with crtl+t the next day, would the website have the same date and data? (not be reloaded)

Would that mean that in addStreak() the streak should be checked again?

Consider making better animations. lol

When too much text is in pane, add a width and background color to pane that mimics the pane and change it depending on scrollHeight

A note:

There also has to be a localstorage/cookie to check if streak was added to because then they can add as much times in one day

When allItems is saved to localStorage, replace ',' with another letter and when it's loaded, split by that letter
This lets users add commas in their panes

Tested next month, doesn't work need to change system

Add popup for Firefox users to disable protection settings for the streak

When newItem is added, buttons aren't rounded

Automatically extend when scrollHeight exceeds 300

Widgets:

Calender

Reminder

Time

Add pane in specific positions

Sometimes cookie expiration date is set two days after

Extra text is made into divs and disapear because first time they are SAVED as divs second time they are ADDED as divs and third they are not added because they are seperate to p as div

Add labels for importance/colors
*/
/*
// Temporary way of asking user

var check = prompt('Answer with y/n: Do you allow cookies and localstorage? (To save your streak and all the customizations)');

if (check != 'y') {
  close(window)
}

if (check == '' || check == null)  {
  close(window)
}

When blue button is pressed twice, make size of pane back to original

New way to store 'Unnamed pane|Description|labels: important*due|||'

The ||| is just empty configs so when you refer to a config you can just use a specific index

Reward system:

Streak of 50 - Yay (button)

When yay pressed give confetti and popup with a reward if the user adds rewards for example breaks

Popup to show due today

Filter panes

On topbar have button that shows all your due stuff
*/
const allpanes = document.getElementById('allpanes');
const popup = document.getElementById('popup');
const data = document.getElementById('data');

const item = document.createElement('div');

const items = document.getElementsByClassName('pane');

let mql = window.matchMedia('(max-width: 760px)');

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

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  console.log(d);
  d.setDate(d.getDate() + exdays)
  console.log(d);
  d.setUTCHours(23, 59, 59, 999);
  console.log(d);
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

var textTag = 'pre';

function addPane(choice, extraParam) {
  var pane = document.createElement('div');
  pane.setAttribute('class', 'pane quietDown')
  var button = document.createElement('button');
  button.setAttribute('onclick', 'removeT(this)')
  button.innerHTML = 'X';
  var title = document.createElement(textTag);
  title.setAttribute('contenteditable', 'true')
  title.setAttribute('class', 'new+')
  title.innerHTML = 'Unnamed pane';
  var description = document.createElement(textTag);
  description.setAttribute('contenteditable', 'true')
  description.setAttribute('oninput', 'longerPane(this)')
  description.innerHTML = 'Description';
  description.setAttribute('class', 'new+')

  if (choice == 'default') {
    allpanes.appendChild(pane)
    pane.appendChild(button)
    if (extraParam.includes('extend')) {
      var button2 = document.createElement('button');
      button2.setAttribute('onclick', 'extend(this)')
      button2.setAttribute('class', 'button2')
      button2.innerHTML = '^';
      pane.appendChild(button2)
    }
    if (extraParam.includes('rounded')) {
      pane.style.borderRadius = '10px';
      button.style.borderRadius = '10px';
    }
    pane.appendChild(title)
    pane.appendChild(description)
  } else if (choice == 'load') {
    console.log(localStorage);
    for (var t = 0; t < localStorage.getItem('localItems').split(',').length; t++) {
      var lpane = document.createElement('div');
      lpane.setAttribute('class', 'pane quietDown')
      var lbutton = document.createElement('button');
      lbutton.setAttribute('onclick', 'removeT(this)')
      lbutton.innerHTML = 'X';
      var ltitle = document.createElement(textTag);
      ltitle.setAttribute('contenteditable', 'true')
      ltitle.setAttribute('class', 'new+')
      ltitle.innerHTML = `${localStorage.getItem('localItems').split(',')[t].split('|')[0]}`;
      var ldescription = document.createElement(textTag);
      ldescription.setAttribute('contenteditable', 'true')
      ldescription.setAttribute('oninput', 'longerPane(this)')
      ldescription.innerHTML = `${localStorage.getItem('localItems').split(',')[t].split('|')[1]}`;
      ldescription.setAttribute('class', 'new+')
      allpanes.appendChild(lpane)
      lpane.appendChild(lbutton)
      lpane.appendChild(ltitle)
      lpane.appendChild(ldescription)
    }
  } else if (choice == 'defaultoption') {
    title.innerHTML = 'Unnamed pane';
    description.innerHTML = 'Do homework';
    allpanes.appendChild(pane)
    pane.appendChild(button)
    pane.appendChild(title)
    pane.appendChild(description)
  }
}

if (localStorage.getItem('localItems') == undefined || localStorage.getItem('localItems').split('|')[1] == 'undefined' || localStorage.getItem('localItems') == '') {
  if (localStorage.getItem('localExtendEnabled') == 'Off') {
    addPane('defaultoption', null)
  } else {
    addPane('defaultoption', 'extend')
  }
} else {
  if (localStorage.getItem('localExtendEnabled') == 'Off') {
    addPane('load', null)
  } else {
    addPane('load', 'extend')
  }
}

var allItems = [];

setInterval(function () {
  // Update the panes with how they are configured
  // checkConfig()
  // Push all pane text in one array with a format of Title|Description|config
  for (var i = 0; i < items.length; i++) {
    console.log(`${items[i].getElementsByClassName('new+')}|${items[i].getElementsByClassName('new+')[1].innerText}`);
    allItems.push(`${items[i].getElementsByClassName('new+')[0].textContent}|${items[i].getElementsByClassName('new+')[1].innerText}`);
  }
  localStorage.setItem('localItems', allItems)
  allItems = []
}, 1000)

function newItem(t) {
  if (t == '+') {
    if (document.getElementById('rounded').value == 'Off') {
      if (document.getElementById('toggleExtend').value == 'Off') {
        addPane('default', null)
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
  }
}

function removeT(t) {
  t.parentElement.remove()
}

function popupAnim() {
  let t2 = document.getElementsByClassName('quietDown');
  for (var i = 0; i < t2.length; i++) {
    t2[i].style.color = 'rgba(128, 128, 128, 0.534)';
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
    t2[i].style.color = document.getElementById('textFontColor').value;
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
  } else {
    document.getElementById('popup').style.backdropFilter = 'none';
  }
  localStorage.setItem('localBlurCheck', t.value)
}

function roundC(t) {
  if (t.value == 'On') {
    document.getElementById('topbar').style.borderRadius = '0 0 10px 10px';
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
  console.log(t, t.value);
  console.log(document.getElementsByClassName('button2'), document.getElementsByClassName('button2').length);
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

// Doesn't take rgb for some reason
function setPalette(top, panes, background, fontColor, buttons) {
  document.getElementById('topcolor').value = top;
  document.getElementById('paneColor').value = panes;
  document.getElementById('backColor').value = background;
  document.getElementById('textFontColor').value = fontColor;
  document.getElementById('buttonColor').value = buttons;
  changeTopbar(document.getElementById('topcolor'))
  changeAllColors(document.getElementById('paneColor'))
  changeBackColor(document.getElementById('backColor'))
  changeFontColor(document.getElementById('textFontColor'))
  changeButtonColor(document.getElementById('buttonColor'))
}

function paletteC(t) {
  if (t == "Default") {
    setPalette('#0c770c', '#c0c0c0', '#fcfcfc', 'black', '#d0d0d7')
  }
  if (t == "Light") {
    setPalette('#D0D0D0', '#c0c0c0', '#b5b5b5', 'black', '#d0d0d7')
  }
  if (t == "Dark") {
    setPalette('#040303', '#333333', '#171717', '#cea4a4', '#515151')
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
      m += height / 10;
      t.parentElement.style.height = `${m}px`;
      if (260 + scrollHeight < height + m) {
        clearInterval(newInterval)
      }
    }, 1)
  } else {
    let newInterval = setInterval(function () {
      m -= 8;
      t.parentElement.style.height = `${m}px`;
      console.log(`height: ${height}, 260, scrollHeight: ${scrollHeight}, add ${260 + scrollHeight}`);
      if (m < 230 - scrollHeight) {
        clearInterval(newInterval)
      }
    }, 1)
  }
  // This means that 25 * 1 and 25 *2 matches scrollHeight
}

function clearData() {
  localStorage.clear()
  document.cookie = ''
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