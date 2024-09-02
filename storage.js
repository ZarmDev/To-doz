import { changeTopbar, changeAllColors, changeBackColor, changeFontColor, changeButtonColor, setBlurOn, roundC, newFontFamily, changeFontSize, extendEnable } from './styles.js'
import { streakEnable } from './script.js';

export var textTag = 'pre';
export const items = document.getElementsByClassName('pane');
const localStorageKey = "lItems"

function removeT(t) {
  t.parentElement.remove()
}

function extra(t) {
  window.selectedPane = t.parentElement;
  // stop user from clicking other buttons
  document.getElementById('extraPopup').style.visibility = 'visible';
  for (var i = 0; i < document.getElementById('labels').children.length; i++) {
    if (document.getElementById('labels').children[i].checked == true) {
      document.getElementById('labels').children[i].checked = false
    }
  }
  document.getElementById(window.selectedPane.className.split(' ')[3]).checked = true;
}

export function longerPane(t) {
  if (t.parentElement.className.includes('panelist'))
  var chose = null;
  if (t == t.parentElement.getElementsByClassName('newp')[1]) {
    chose = t.parentElement.getElementsByClassName('newp')[1];
  } else {
    chose = t.parentElement.getElementsByClassName('newp')[0];
  }
  if (document.getElementById('toggleExtend').value != 'On') {
    if (chose.scrollHeight < window.innerHeight) {
      t.parentElement.style.height = 80 + chose.scrollHeight + "px";
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
      if (m < 50 - scrollHeight) {
        clearInterval(newInterval)
      }
    }, 1)
  }
  // This means that 25 * 1 and 25 *2 matches scrollHeight
}

function clickPane(t) {
  let tc = t.parentElement.children;
  for (var i = 0; i < tc.length; i++) {
    tc[i].style.opacity = '0.2';
  }
  t.className = 'paneToggled';
  //t.style.backgroundImage = 'url("assets/drawing-11.svg")';
  //t.style.backgroundSize = 'cover';
  /*
  let tc = t.parentElement.children;
  if (toggle == false) {
    for (var i = 0; i < tc.length; i++) {
      tc[i].style.opacity = '1';
    }
    t.style.backgroundImage = 'none';
  }
  */
}

function ListAdd(t) {
  var listItem = document.createElement('p');
  listItem.innerHTML = '<p></p>';
  listItem.className = 'listItem';
  listItem.contentEditable = 'true';
  var listButton = document.createElement('button');
  listButton.innerHTML = 'X';
  listButton.contentEditable = 'false';
  listButton.addEventListener('click', function (e) {
    removeT(listButton)
  })
  listButton.className = 'listButton';
  listItem.appendChild(listButton)
  t.parentElement.appendChild(listItem)
}

export var splitC = '·';

