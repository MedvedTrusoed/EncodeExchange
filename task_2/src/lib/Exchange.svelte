<script>
  import jsonExchange from "./exchange.js";

  let currencyName1;
  let currencyName2;
  let exchangeRate = 1;
  let convertAED_code1;
  let convertAED_code2;
  $: currencyValue1 = 0;
  $: currencyValue2 = 0;

  //Расчет валюты
  const setExchange = () => {
    currencyValue1 = currencyValue1.toString().slice(0, 8);
    currencyValue2 = (currencyValue1 * exchangeRate).toFixed(3);
  };

  const setExchange2 = () => {
    currencyValue2 = currencyValue2.toString().slice(0, 8);
    currencyValue1 = (currencyValue2 / exchangeRate).toFixed(3);
  };

  let convertation = () => {
    convertAED_code1 = jsonExchange.conversion_rates[currencyName1]; //Конвертирует выбранный код от валюты AED

    convertAED_code2 = jsonExchange.conversion_rates[currencyName2]; 

    exchangeRate = convertAED_code2 / convertAED_code1;

    setExchange();
  };

  const currencies = Object.keys(jsonExchange.conversion_rates); //Список валют из файла json
</script>

<div class="exchange-frame">
  <div class="exchange-left">
    <div class="select">
      <select id="code1" bind:value={currencyName1} on:change={convertation}>
        {#each currencies as currency}
          <option value={currency}>
            {currency}
          </option>
        {/each}
      </select>
    </div>
    <input
      bind:value={currencyValue1}
      on:input={setExchange}
      type="number"
      min="0"
      class="exchange-value"
    />
  </div>

  <div class="exchange-right">
    <div class="select">
      <select id="code2" bind:value={currencyName2} on:change={convertation}>
        {#each currencies as currency}
          <option value={currency}>
            {currency}
          </option>
        {/each}
      </select>
    </div>
    <input
      bind:value={currencyValue2}
      on:input={setExchange2}
      type="number"
      min="0"
      class="exchange-value"
    />
  </div>
</div>

<a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>

<style>
  .exchange-frame {
    display: flex;
    width: 700px;
    justify-content: space-between;
    margin-bottom: 5rem;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .exchange-value {
    width: 18rem;
    padding: 2rem 1rem 2rem 1rem;
    font-size: 2.5rem;
  }
  select {
    margin-bottom: 2rem;
    width: 20rem;
    background: #f0f0f0 url("../assets/dropdown-arrow.svg") no-repeat right 10px
      center / 10%;
    border: 1px solid #ccc;
    padding: 5px 30px 5px 10px;
    border-radius: 4px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  select:focus {
    border-color: #5b9bd5;
  }
</style>
