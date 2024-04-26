let jsonExchange;

const apiKey = "8261cf305e47a5928f41813e";

const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/AED`;

let response = await fetch(url);

if (response.ok) {
  jsonExchange = await response.json();
} else {
  alert("Ошибка HTTP: " + response.status);
}

export default jsonExchange;
