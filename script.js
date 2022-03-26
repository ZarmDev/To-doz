import {changeTopbar, changeFontColor, changeAllColors, changeBackColor, changeButtonColor, setBlurOn, roundC, newFontFamily, extendEnable, changeFontSize, changePopupColor, themeEnable, popupAnim, popupClose, toggleSidebar} from './styles.js'
import {addPane, textTag, items, longerPane} from './storage.js'

console.log(localStorage.getItem('localItems'));

const allpanes = document.getElementById('allpanes');
const popup = document.getElementById('popup');
const data = document.getElementById('data');

const item = document.createElement('div');

const sidebar = document.getElementById('sidebar');
const sidebarlist = document.getElementById('sidebarlist');

// Mobile popup

export let mql = window.matchMedia('(max-width: 760px)');
//rgb(153 153 153 / 70%)
if (mql.matches && localStorage.getItem('localMobile') == undefined) {
  localStorage.setItem('localMobile', 'done')
  document.getElementById('mobile').style.visibility = 'visible';
  document.getElementById('title').style.marginLeft = '5%';
}

// Show enable/disable localstorage popup

if (localStorage.getItem('enableData') == undefined) {
  document.getElementById('data').style.display = 'inline-block';
}


// Optimize amount of panes on screen depending on screen
if (mql.matches) {
  document.getElementById('allpanes').style.gridTemplateColumns = '1fr 1fr 1fr';
  popup.style.width = '130%';
  document.getElementById('topbar').style.width = '130%';
}

// Credit to w3schools for help with cookie code

// setCookie

