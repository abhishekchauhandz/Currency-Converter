const BASE_URL = new URL("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies");

const dropdowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("#btn");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "INR") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "USD") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);                      //when we change the option, we get to know where this change has been done..(which select element is triggered at which position(option element)...
    });                                                //which contains its own value(currCode, countrylist)
};


const updateFlag = (element) => {
    let currCode = element.value;                           //extracted the value of the element which occured by the change of select element
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;      // this link is an api which works with the country code and reflects the flag pf the country
    let img = element.parentElement.querySelector("img");                // i have access the image from the parentElement where the event happens..
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");    // access to the input field of amount
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;  //building a base currency URL 
    let response = await fetch(URL);                                 //requesting to server 
    let data = await response.json();                                //parsing the object into information
    console.log(data);
    const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];     //specifying which conversion is needed
    const convertedAmt = amountVal * rate;
    console.log(convertedAmt)

    msg.innerHTML = `${amountVal} ${fromCurr.value} = ${convertedAmt} ${toCurr.value}`;
    console.log(msg)
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})