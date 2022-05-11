import { changeTopbar, changeAllColors, changeBackColor, changeFontColor, changeButtonColor, setBlurOn, roundC, newFontFamily, changeFontSize, extendEnable } from './styles.js'
import { streakEnable } from './script.js';

export var textTag = 'pre';
export const items = document.getElementsByClassName('pane');

function removeT(t) {
  t.parentElement.remove()
}

function extra(t) {
  console.log(t.parentElement);
  window.selectedPane = t.parentElement;
  // stop user from clicking other buttons
  document.getElementById('extraPopup').style.visibility = 'visible';
  document.getElementById('extraPopup').style.backgroundColor = 'rgb(128, 128, 128)';
  document.getElementById('extraPopup').style.opacity = '0.85';
  console.log(window.selectedPane.className.split(' ')[3]);
  for (var i = 0; i < document.getElementById('labels').children.length; i++) {
    if (document.getElementById('labels').children[i].checked == true) {
      document.getElementById('labels').children[i].checked = false
    }
  }
  document.getElementById(window.selectedPane.className.split(' ')[3]).checked = true;
}

export function longerPane(t) {
  var chose = null;
  console.log('done');
  if (t == t.parentElement.getElementsByClassName('newp')[1]) {
    chose = t.parentElement.getElementsByClassName('newp')[1];
  } else {
    console.log('test');
    chose = t.parentElement.getElementsByClassName('newp')[0];
  }
  if (document.getElementById('toggleExtend').value != 'On') {
    if (chose.scrollHeight < window.innerHeight) {
      console.log(t.parentElement.getElementsByClassName('newp')[1], 80 + chose.scrollHeight);
      t.parentElement.style.height = 80 + chose.scrollHeight + "px";
      console.log(t.parentElement);
    }
    if (chose == t.parentElement.getElementsByClassName('newp')[1]) {
      // If text is not longer than screen and it's higher than the minimum
      if (chose.scrollWidth < window.innerWidth && chose.scrollWidth > 120) {
        t.parentElement.style.width = chose.scrollWidth + 20 + "px";
      }
    }
  }
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

function clickPane(t) {
  let tc = t.parentElement.children;
  t.style.width = t.parentElement.style.width;
  t.style.height = t.parentElement.style.height;
  if (toggle == false) {
    for (var i = 0; i < tc.length; i++) {
      tc[i].style.opacity = '0.2';
    }
    t.style.backgroundImage = 'url("assets/drawing-11.svg")';
    t.style.backgroundSize = 'cover';
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

console.log(JSON.parse(localStorage.getItem('localItems')))
console.log(window.currentSection);

export var splitC = '·';

export function addPane(choice, extraParam) {
  // create function with all of this accept you can change the attributes
  console.log(localStorage, 'Oh...');
  var pane = document.createElement('div');
  pane.setAttribute('class', 'pane quietDown panenew')
  console.log(pane.className);
  // pane.style.backgroundColor = document.getElementById('paneColor');
  // Consider changing button innerHTML to textContext
  var button = document.createElement('button');
  button.addEventListener('click', function (e) {
    removeT(this)
  })
  button.innerHTML = 'X';
  button.setAttribute('class', 'button')
  var title = document.createElement(textTag);
  title.setAttribute('contenteditable', 'true')
  title.setAttribute('class', 'newp title')
  title.addEventListener('input', function (e) {
    longerPane(this)
  })
  title.innerHTML = 'Unnamed pane';
  title.style = 'margin-top: 0.5vw; margin-bottom: 1vw; text-align: center;';
  var description = document.createElement(textTag);
  description.setAttribute('contenteditable', 'true')
  description.addEventListener('input', function (e) {
    longerPane(this)
  })
  description.innerHTML = 'Description';
  description.setAttribute('class', 'newp description')
  var button2 = document.createElement('button');
  button2.addEventListener('click', function (e) {
    extend(this)
  })
  button2.setAttribute('class', 'button2')
  button2.innerHTML = '^';
  var other = document.createElement('button');
  other.addEventListener('click', function (e) {
    extra(this)
  })
  other.setAttribute('class', 'button3')
  other.innerHTML = '...';
  if (choice.includes('temp')) {
    var backgroundDiv = document.createElement('div');
    backgroundDiv.style = `position: absolute; width: 14ch; height: 15ch; padding: inherit;`;
    backgroundDiv.addEventListener('click', function (e) {
      clickPane(this)
    })
  }
  switch (choice) {
    case 'default':
      if (extraParam.includes('rounded')) {
        pane.style.borderRadius = '10px';
        button.style.borderRadius = '10px';
        button2.style.borderRadius = '10px';
        button3.style.borderRadius
      }
      allpanes.appendChild(pane)
      pane.appendChild(button)
      if (extraParam.includes('extend')) {
        pane.appendChild(button2)
      }
      pane.appendChild(other)
      pane.appendChild(title)
      pane.appendChild(description)
      break;
    case 'load':
      /*
      'Section1': {
    items: ['Unnamed pane|Do homework|pane quietDown newp', 'Unnamed pane|Do homework|pane quietDown newp'],
    // backgroundColor: blue
  },
  'Section2': {
    items: ['Pane|Do homework|pane quietDown newp', 'Pane|Do homework|pane quietDown newp'],
    // backgroundColor: blue
  }
      var localItems = Object.values(localStorage.getItem('localItems'))[0].split(',');
      for (var t = 0; t < localItems.length; t++) {
        // all code
      }
      */
      // It's not nessarcy to create new elements every loop as only some elements need to be recreated (the pre tags)
      /*
      var localItems = undefined;
      console.log(Object.values(JSON.parse(localStorage.getItem('localItems')))[0]);
      if (Object.values(JSON.parse(localStorage.getItem('localItems')))[0].includes(',')) {
        localItems = Object.values(JSON.parse(localStorage.getItem('localItems')))[0].split(',');
      } else {
        console.log(Object.values(JSON.parse(localStorage.getItem('localItems')))[0]);
        localItems = `${Object.values(JSON.parse(localStorage.getItem('localItems')))[0]},`.split(',').splice(0, 1);
      }
      */
      var localItems = JSON.parse(localStorage.getItem('localItems'));
      console.log(localItems, localItems[window.currentSection], window.currentSection);
      if (localItems[window.currentSection].includes(splitC)) {
        console.log('checkI@ii1ieji12eij', localItems[window.currentSection]);
        // .splice(0, localItems[window.currentSection].length - 1);
        localItems = localItems[window.currentSection].split(splitC)
        localItems.pop()
      } else {
        console.log(`${localItems[window.currentSection]},`, `${localItems[window.currentSection]},`.split(splitC), `${localItems[window.currentSection]},`.split(',').length - 1);
        localItems = `${localItems[window.currentSection]}${splitC}`.split(splitC).splice(0, `${localItems[window.currentSection]}${splitC}`.split(splitC).length - 1);
      }
      console.log('itemS', localItems);
      for (var t = 0; t < localItems.length; t++) {
        // Unnamed pane|Description|important^
        var lpane = document.createElement('div');
        lpane.setAttribute('class', `${localItems[t].split('|')[2]}`)
        console.log(`${localItems}`);
        var ltitle = document.createElement(textTag);
        ltitle.setAttribute('contenteditable', 'true')
        ltitle.setAttribute('class', 'newp popupChange title')
        ltitle.innerHTML = `${localItems[t].split('|')[0]}`;
        ltitle.style = 'margin-top: 0.5vw; margin-bottom: 1vw;';
        ltitle.addEventListener('input', function (e) {
          longerPane(this)
        })
        var ldescription = document.createElement(textTag);
        ldescription.setAttribute('contenteditable', 'true')
        ldescription.addEventListener('input', function (e) {
          longerPane(this)
        })
        ldescription.innerHTML = `${localItems[t].split('|')[1]}`;
        ldescription.setAttribute('class', 'newp popupChange description')
        // for some reason when moving button out of scope, it doesn't work
        var lbutton = document.createElement('button');
        lbutton.addEventListener('click', function (e) {
          removeT(this)
        })
        lbutton.innerHTML = 'X';
        lbutton.setAttribute('class', 'popupChange button')
        var lbackgroundDiv = document.createElement('div');
        lbackgroundDiv.addEventListener('click', function (e) {
          clickPane(this)
        })
        lbackgroundDiv.style = `position: absolute; width: 14ch; height: 15ch; padding: inherit;`;
        var lother = document.createElement('button');
        lother.addEventListener('click', function (e) {
          extra(this)
        })
        lother.setAttribute('class', 'button3')
        lother.innerHTML = '...';
        var label = document.createElement('span');
        label.style = `position: relative; background-color: rgb(0, 255, 251);
        padding: 1ch;
        border-radius: 10px; margin: 0; font-size: 1.2ch; user-select: none;`;
        label.innerHTML = localItems[t].split('|')[2].split(' ')[3];
        label.setAttribute('class', `${localItems[t].split('|')[2].split(' ')[3]}C`)
        console.log('local', localItems);
        if (localItems[t].split('|')[2].includes('panetemp')) {
          allpanes.appendChild(lpane)
          lpane.appendChild(lbackgroundDiv)
          console.log(localItems[t].split('|')[2].split(' '));
          if (localItems[t].split('|')[2].split(' ')[3] != undefined && localItems[t].split('|')[2].split(' ')[3] != 'none') {
            lpane.appendChild(label)
          }
          lpane.appendChild(lbutton)
          lpane.appendChild(lother)
          lpane.appendChild(ltitle)
          lpane.appendChild(ldescription)
        } else if (localItems[t].split('|')[2].includes('panenew')) {
          allpanes.appendChild(lpane)
          console.log(localItems[t].split('|')[2].split(' '));
          if (localItems[t].split('|')[2].split(' ')[3] != undefined && localItems[t].split('|')[2].split(' ')[3] != 'none') {
            lpane.appendChild(label)
          }
          console.log(lbutton, lpane);
          lpane.appendChild(lbutton)
          lpane.appendChild(lother)
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