function setCookie(cname, cvalue, days) {
  document.cookie = ''
  var d = new Date();
  console.log(d);
  d.setDate(d.getDate() + days)
  console.log(d);
  d.setHours(23)
  console.log(d);
  // d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d;
  console.log(expires);
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// getCookie

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

// Check if streak exists, if so, set the text on screen

function checkCookie() {
  let user = getCookie("streak");
  if (user != "") {
    document.getElementById('streak').innerHTML = `Your streak: ${user}🔥`;
  } else {
    setCookie('streak', '0', 1)
    document.getElementById('streak').innerHTML = `Your streak: 0🔥`;
  }
}

// Check by default

checkCookie('streak')

// Check if goal exists

if (localStorage.getItem('localGoal') == undefined) {
  localStorage.setItem('localGoal', '0')
}
if (localStorage.getItem('localGoal') == localStorage.getItem('localStreak')) {
  // TODO: POPUP
}

document.getElementById('goal').innerHTML = `Goal: ${localStorage.getItem('localGoal')} days`;

// This is to get all the settings options
// getData(id, localStorageKey, default)

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
getData('theme', 'localThemeEnabled', 'Off')

// Shorthand for eventlistener

function e(id, event, func) {
  document.getElementById(id).addEventListener(event, func)
}

// Must be used as you can't use onclick="" in the HTML

e('sidebarToggle', 'click', toggleSidebar)
e('addSection', 'click', addSection)
e('exitMobile', 'click', function () {this.parentElement.style.visibility = 'hidden'})
e('exitExtraPopup', 'click', extraPopupClose)
e('exitPopup', 'click', popupClose)
e('themeSelect', 'change', paletteC)
e('popupToggle', 'click', popupAnim)
e('topcolor', 'change', function (e) {
  changeTopbar(this)
})
e('paneColor', 'change', function (e) {
  changeAllColors(this)
})
e('backColor', 'change', function (e) {
  changeBackColor(this)
})
e('buttonColor', 'change', function (e) {
  changeButtonColor(this)
})
e('popupColor', 'change', function (e) {
  changePopupColor(this)
})
e('blurCheck', 'change', function (e) {
  setBlurOn(this)
})
e('rounded', 'change', function (e) {
  roundC(this)
})
e('toggleExtend', 'change', function (e) {
  extendEnable(this)
})
e('toggleStreak', 'change', function (e) {
  streakEnable(this)
})
e('theme', 'change', function (e) {
  themeEnable(this)
})
e('submitLocal', 'click', submitLocalStorage)
e('getLocal', 'click', getLocalStorage)
e('getLocal', 'mouseout', changeBack)
e('resetStreak', 'click', resetStreak)
e('clearData', 'click', clearData)
e('fonts', 'change', function (e) {
  newFontFamily(this)
})
e('textFontColor', 'change', function (e) {
  changeFontColor(this)
})
e('textFontSize', 'change', function (e) {
  changeFontSize(this)
})
e('newItem', 'click', function () {
  newItem('+')
})
e('newItemTemp', 'click', function () {
  newItem('temp')
})
e('addToStreak', 'click', addStreak)
e('enable', 'click', enableData)
e('disable', 'click', disableData)
e('submitGoal', 'click', submitGoal)

// Toggle used throughout code, if you happen to use toggle, please name it toggle# based
// on amount of toggle variables

var toggle = false;

// Check if all your panes was ever created

if (localStorage.getItem('localItems') == undefined || localStorage.getItem('localItems').split('|')[1] == 'undefined' || localStorage.getItem('localItems') == '') {
  // Get the first section and set to the currentSection you are on
  window.currentSection = Object.keys(JSON.parse(localStorage.getItem('localItems')))[0];
  // Check if you enabled extend
  if (localStorage.getItem('localExtendEnabled') == 'Off') {
    addPane('defaultoption', '')
  } else {
    addPane('defaultoption', 'extend')
  }
} else {
  // Set to first section
  window.currentSection = Object.keys(JSON.parse(localStorage.getItem('localItems')))[0];
  if (localStorage.getItem('localExtendEnabled') == 'Off') {
    addPane('load', '')
  } else {
    addPane('load', 'extend')
  }
}

console.log(Object.keys(JSON.parse(localStorage.getItem('localItems'))));

// Using JSON because it's easy to read and happened to solve my problems

var parsedJSON = Object.keys(JSON.parse(localStorage.getItem('localItems')));

function switchSection(t, e) {
  console.log('ch');
  e.stopPropagation()
  for (var i10 = 0; i10 < document.getElementsByClassName('pane').length; i10++) {
    document.getElementsByClassName('pane')[i10].remove()
  }
  window.currentSection = t.innerText.slice(0, t.innerText.length - 3);
  if (JSON.parse(localStorage.getItem('localItems'))[window.currentSection] == '') {
    var newLocal = JSON.parse(localStorage.getItem('localItems'));
    newLocal[window.currentSection] = 'Unnamed pane|Do homework|pane quietDown panenew';
    localStorage.setItem('localItems', JSON.stringify(newLocal))
  }
  console.log('switchSection called', window.currentSection, JSON.parse(localStorage.getItem('localItems')));
  addPane('load', '')
}

// Rename section

function sectionItemRename(t, e) {
  // Causes only the button clicked to be fired, not buttons behind it
  e.stopPropagation()
  // Create seperate variable to edit all panes
  var renameSection = JSON.parse(localStorage.getItem('localItems'));
  var newName = prompt('Section name:');
  // Create new key in localItems and set it to the data found in your currentSection
  // Would it be better to use window.currentSection instead of t.parentElement.innerText?
  renameSection[newName] = renameSection[t.parentElement.innerText.slice(0, t.parentElement.innerText.length - 3)];
  delete renameSection[window.currentSection]
  window.currentSection = newName;
  // Set the localstorage
  localStorage.setItem('localItems', JSON.stringify(renameSection))
  // Remove all children
  while (document.getElementById('sidebarlist').lastChild) {
    console.log(sidebarlist.lastChild);
    sidebarlist.removeChild(sidebarlist.lastChild)
  }
  let parsedJSON = Object.keys(JSON.parse(localStorage.getItem('localItems')));
  console.log('PARSED', parsedJSON)
  // Add all children
  for (var i9 = 0; i9 < parsedJSON.length; i9++) {
    var sectionItem = document.createElement('button');
    // Get section number by i9
    sectionItem.innerHTML = parsedJSON[i9];
    sectionItem.addEventListener('click', function (e) {
      switchSection(this, e)
    })
    var sectionItemDel = document.createElement('button');
    sectionItemDel.innerHTML = 'X';
    sectionItemDel.addEventListener('click', function (e) {
      sectionItemDelete(this, e)
    })
    var sectionItemRe = document.createElement('button');
    sectionItemRe.innerHTML = '✏️';
    sectionItemRe.addEventListener('click', function (e) {
      sectionItemRename(this, e)
    })
    sectionItem.appendChild(sectionItemRe)
    sectionItem.appendChild(sectionItemDel)
    sidebarlist.appendChild(sectionItem)
    console.log('meow', Object.keys(JSON.parse(localStorage.getItem('localItems')))[i9]);
  }
}

function sectionItemDelete(t, e) {
  console.log(e);
  // Don't trigger button behind button clicked
  e.stopPropagation()
  var deleteSection = JSON.parse(localStorage.getItem('localItems'));
  console.log(t.parentElement.innerText);
  console.log(t.parentElement.innerText.slice(0, t.parentElement.innerText.length - 3));
  // Remove section
  delete deleteSection[t.parentElement.innerText.slice(0, t.parentElement.innerText.length - 3)]
  console.log(deleteSection);
  // Set new section
  window.currentSection = Object.keys(deleteSection)[0];
  localStorage.setItem('localItems', JSON.stringify(deleteSection))
  // Remove sections
  while (document.getElementById('sidebarlist').lastChild) {
    console.log(sidebarlist.lastChild);
    sidebarlist.removeChild(sidebarlist.lastChild)
  }
  let parsedJSON = Object.keys(JSON.parse(localStorage.getItem('localItems')));
  // Put sections back
  for (var i9 = 0; i9 < parsedJSON.length; i9++) {
    var sectionItem = document.createElement('button');
    sectionItem.innerHTML = parsedJSON[i9];
    sectionItem.addEventListener('click', function (e) {
      switchSection(this, e)
    })
    var sectionItemDel = document.createElement('button');
    sectionItemDel.innerHTML = 'X';
    sectionItemDel.addEventListener('click', function (e) {
      sectionItemDelete(this, e)
    })
    var sectionItemRe = document.createElement('button');
    sectionItemRe.innerHTML = '✏️';
    sectionItemRe.addEventListener('click', function (e) {
      sectionItemRename(this, e)
    })
    sectionItem.appendChild(sectionItemRe)
    sectionItem.appendChild(sectionItemDel)
    sidebarlist.appendChild(sectionItem)
    console.log('meow', Object.keys(JSON.parse(localStorage.getItem('localItems')))[i9]);
  }
}

function addSection() {
  // Random number
  let randNum = Math.floor(Math.random() * 20);
  var sidebaritem = document.createElement('button');
  // Unnamed section + random number
  sidebaritem.textContent = `Unnamed section${randNum}`;
  // Switch section
  sidebaritem.addEventListener('click', function (e) {
    switchSection(this, e)
  })
  // Delete
  var sidebardrop = document.createElement('button');
  sidebardrop.innerText = 'X';
  sidebardrop.addEventListener('click', function (e) {
    sectionItemDelete(this, e)
  })
  // Rename
  var sidebarre = document.createElement('button');
  sidebarre.innerHTML = '✏️';
  sidebarre.addEventListener('click', function (e) {
    sectionItemRename(this, e)
  })
  sidebaritem.appendChild(sidebarre)
  sidebaritem.appendChild(sidebardrop)
  sidebarlist.appendChild(sidebaritem)
  sidebarlist.insertAdjacentHTML('beforeend', '<br>')
  var localObj = JSON.parse(localStorage.getItem('localItems'));
  // Replace/add section
  localObj[`Unnamed section${randNum}`] = ['Unnamed pane|Do homework|pane quietDown panenew'];
  console.log(localObj);
  localStorage.setItem('localItems', JSON.stringify(localObj))
  console.log('OBJECT', localStorage.getItem('localItems'));
}

// Add sections

for (var i9 = 0; i9 < parsedJSON.length; i9++) {
  var sectionItem = document.createElement('button');
  sectionItem.innerHTML = parsedJSON[i9];
  sectionItem.addEventListener('click', function (e) {
    switchSection(this, e)
  })
  var sectionItemDel = document.createElement('button');
  sectionItemDel.innerHTML = 'X';
  sectionItemDel.addEventListener('click', function (e) {
    sectionItemDelete(this, e)
  })
  var sectionItemRe = document.createElement('button');
  sectionItemRe.innerHTML = '✏️';
  sectionItemRe.addEventListener('click', function (e) {
    sectionItemRename(this, e)
  })
  sectionItem.appendChild(sectionItemRe)
  sectionItem.appendChild(sectionItemDel)
  sidebarlist.appendChild(sectionItem)
  console.log('meow', Object.keys(JSON.parse(localStorage.getItem('localItems')))[i9]);
}

var allItems = [];

var saveItems = setInterval(function () {
  // Update the panes with how they are configured
  // checkConfig()
  // Push all pane text in one array with a format of Title|Description|config
  // Add oninput to all pane divs to trgiger a oninput
  for (var i = 0; i < items.length; i++) {
    // Get all newp in each pane, newp[0] is title, newp[1] is description
    allItems.push(`${items[i].getElementsByClassName('newp')[0].innerText}|${items[i].getElementsByClassName('newp')[1].innerText}|${items[i].className}`);
    // Push code so it's:
    // Unnamed pane|Description|important
  }
  /*
  Section1: {
    Unnamed pane: 'Do homework|pane quietDown newp'
    Unnamed pane: 'Do homework|pane quietDown newp'
  }
  Section2: {
    Unnamed pane: 'Do homework|pane quietDown newp'
    Unnamed pane: 'Do homework|pane quietDown newp'
  }
  */
  var itemObj = JSON.parse(localStorage.getItem('localItems'));
  // set section in localstorage to the array of panes
  itemObj[window.currentSection] = allItems;
  localStorage.setItem('localItems', JSON.stringify(itemObj))
  allItems = []
}, 1000)

function newItem(t) {
  // Add default pane
  if (t == '+') {
    if (document.getElementById('rounded').value == 'Off') {
      // Check if extend is on
      if (document.getElementById('toggleExtend').value == 'Off') {
        // addPane(typeOfPane, styles)
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
    // Add temporary pane
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


export function streakEnable(t) {
  // Check if streak is enabled
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

function submitLocalStorage() {
  clearInterval(saveItems)
  console.log(document.getElementById('enterlocal').value);
  // Set localitems to value given
  localStorage.setItem('localItems', document.getElementById('enterlocal').value)
  alert(`Please open the page again to see results DEBUG: ${localStorage.getItem('localItems')}`)
}

// Set goal

function submitGoal() {
  console.log('test');
  localStorage.setItem('localGoal', document.getElementById('enterGoal').value)
  document.getElementById('goal').innerHTML = `Goal: ${localStorage.getItem('localGoal')} days`;
}

let copy = document.getElementById('copy');

// For copying localStorage

function changeBack() {
  copy.innerText = 'Copy'
}

// Thank you w3schools

function getLocalStorage() {
  if (copy.innerText == 'Copy') {
    copy.innerText = 'Copied'
  }
  document.getElementById('localItemsStorage').value = localStorage.getItem('localItems').replace(/\n/g, "<br>")
  // Select text
  document.getElementById('localItemsStorage').select();
  document.getElementById('localItemsStorage').setSelectionRange(0, 99999); /* For mobile devices */
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(document.getElementById('localItemsStorage').value);
}

// Check all the styles

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
themeEnable(document.getElementById('theme'))

// Doesn't take rgb for some reason
function setPalette(top, panes, background, fontColor, buttons, popup) {
  console.log(arguments);
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

function paletteC() {
  if (this.value == "Default") {
    setPalette('#0c770c', '#c0c0c0', '#fcfcfc', '#000000', '#d0d0d7', '#808080')
  }
  if (this.value == "Light") {
    setPalette('#D0D0D0', '#c0c0c0', '#b5b5b5', '#000000', '#d0d0d7', '#808080')
  }
  if (this.value == "Dark") {
    setPalette('#040303', '#333333', '#171717', '#cea4a4', '#515151', '#484848')
  }
}

function addStreak() {
  let date = new Date();
  if (localStorage.getItem('oldDate') == undefined) {
    // set oldDate to currentDate
    localStorage.setItem('oldDate', date.toDateString())
    console.log('streak', parseInt(getCookie('streak')) + 1, 1);
    // set cookie to expire next day
    setCookie('streak', parseInt(getCookie('streak')) + 1, 1)
    // update streak
    document.getElementById('streak').innerHTML = `Your streak: ${getCookie('streak')}🔥`;
    // if last time streak added is not today (so you didn't add to the streak twice in a day)
  } else if (localStorage.getItem('oldDate') != date.toDateString()) {
    // set streak to next day
    setCookie('streak', parseInt(getCookie('streak')) + 1, 1)
    // update streak on page
    document.getElementById('streak').innerHTML = `Your streak: ${getCookie('streak')}🔥`;
  }
}

function resetStreak() {
  setCookie('streak', '0', 1)
}

// Clear localStorage and cookies

function clearData() {
  clearInterval(saveItems)
  localStorage.clear()
  document.cookie = ''
}

// Allow for data to be used

function enableData() {
  data.style.display = 'none';
  localStorage.setItem('enableData', 'done')
}

// Disable data

function disableData() {
  // Give popup to decide if user wants to remove localstorage
  data.style.display = 'none';
  document.getElementById('toggleStreak').value = 'Off';
  streakEnable(document.getElementById('toggleStreak'))
  localStorage.setItem('enableData', 'done')
}

window.onload = function () {
  for (var t = 0; t < items.length; t++) {
    longerPane(items[t].getElementsByClassName('newp')[0])
    longerPane(items[t].getElementsByClassName('newp')[1])
  }
}

function extraPopupClose() {
  document.getElementById('extraPopup').style.visibility = 'hidden';
}

(async () => {
  // create and show the notification
  const showNotification = () => {
    // create a new notification
    const notification = new Notification('Remember to do your to-do list', {
      body: 'Your important to-dos: none found',
    });

    // close the notification after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10 * 1000);

    // navigate to a URL when clicked
    notification.addEventListener('click', () => {

      alert(`Let's start practicing`)
    });
  }

  // check notification permission
  let granted = false;

  if (Notification.permission === 'granted') {
    granted = true;
  } else if (Notification.permission !== 'denied') {
    let permission = await Notification.requestPermission();
    granted = permission === 'granted' ? true : false;
  }

  // show notification or error
  granted ? showNotification() : showError();

})();