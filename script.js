let score = 1000;
let updating = 1;

handleAutoButtonClick( 1, 100, 1000);

updateButtonValue(`btn_manual_1`, 100, 1);

document.addEventListener("DOMContentLoaded", function() {


  // Количество копий
  const numCopies = 5; // укажите необходимое количество копий

  // Находим исходный элемент
  const originalButton = document.getElementById("btn_auto_1");

  // Находим контейнер для кнопок
  const container = document.getElementById("scrolling-panel");

  for (let i = 0; i < numCopies; i++) {
    // Клонируем элемент
    let clone = originalButton.cloneNode(true);

    // Обновляем id у клонированного элемента и его вложенных частей, чтобы они были уникальными
    clone.id = `btn_auto_${i + 2}`; // уникальный id для каждого клона
    clone.querySelector('.btn_text_level').id = `btn_auto_${i + 2}_lvl`;
    clone.querySelector('.btn_text_price').id = `btn_auto_${i + 2}_price`;
    clone.querySelector('.progressBar').id = `progress_bar_${i + 2}`;

    // Вставляем клонированный элемент в контейнер
    container.appendChild(clone);
    updateButtonValue(clone.id, 100, 1);

    let auto_1_active = false;
    let autoLvl1 = 1;
    handleAutoButtonClick(i+2, 100, 1000);
  }
});

function clickBtn() {
  score = score + updating;
  document.getElementById("money_img").innerText = score.toLocaleString();
}

function updateButtonValue(buttonId, price, value) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", function() {
    score = score - price;
    document.getElementById("money_img").innerText = score.toLocaleString();
    if1();
    updating += value;
  });
}

function handleAutoButtonClick(index, cost, duration) {
  let auto_active = false;
  let autoLvl = 1;

  let buttonId = `btn_auto_${index}`;
  let progressBarId = `progress_bar_${index}`;
  let priceId = `btn_auto_${index}_price`;
  let lvlId = `btn_auto_${index}_lvl`;

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
        progressBar.style.width = (progress / duration) * 100 + '%';
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

function if1 () {
  if (score < -100) {
    document.write("Вы проиграли, так-как вы превысили лимит кредита");
  }
}
function reboot () {
  alert("Ваш уровень прокачки " + updating + ". Ваш баланс " + score + " .");
}
