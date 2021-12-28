/*
Credits:
https://stackoverflow.com/questions/2803880/is-there-a-way-to-get-a-textarea-to-stretch-to-fit-its-content-without-using-php
https://stackoverflow.com/questions/25305719/change-css-for-all-elements-from-js
*/

/*
Bugs/features:

- User added comma could interfere with split

After testing the below doesn't work...
- User can inject code because of use of innerHTML

Responsive design
*/

const allpanes = document.getElementById('allpanes');
const popup = document.getElementById('popup');
const item = document.createElement('div');

var allItems = [];
var items = document.getElementsByClassName('pane');

if (localStorage.getItem('localStreak') == undefined) {
  localStorage.setItem('localStreak', '0')
}
document.getElementById('streak').innerHTML = `Your streak: ${localStorage.getItem('localStreak')}🔥`;

if (localStorage.getItem('localGoal') == undefined) {
  localStorage.setItem('localGoal', '0')
}
document.getElementById('goal').innerHTML = `Goal: ${localStorage.getItem('localGoal')} days`;


if (localStorage.getItem('localTop') == undefined) {
  console.log('t1');
  localStorage.setItem('localTop', '#0c770c')
  document.getElementById('topcolor').value = '#0c770c';
} else {
  document.getElementById('topcolor').value = localStorage.getItem('localTop');
}
if (localStorage.getItem('localPan') == undefined) {
  console.log('t2');
  localStorage.setItem('localPan', '#c0c0c0')
  document.getElementById('paneColor').value = '#c0c0c0';
} else {
  document.getElementById('paneColor').value = localStorage.getItem('localPan');
}
if (localStorage.getItem('localBackground') == undefined){
  console.log('t3');
  localStorage.setItem('localBackground', '#fcfcfc')
  document.getElementById('backColor').value = '#fcfcfc';
} else {
  document.getElementById('backColor').value = localStorage.getItem('localBackground');
}

if (localStorage.getItem('localItems') == undefined || localStorage.getItem('localItems').split('|')[1] == 'undefined' || localStorage.getItem('localItems') == '') {
  allpanes.insertAdjacentHTML('beforeend', `<div class="pane" style="background-color: ${document.getElementById('paneColor').value};">
  <button onclick="removeT(this)">X</button>
        <p contenteditable="true">Ingredients</p>
        <p contenteditable="true">Description<br>Pizza☑Cheese☑Other ingredients✅</p>
      </div>`)
} else {
  for (var t = 0; t < localStorage.getItem('localItems').split(',').length; t++) {
    //console.log(localStorage.getItem('localItems').split(','));
    allpanes.insertAdjacentHTML('beforeend', `<div class="pane" style="background-color: ${document.getElementById('paneColor').value};" oninput='this.style.marginBottom = this.scrollHeight - 200 + "px"'>
  <button onclick="removeT(this)">X</button>
        <p contenteditable="true">${localStorage.getItem('localItems').split(',')[t].split('|')[0]}</p>
        <p contenteditable="true">${localStorage.getItem('localItems').split(',')[t].split('|')[1]}</p>
      </div>`)
  }
}

setInterval(function () {
  for (var i = 0; i < items.length; i++) {
    allItems.push(`${items[i].children[1].innerHTML}|${items[i].children[2].innerHTML}`)
  }
  localStorage.setItem('localItems', allItems)
  //console.log(allItems, localStorage.getItem('localItems'));
  allItems = []
}, 1000)

function newItem() {
  allpanes.insertAdjacentHTML('beforeend', `<div class="pane" style="background-color: ${document.getElementById('paneColor').value};" oninput='this.style.marginBottom = this.scrollHeight - 200 + "px"'>
  <button onclick="removeT(this)">X</button>
        <p contenteditable="true">Unnamed pane</p>
        <p contenteditable="true">Description</p>
      </div>`)
}


function removeT(t) {
  t.parentElement.remove()
}

function popupAnim() {
  popup.style.visibility = 'visible';
}

function changeTopbar(t) {
  document.getElementById('topbar').style.backgroundColor = t.value;
  localStorage.setItem('localTop', t.value)
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

changeTopbar(document.getElementById('topcolor'))
changeAllColors(document.getElementById('paneColor'))
changeBackColor(document.getElementById('backColor'))

console.log(document.getElementById('topcolor').value, document.getElementById('paneColor').value, document.getElementById('backColor').value);

// Doesn't take rgb for some reason
function setPalette(top, panes, background, fontColor, buttons) {
  localStorage.setItem('localTop', top)
  document.getElementById('topcolor').value = top;
  localStorage.setItem('localPan', panes)
  document.getElementById('paneColor').value = panes;
  localStorage.setItem('localBackground', background)
  document.getElementById('backColor').value = background;
  changeTopbar(document.getElementById('topcolor'))
  changeAllColors(document.getElementById('paneColor'))
  changeBackColor(document.getElementById('backColor'))
  let t = document.querySelectorAll('*');
  for (var i = 0; i < t.length; i++) {
    t[i].style.color = fontColor;
  }
  let t2 = document.getElementsByClassName('buttonClass');
  for (var i2 = 0; i2 < t2.length; i2++) {
    t2[i2].style.backgroundColor = buttons;
  }
}

function paletteC(t) {
  if (t == "Default") {
    setPalette('#0c770c', '#c0c0c0', '#fcfcfc', 'black', 'white')
  }
  if (t == "Light") {
    setPalette('#D0D0D0', '#c0c0c0', '#b5b5b5', 'black', 'white')
  }
  if (t == "Dark") {
    setPalette('#040303', '#333333', '#171717', '#cea4a4', '#515151')
  }
}

function addStreak() {
  localStorage.setItem('localStreak', parseInt(localStorage.getItem('localStreak')) + 1)
  document.getElementById('streak').innerHTML = `Your streak: ${localStorage.getItem('localStreak')}🔥`;
}