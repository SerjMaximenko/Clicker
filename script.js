let score = 1000;
let updating = 1;

const numButtonCopies = 5; // укажите необходимое количество копий
let autoLVLs = [];

for (let i = 0; i < numButtonCopies+2; i++) {
  autoLVLs.push(1);
}

// handleAutoButtonClick( 1, 100, 1000);
//
// updateButtonValue(`btn_manual_1`, 100, 1);

document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("scrolling-panel");

  function initAutoButtons(i) {
    let machineNumber = i + 1;
    let cost = 100 * machineNumber;

    const button = document.createElement('button');
    button.id = `btn_auto_${machineNumber}`;
    button.classList.add(`btn_global`);

    const span1 = document.createElement('span');
    span1.classList.add(`btn_text_description`);
    span1.textContent = `Machine ` + machineNumber;

    const span2 = document.createElement('span');
    span2.classList.add(`btn_text_level`);
    span2.id = `btn_auto_${machineNumber}_lvl`;
    span2.textContent = `Lvl 1`;

    const span3 = document.createElement('span');
    span3.classList.add(`btn_text_price`);
    span3.id = `btn_auto_${machineNumber}_price`;
    span3.textContent = cost + `$`;

    const progressBar = document.createElement('div');
    progressBar.classList.add(`progressBar`);
    progressBar.id = `progress_bar_${machineNumber}`;

    button.appendChild(span1);
    button.appendChild(span2);
    button.appendChild(span3);
    button.appendChild(progressBar);
    container.appendChild(button);

    handleAutoButtonClick(machineNumber, cost, 1000/machineNumber);
  }

  function initLVLUpAutoButtons(i) {
    const button = document.createElement('button');
    button.id = `btn_auto_${i + 1}_lvl_test`;
    button.classList.add(`btn_global`);

    const span1 = document.createElement('span');
    span1.classList.add(`btn_text_description`);
    span1.textContent = `1 Lvl up.`;

    const span2 = document.createElement('span');
    span2.classList.add(`btn_text_price`);
    span2.id = `btn_auto_${i + 1}_price_test`;
    span2.textContent = `100$`;

    button.appendChild(span1);
    button.appendChild(span2);
    container.appendChild(button);

    handleLVLUpAutoButton(i + 1, 100);
  }

  for (let i = 0; i < numButtonCopies; i++) {
    initAutoButtons(i);
  }
  for (let i = 0; i < numButtonCopies; i++) {
    initLVLUpAutoButtons(i);
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

  let buttonId = `btn_auto_${index}`;
  let progressBarId = `progress_bar_${index}`;
  let priceId = `btn_auto_${index}_price`;
  let lvlId = `btn_auto_${index}_lvl`;

  const button = document.getElementById(buttonId);
  button.addEventListener("click", function() {
    score = score - cost * autoLVLs[index];
    document.getElementById("money_img").innerText = score.toLocaleString();
    let btn_text = document.getElementById(priceId);
    btn_text.innerHTML = cost * (autoLVLs[index] + 1) + "$";

    let progress = 0;
    if (auto_active === false) {
      auto_active = true;
      setInterval(function () {
        progress++;
        let progressBar = document.getElementById(progressBarId);
        progressBar.style.width = (progress / duration) * 100 + '%';
        if (progress === duration) {
          score = score + autoLVLs[index];
          document.getElementById("money_img").innerText = score.toLocaleString();
          progress = 0;
        }
      }, 10);
    } else {
      autoLVLs[index] += 1;
      let btn_lvl = document.getElementById(lvlId);
      btn_lvl.innerHTML = "Lvl " + autoLVLs[index];
    }
    if1();
  });
}

function handleLVLUpAutoButton(index, cost) {
  let buttonId = `btn_auto_${index}_lvl_test`;
  let priceId = `btn_auto_${index}_price_test`;//поменять имя
  let lvlId = `btn_auto_${index}_lvl`;//поменять имя

  const button = document.getElementById(buttonId);
  button.addEventListener("click", function() {
    score = score - cost * autoLVLs[index];
    document.getElementById("money_img").innerText = score.toLocaleString();
    let btn_text = document.getElementById(priceId);
    autoLVLs[index] += 1;
    btn_text.innerHTML = cost * autoLVLs[index] + "$";
    let btn_lvl = document.getElementById(lvlId);
    btn_lvl.innerHTML = "Lvl " + autoLVLs[index];
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
