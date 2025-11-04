const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const swap = document.getElementById("swap");

const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

async function loadCurrencies() {
  const res = await fetch(apiURL);
  const data = await res.json();
  const currencies = Object.keys(data.rates);

  currencies.forEach(cur => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = cur;
    option1.textContent = option2.textContent = cur;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

convertBtn.addEventListener("click", async () => {
  const base = fromCurrency.value;
  const target = toCurrency.value;
  const amountValue = parseFloat(amount.value);

  if (isNaN(amountValue) || amountValue <= 0) {
    result.textContent = "Please enter a valid amount!";
    return;
  }

  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
  const data = await res.json();
  const rate = data.rates[target];
  const converted = (amountValue * rate).toFixed(2);

  result.textContent = `${amountValue} ${base} = ${converted} ${target}`;
});

swap.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
});

loadCurrencies();
