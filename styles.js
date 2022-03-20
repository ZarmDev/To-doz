import {items} from './storage.js'

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
    document.getElementById('popup').style.backdropFilter = 'blur(15px)';
    document.getElementById('dropdown-content').style.backdropFilter = 'blur(15px)';
  } else {
    document.getElementById('popup').style.backdropFilter = 'none';
    document.getElementById('dropdown-content').style.backdropFilter = 'none';
  }
  localStorage.setItem('localBlurCheck', t.value)
}

export function roundC(t) {
  if (t.value == 'On') {
    document.getElementById('topbar').style.borderRadius = '0 0 10px 10px';
    document.getElementById('popup').style.borderRadius = '5px';
    document.getElementById('dropdown-content').style.borderRadius = '5px';
    for (var i = 0; i < items.length; i++) {
      items[i].style.borderRadius = '10px';
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
    for (var i = 0; i < items.length; i++) {
      items[i].style.borderRadius = '0';
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

export function changePopupColor(t) {
  document.getElementById('popup').style.backgroundColor = `${t.value}`;
  document.getElementById('popup').style.opacity = '0.85';
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