let imgName = ["gas.png", "sber.png", "mts.png", "yndx.png", "lukoil.png", "sber.png", "mts.png", "sber.png", "mts.png"];
let tickers = ["GAZP", "SBER", "MTSS", "YNDX", "LKOH", "LKOH", "LKOH", "LKOH", "LKOH"];

let score = 1000;


document.addEventListener("DOMContentLoaded", function() {


    function initDropBox() {
        const dropdownButton = document.getElementById('dropdownButton');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const dropdownItems = dropdownMenu.getElementsByClassName('dropdown-item');

        dropdownButton.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        for (let item of dropdownItems) {
            item.addEventListener('click', (event) => {
                dropdownButton.textContent = event.target.textContent;
                dropdownMenu.style.display = 'none';
            });
        }

        document.addEventListener('click', (event) => {
            if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    const scrollingPanel = document.getElementById("scrolling-panel");

    function initSections(index) {
        const divOneSectionContainer = document.createElement('div');

        const buttonBuy = document.createElement('button');
        const buttonSell = document.createElement('button');

        const divInfo = document.createElement('div');
        const spanCost = document.createElement('span');
        const spanDividends = document.createElement('span');
        const spanQuantity = document.createElement('span');
        const spanPriceChange = document.createElement('span');

        const infoImg = document.createElement('img');

        divOneSectionContainer.classList.add('section_container');
        divInfo.classList.add('info_panel');

        buttonBuy.classList.add('button_buy');
        buttonBuy.textContent = "Buy";
        buttonSell.classList.add('button_sell');
        buttonSell.textContent = "Sell";

        spanCost.classList.add('main_text');
        spanCost.classList.add('cost_text');
        spanCost.id = "cost_text_" + index;
        spanDividends.classList.add('main_text');
        spanDividends.classList.add('dividends_text');
        spanDividends.id = "dividends_text_" + index;
        spanQuantity.classList.add('main_text');
        spanQuantity.classList.add('quantity_text');
        spanQuantity.id = "quantity_text_" + index;
        spanPriceChange.classList.add('main_text');
        spanPriceChange.classList.add('price_change_text');
        spanPriceChange.id = "price_change_text_" + index;


        setBuyButtonEvent(buttonBuy, spanQuantity, spanCost, 100);

        infoImg.classList.add("info_img");
        infoImg.src = 'images/' + imgName[index];

        getPriceInUSD(spanCost, tickers[index]);
        spanDividends.textContent = "100.12$"
        spanQuantity.textContent = "100"
        spanPriceChange.textContent = "100.12$"

        divInfo.appendChild(spanCost);
        divInfo.appendChild(spanDividends);
        divInfo.appendChild(spanQuantity);
        divInfo.appendChild(spanPriceChange);
        divInfo.appendChild(infoImg);
        divOneSectionContainer.appendChild(buttonBuy)
        divOneSectionContainer.appendChild(buttonSell)
        divOneSectionContainer.appendChild(divInfo)
        scrollingPanel.appendChild(divOneSectionContainer);
    }

    initDropBox();
    for (let i = 0; i < imgName.length; i++) {
        initSections(i)
    }
});

function setBuyButtonEvent(button, quantityText, spanCost) {
    button.addEventListener("click", function() {

        fetch("http://localhost:8080/clients")
            .then((response) => response.json())
            .then((json) => console.log(json));

        let price = parseFloat(spanCost.textContent.slice(0, -1));
        console.log("click")
        if (canNotBuy(score - price)) {
            return;
        }
        score = score - price;
        document.getElementById("money_img").innerText = score.toLocaleString();
        quantityText.innerText = parseFloat(quantityText.innerText) + 1;
    });
}

function canNotBuy (value) {
    if (value < 0) {
        return true;
    }
    return false;
}

async function fetchExchangeRate() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/RUB'); // меняйте на актуальный API
    const data = await response.json();
    return data.rates.USD; // курс рубля к доллару
}

async function moexTickerLast(ticker) {
    return fetch('https://iss.moex.com/iss/engines/stock/markets/shares/securities/' + ticker + '.json')
        .then(function(res) { return res.json(); })
        .then(function(json) {
            let data = json.marketdata.data;
            let filteredData = data.filter(function(d) { return ['TQBR', 'TQTF'].indexOf(d[1]) !== -1; })[0];
            return filteredData[12] !== null ? filteredData[12] : filteredData[36];
        });
}

async function getPriceInUSD(spanCost, ticker) {
    try {
        const priceInRubles = await moexTickerLast(ticker);
        const exchangeRate = await fetchExchangeRate();
        const priceInUSD = (priceInRubles * exchangeRate).toFixed(2); // Конвертируем и округляем до 2 знаков

        spanCost.textContent = priceInUSD + '$';
    } catch (error) {
        console.error('Ошибка:', error);
        spanCost.textContent = "error";
    }
}
