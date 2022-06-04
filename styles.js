import {items} from './storage.js'
import {mql, paletteC} from './script.js'

export function changeTopbar(t) {
  console.log(t.value);
  document.getElementById('topbar').style.backgroundColor = t.value;
  localStorage.setItem('localTop', t.value)
}

export function changeFontColor(t) {
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

export function changeAllColors(t) {
  for (var i = 0; i < items.length; i++) {
    items[i].style.backgroundColor = t.value;
  }
  localStorage.setItem('localPan', t.value)
}

export function changeBackColor(t) {
  document.getElementsByTagName('body')[0].style.backgroundColor = t.value;
  localStorage.setItem('localBackground', t.value)
}

export function changeButtonColor(t) {
  let buttons = document.getElementsByClassName('buttonClass');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = t.value;
  }
  localStorage.setItem('localButtonColor', t.value)
}

export function setBlurOn(t) {
  if (t.value == 'On') {
    document.getElementById('popup').style.backdropFilter = 'blur(2px)';
    document.getElementById('dropdown-content').style.backdropFilter = 'blur(2px)';
    document.getElementById('extraPopup').style.backdropFilter = 'blur(2px)';
    document.getElementById('sidebar').style.backdropFilter = 'blur(2px)';
  } else {
    document.getElementById('popup').style.backdropFilter = 'none';
    document.getElementById('dropdown-content').style.backdropFilter = 'none';
    document.getElementById('extraPopup').style.backdropFilter = 'none';
    document.getElementById('sidebar').style.backdropFilter = 'none';
  }
  localStorage.setItem('localBlurCheck', t.value)
}

function roundCorners(elements, borderRadius) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.borderRadius = borderRadius;
  }
}