export function addPane(choice, extraParam) {
  // create function with all of this accept you can change the attributes
  var pane = document.createElement('div');
  pane.setAttribute('class', 'pane quietDown panenew')
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
  title.addEventListener('input', function () {
    longerPane(this)
  })
  title.innerHTML = 'Unnamed pane';
  title.style = 'margin-top: 0.5vw; margin-bottom: 1vw; text-align: center;';
  var description = document.createElement(textTag);
  description.setAttribute('contenteditable', 'true')
  description.addEventListener('input', function () {
    longerPane(this)
  })
  description.innerHTML = 'Description';
  description.setAttribute('class', 'newp description')
  var button2 = document.createElement('button');
  button2.addEventListener('click', function () {
    extend(this)
  })
  button2.setAttribute('class', 'button2')
  button2.innerHTML = '^';
  var other = document.createElement('button');
  other.addEventListener('click', function () {
    extra(this)
  })
  other.setAttribute('class', 'button3')
  other.innerHTML = '...';
  var backgroundDiv = undefined;
  if (choice.includes('temp')) {
    backgroundDiv = document.createElement('div');
    backgroundDiv.style = `position: absolute; width: 100%; height: 100%; padding: inherit;`;
    backgroundDiv.addEventListener('click', function (e) {
      clickPane(this)
    })
  }
  var addList = document.createElement('button');
  addList.innerHTML = '+';
  addList.className = 'addList';
  addList.addEventListener('click', function () {
    ListAdd(addList)
  })
  var listItem = document.createElement('p');
  listItem.innerHTML = '<p></p>';
  listItem.className = 'listItem';

  listItem.contentEditable = 'true'
  
  var listButton = document.createElement('button');
  listButton.innerHTML = 'X';
  listButton.contentEditable = 'false';
  listButton.addEventListener('click', function (e) {
    removeT(listButton)
  })
  
  listButton.className = 'listButton';
  listItem.appendChild(listButton)
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
      pane.appendChild(other)
      pane.appendChild(title)
      pane.appendChild(description)
      longerPane(title)
      longerPane(description)
      break;
    case 'load':
      var localItems = JSON.parse(localStorage.getItem(localStorageKey));
      console.log(localItems);
      if (localItems[window.currentSection].includes(splitC)) {
        // .splice(0, localItems[window.currentSection].length - 1);
        localItems = localItems[window.currentSection].split(splitC)
        localItems.pop()
      } else {
        localItems = `${localItems[window.currentSection]}${splitC}`.split(splitC).splice(0, `${localItems[window.currentSection]}${splitC}`.split(splitC).length - 1);
      }
      for (var t = 0; t < localItems.length; t++) {
        // Unnamed pane|Description|important^
        var lpane = document.createElement('div');
        lpane.setAttribute('class', `${localItems[t].split('|')[2]}`)
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
        lbackgroundDiv.style = `position: absolute; width: 100%; height: 100%; padding: inherit;`;
        var lother = document.createElement('button');
        lother.addEventListener('click', function (e) {
          extra(this)
        })
        lother.setAttribute('class', 'button3')
        lother.innerHTML = '...';
        var llabel = document.createElement('span');
        llabel.style = `position: relative; background-color: rgb(0, 255, 251);
        padding: 1ch;
        border-radius: 10px; margin: 0; font-size: 1.2ch; user-select: none;`;
        llabel.innerHTML = localItems[t].split('|')[2].split(' ')[3];
        let laddList = document.createElement('button');
        laddList.innerHTML = '+';
        laddList.className = 'addList';
        laddList.addEventListener('click', function () {
          ListAdd(laddList)
        })

        llabel.setAttribute('class', `${localItems[t].split('|')[2].split(' ')[3]}C`)
        if (localItems[t].split('|')[2].includes('panelist')) {
          allpanes.appendChild(lpane)
          if (localItems[t].split('|')[2].split(' ')[3] != undefined && localItems[t].split('|')[2].split(' ')[3] != 'none') {
            lpane.appendChild(llabel)
          }
          lpane.appendChild(lbutton)
          lpane.appendChild(lother)
          lpane.appendChild(ltitle)
          lpane.appendChild(laddList)
          for (var z = 0; z < localItems[t].split('|')[1].split('⁅').length - 1; z++) {
            let llistItem = document.createElement('p');
          llistItem.className = 'listItem';
          llistItem.contentEditable = 'true';
          let llistButton = document.createElement('button');
          llistButton.innerHTML = 'X';
          llistButton.contentEditable = 'false';
          llistButton.addEventListener('click', function () {
            removeT(llistButton)
          })
          llistButton.className = 'listButton';
            llistItem.innerHTML = localItems[t].split('|')[1].split('⁅')[z].slice(0, localItems[t].split('|')[1].split('⁅')[z].length - 1);
            llistItem.appendChild(llistButton)
            lpane.appendChild(llistItem)
          }
        }
        else if (localItems[t].split('|')[2].includes('panetemp')) {
          allpanes.appendChild(lpane)
          lpane.appendChild(lbackgroundDiv)
          if (localItems[t].split('|')[2].split(' ')[3] != undefined && localItems[t].split('|')[2].split(' ')[3] != 'none') {
            lpane.appendChild(llabel)
          }
          lpane.appendChild(lbutton)
          lpane.appendChild(lother)
          lpane.appendChild(ltitle)
          lpane.appendChild(ldescription)
        } else if (localItems[t].split('|')[2].includes('panenew')) {
          allpanes.appendChild(lpane)
          if (localItems[t].split('|')[2].split(' ')[3] != undefined && localItems[t].split('|')[2].split(' ')[3] != 'none') {
            lpane.appendChild(llabel)
          }
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
      pane.appendChild(other)
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
      pane.appendChild(other)
      if (extraParam.includes('extend')) {
        pane.appendChild(button2)
      }
      pane.appendChild(title)
      pane.appendChild(description)
      break;
    case 'defaultlist':
      pane.setAttribute('class', 'panelist popupChange pane')
      allpanes.appendChild(pane)
      pane.appendChild(button)
      pane.appendChild(other)
      pane.appendChild(title)
      pane.appendChild(addList)
      pane.appendChild(listItem)
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

// Credits to https://stackoverflow.com/questions/67754721/can-i-store-image-as-blob-to-localstorage-or-somewhere-so-it-can-used-in-another
// And https://stackoverflow.com/questions/24786848/error-not-allowed-to-load-local-resource

function getBase64Image(img) {
  var canvas = document.getElementById('canvas');
  console.log(img, img.width, img.height);
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.style.visibility = 'hidden';

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  console.log(canvas);
  var dataURL = canvas.toDataURL("image/png");
  console.log(dataURL);
  // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  return dataURL;
}

export function uploadBackgroundFile(e) {

  let fileUpload = document.getElementById('backgroundFile');

  let test = URL.createObjectURL(fileUpload.files[0])
  console.log(test, fileUpload.files[0]);
  var imgTest = document.getElementById('imgTest');
  imgTest.style.visibility = 'hidden';
  imgTest.src = test;

  setTimeout(function () {
  console.log(getBase64Image(imgTest));
  try {
  localStorage.setItem("backgroundImg", getBase64Image(imgTest));
  } catch {
    alert('Your image size is too much. Please use a lower size or clear your localstorage')
  }

  window.location.reload(true)
  }, 1000)
}