const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".submit");
let msg: any = document.querySelector(".msg");
let amount: any = document.querySelector(".amount input");
let fromCurrency: any = document.querySelector(".from select");
let toCurrency: any = document.querySelector(".to select");

// access the selects of html
for (let select of dropdowns) {
  //currency mean currency name to show to the user
  for (let currency in currencyList) {
    // make a new list of options to display the currency list in option that will append to the selected
    let newOption = document.createElement("option");
    newOption.innerText = currency;
    newOption.value = currency;

    // set default currency as USD
    if ((select as any).name === "from" && currency === "USD") {
      (newOption as any).selected = "USD";
    }

    // set default currency as PKR
    else if ((select as any).name === "to" && currency === "PKR") {
      (newOption as any).selected = "PKR";
    }

    // appent the newOptions list to the select
    select.append(newOption);
  }

  select.addEventListener("change", (evt: any) => {
    updateFlag(evt.target);
  });
}

// make a function select to update the flag image when a currency is selected
let updateFlag = (element: any) => {
  let currency = element.value;
  let currencyCode = currencyList[currency];
  let newSrc = `https://flagsapi.com/${currencyCode}/flat/64.png`; // to update flag src
  let img = element.previousElementSibling; // access link to update flag image
  img.src = newSrc;
};

// to load the default exchange rate on page load 1st time
window.addEventListener("load", () => {
  updateExchangeRate();
});

// add EventListener to the button to get exchange rate
btn?.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Make a function to get exchange rate
const updateExchangeRate = async () => {
  let fromCurrValue = fromCurrency.value.toLowerCase();
  let toCurrValue = toCurrency.value.toLowerCase();
  let amountVal = amount.value;

  //apply condition to amountVal
  if (amountVal == "" || amountVal < 1) {
    amountVal = 1;
    amount.value = 1;
  }

  // filter numbers from string
  amountVal = parseFloat(amountVal);

  let URL = `${BASE_URL}/${fromCurrValue}.min.json`;
  try {
    //fetching the URL
    let response = await fetch(URL);

    //convertresponse to json format
    let data = await response.json();

    //get exchange value
    let rate = data[fromCurrValue][toCurrValue];

    // filter only 2 digits after decimal
    let finalAmount = Math.round(rate * amountVal * 100) / 100;

    // displaying the result in the message element
    msg.innerHTML = `${amountVal}${fromCurrValue.toUpperCase()} = ${finalAmount}${toCurrValue.toUpperCase()} `;
  } catch (err) {
    msg.innerHTML = "Connection Error";
  }
};