export function roundC(t) {
  if (t.value == 'On') {
    document.getElementById('topbar').style.borderRadius = '0 0 6px 6px';
    document.getElementById('popup').style.borderRadius = '6px';
    document.getElementById('dropdown-content').style.borderRadius = '6px';
    /*
    for (var i = 0; i < items.length; i++) {
      items[i].style.borderRadius = '10px';
    }
    for (var i2 = 0; i2 < document.getElementsByTagName('button').length; i2++) {
      document.getElementsByTagName('button')[i2].style.borderRadius = '6px';
    }
    for (var i3 = 0; i3 < document.getElementsByTagName('select').length; i3++) {
      document.getElementsByTagName('select')[i3].style.borderRadius = '6px';
    }
    for (var i3 = 0; i3 < document.getElementsByTagName('label').length; i3++) {
      document.getElementsByTagName('label')[i3].style.borderRadius = '6px';
    }
    */
   roundCorners(items, '10px')
   roundCorners(document.getElementsByTagName('button'), '6px')
   roundCorners(document.getElementsByTagName('select'), '6px')
   roundCorners(document.getElementsByTagName('label'), '6px')
  } else {
    document.getElementById('topbar').style.borderRadius = '0';
    document.getElementById('popup').style.borderRadius = '0';
    document.getElementById('dropdown-content').style.borderRadius = '0';
    /*
    for (var i = 0; i < items.length; i++) {
      items[i].style.borderRadius = '0';
    }
    for (var i2 = 0; i2 < document.getElementsByTagName('button').length; i2++) {
      document.getElementsByTagName('button')[i2].style.borderRadius = '0';
    }
    for (var i3 = 0; i3 < document.getElementsByTagName('select').length; i3++) {
      document.getElementsByTagName('select')[i3].style.borderRadius = '0';
    }
    for (var i3 = 0; i3 < document.getElementsByTagName('label').length; i3++) {
      document.getElementsByTagName('label')[i3].style.borderRadius = '0';
    }
    */
    roundCorners(items, '0')
    roundCorners(document.getElementsByTagName('button'), '0')
    roundCorners(document.getElementsByTagName('select'), '0')
    roundCorners(document.getElementsByTagName('label'), '0')
  }
  localStorage.setItem('localRoundedCheck', t.value)
}
export function newFontFamily(t) {
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

export function extendEnable(t) {
  document.querySelectorAll('.button2').forEach(e => e.remove());
  if (t.value == 'On') {
    for (var i = 0; i < items.length; i++) {
      document.getElementById('rounded').value == 'On' ? items[i].getElementsByTagName('button')[0].insertAdjacentHTML('afterend', `<button class="button2" style="border-radius: 10px;" onclick="extend(this)">^</button>`) : items[i].getElementsByTagName('button')[0].insertAdjacentHTML('afterend', `<button class="button2" onclick="extend(this)">^</button>`);
    }
  }
  localStorage.setItem('localExtendEnabled', t.value)
}

// Consider making a export function to automate

export function changeFontSize(t) {
  document.getElementsByTagName('body')[0].style.fontSize = `${t.value}px`;
  localStorage.setItem('localFontSize', t.value)
}

// Totally didn't find on stackoverflow

function hexToRGB(hex) {
  return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}

export function changePopupColor(t) {
  var getHValue = hexToRGB(t.value);
  console.log('STUFF', getHValue[0], `rgb(${getHValue[0]}, ${getHValue[1]}, ${getHValue[2]}, ${0.60})`);
  document.getElementById('popup').style.backgroundColor = `rgb(${getHValue[0]}, ${getHValue[1]}, ${getHValue[2]}, ${0.60})`;
  document.getElementById('extraPopup').style.backgroundColor = `rgb(${getHValue[0]}, ${getHValue[1]}, ${getHValue[2]}, ${0.60})`;
  document.getElementById('sidebar').style.backgroundColor = `rgb(${getHValue[0]}, ${getHValue[1]}, ${getHValue[2]}, ${0.60})`;
  // document.getElementById('popup').style.opacity = '0.85';
  localStorage.setItem('localPopupColor', t.value)
}

export function themeEnable(t) {
  if (t.value == 'On') {
    let d = new Date();
    if (d.getHours() >= 20 || d.getHours() <= 6) {
      console.log('Dark');
      paletteC('Dark')
      // Else if both have or equal to 20 but it should work as sexpected because then 7:00 PM would be dark mode as opposed to it just not working
    } else if (d.getHours() > 6 && d.getHours() <= 20) {
      console.log('Light');
      paletteC('Light')
    }
  }
  localStorage.setItem('localThemeEnabled', t.value)
}

export function popupAnim() {
  let t2 = document.getElementsByClassName('quietDown');
  for (var i = 0; i < t2.length; i++) {
    // Make some elements in background black/blended
    t2[i].style.mixBlendMode = 'multiply';
  }
  let t3 = document.getElementsByClassName('popupChange');
  for (var i = 0; i < t3.length; i++) {
    // make border look cool
    t3[i].style.mixBlendMode = 'luminosity';
  }
  // If screen is phone
  if (mql.matches) {
    // Slower animation
    let t = 0;
    var myInterval = setInterval(function () {
      popup.style.bottom = `${-15 - t}%`;
      popup.style.visibility = 'visible';
      t += 0.8;
      if (t > 45) {
        clearInterval(myInterval)
      }
    }, 1)
  } else {
    // Faster animation
    let t = 0;
    let a = 1000;
    var myInterval = setInterval(function () {
      popup.style.bottom = `${500 - t}px`;
      popup.style.visibility = 'visible';
      a--
      t += a * 0.01;
      if (t > a/1.92) {
        clearInterval(myInterval)
      }
    }, 1)
  }
}

export function popupClose() {
  let t2 = document.getElementsByClassName('quietDown');
  // Set elements back to normal blend
  for (var i = 0; i < t2.length; i++) {
    t2[i].style.mixBlendMode = 'normal';
  }
  let t3 = document.getElementsByClassName('popupChange');
  for (var i = 0; i < t3.length; i++) {
    t3[i].style.mixBlendMode = 'normal';
  }
  document.getElementById('popup').style.visibility = 'hidden';
}

var toggle1 = true;

// Animation for sidebar

var animateSidebar = undefined
var animateSidebar2 = undefined

export function toggleSidebar() {
  // Open
  if (toggle1 == false) {
    clearInterval(animateSidebar2)
    toggle1 = true;
    var t = 0;
    animateSidebar = setInterval(function () {
      t += 0.5;
      sidebar.style.left = `-${t}vw`;
      console.log(t);
      if (t > 35) {
        clearInterval(animateSidebar)
      }
    }, 10) //increasing number makes it slower, controls the speed
  } else {
    clearInterval(animateSidebar)
    //sliding animation
    toggle1 = false;
    var t = 0;
    animateSidebar2 = setInterval(function () {
      t += 0.5;
      sidebar.style.left = `${t - 20}%`;
      console.log(t);
      if (t > 19) {  //positions how far right the sidebar goes
        clearInterval(animateSidebar2)
      }
    }, 5)
  }
}