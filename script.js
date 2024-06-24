let score = 1000;
let updating = 1;

const numButtonCopies = 5; // укажите необходимое количество копий
let autoLVLs = [];
let autoLVLUpMultiply = [0.05, 0.1, 0.15, 0.2, 0.25];

for (let i = 0; i < numButtonCopies+2; i++) {
  autoLVLs.push(1);
}

document.addEventListener("DOMContentLoaded", function() {

  const clickableArea = document.getElementById('clickable-area');
  clickableArea.addEventListener('click', function(event) {
    // Создаем новый элемент с текстом
    const message = document.createElement('div');
    message.textContent = '+ 1';
    message.className = 'message';

    // Задаем расположение элемента
    message.style.left = `${event.pageX+15}px`;
    message.style.top = `${event.pageY}px`;

    // Добавляем обработчик клика, чтобы клик по message выполнял клик по body
    message.addEventListener('click', function(event) {
      event.stopPropagation(); // Останавливаем всплытие события

      // Создаем новое событие клика
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: event.clientX,
        clientY: event.clientY
      });

      // Генерируем клик по body
      clickableArea.dispatchEvent(clickEvent);
    });

    // Добавляем элемент на страницу
    const main = document.getElementsByTagName("main")[0];
    document.body.appendChild(message);

    // Удаляем элемент через 2 секунды с плавным исчезновением
    setTimeout(() => {
      message.style.opacity = '0';
      // Удаляем элемент из DOM через 1 секунду после начала анимации
      setTimeout(() => {
        document.body.removeChild(message);
      }, 2000);
    }, 300);

    score = score + updating;
    document.getElementById("money_img").innerText = score.toLocaleString();
  });

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
    span3.textContent = cost + `$`;

    const progressBar = document.createElement('div');
    progressBar.classList.add(`progressBar`);
    progressBar.id = `progress_bar_${machineNumber}`;

    const img = document.createElement('img');
    img.classList.add(`button_img`);
    img.src = 'images/machine_2.png';

    button.appendChild(img);
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
    span1.textContent = `Machine ${i + 1} Lvl up.`;

    const span2 = document.createElement('span');
    span2.classList.add(`btn_text_price`);
    span2.id = `btn_auto_${i + 1}_price_test`;
    span2.textContent = 100 * autoLVLUpMultiply[i] + `$`;

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

  const button = document.getElementById(buttonId);
  button.addEventListener("click", function() {
    if (auto_active === false) {
      score = score - cost + autoLVLs[index];
      document.getElementById("money_img").innerText = score.toLocaleString();
      if1();
      let progress = 0;
      auto_active = true;
      button.disabled = true;
      setInterval(function () {
        progress++;
        let progressBar = document.getElementById(progressBarId);
        progressBar.style.width = (progress / duration) * 100 + '%';
        if (progress >= duration) {
          score = score + autoLVLs[index];
          document.getElementById("money_img").innerText = score.toLocaleString();
          progress = 0;
        }
      }, 10);
    }
  });
}

function handleLVLUpAutoButton(index, cost) {
  let buttonId = `btn_auto_${index}_lvl_test`;
  let priceId = `btn_auto_${index}_price_test`;//поменять имя
  let lvlId = `btn_auto_${index}_lvl`;//поменять имя

  const button = document.getElementById(buttonId);
  button.addEventListener("click", function() {
    score = score - cost * autoLVLs[index] * autoLVLUpMultiply[index - 1];
    document.getElementById("money_img").innerText = score.toLocaleString();
    let btn_text = document.getElementById(priceId);
    autoLVLs[index] += 1;
    btn_text.innerHTML = cost * autoLVLs[index] * autoLVLUpMultiply[index - 1] + "$";
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
