function openFullscreen() {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
    elem.msRequestFullscreen();
  }
}

// Вызовите функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', (event) => {
  openFullscreen();
});

let score = 1000;
let updating = 1;

function clickBtn() {
  score = score + updating;
  document.getElementById("money_img").innerText = score.toLocaleString();
}

function updateButtonValue2(buttonId, price, value) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", function() {
    score = score - price;
    document.getElementById("money_img").innerText = score.toLocaleString();
    if1();
    updating += value;
  });
}
updateButtonValue2("btn_manual_1", 100, 1)
updateButtonValue2("btn_manual_2", 150, 2)
updateButtonValue2("btn_manual_3", 250, 3)
updateButtonValue2("btn_manual_4", 500,10)

function handleAutoButtonClick(auto_active, autoLvl, buttonId, progressBarId, priceId, lvlId, cost, duration) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", function() {
    score = score - cost * autoLvl;
    document.getElementById("money_img").innerText = score.toLocaleString();
    let btn_text = document.getElementById(priceId);
    btn_text.innerHTML = cost * (autoLvl + 1) + "$";

    let progress = 0;
    if (auto_active === false) {
      auto_active = true;
      setInterval(function () {
        progress++;
        let progressBar = document.getElementById(progressBarId);
        progressBar.style.width = (progress / duration) * 130 + 'px';
        if (progress === duration) {
          score = score + autoLvl;
          document.getElementById("money_img").innerText = score.toLocaleString();
          progress = 0;
        }
      }, 10);
    } else {
      autoLvl += 1;
      let btn_lvl = document.getElementById(lvlId);
      btn_lvl.innerHTML = "Lvl " + autoLvl;
    }
    if1();
  });
}

let auto_1_active = false;
let autoLvl1 = 1;
handleAutoButtonClick(auto_1_active, autoLvl1, "btn_auto_1", "progressBar", "btn_auto_1_price", "btn_auto_1_lvl", 100, 1000);

let auto_2_active = false;
let autoLvl2 = 1;
handleAutoButtonClick(auto_2_active, autoLvl2, "btn_auto_2", "progressBar2", "btn_auto_2_price", "btn_auto_2_lvl", 200, 500);

let auto_3_active = false;
let autoLvl3 = 1;
handleAutoButtonClick(auto_3_active, autoLvl3, "btn_auto_3", "progressBar3", "btn_auto_3_price", "btn_auto_3_lvl", 500, 300);

let auto_4_active = false;
let autoLvl4 = 1;
handleAutoButtonClick(auto_4_active, autoLvl2, "btn_auto_4", "progressBar4", "btn_auto_4_price", "btn_auto_4_lvl", 1000, 100);

function if1 () {
  if (score < -100) {
    document.write("Вы проиграли, так-как вы превысили лимит кредита");
  }
}
function reboot () {
  alert("Ваш уровень прокачки " + updating + ". Ваш баланс " + score + " .");
}
