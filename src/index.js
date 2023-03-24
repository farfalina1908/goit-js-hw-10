import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from "./modules/fetchCountries";
const DEBOUNCE_DELAY = 300;

const searchCountry = document.querySelector("#search-box");
const countryList  = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

searchCountry.addEventListener("input", debounce(onSearchCountry, DEBOUNCE_DELAY));


function onSearchCountry(event){
    event.preventDefault();
    const name = searchCountry.value.trim();
    console.log(name);
    if(!name.trim()){
      return}
    fetchCountries(name).then(countries => {
      clearInput();
      inputCheckup(countries);
    })
    .catch(() => {
      Notify.failure("Oops, there is no country with that name");
      clearInput();
    })
    }

function renderCountriesList(countries){
    return countries.map(({name, flags}) => {
      return `<li class='country-list-item'>
      <img class="country-list-flag" src="${flags.svg}" alt="${name.official}" width = 50px>
      <h2 class="country-list-name">${name.official}</h2></li>`
    }).join('');
  }

function renderCountriesInfo(countries) {
return countries.map(country => {
    const {
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      } = country;
    
      const langString = Object.values(languages).join(', ');

   return `

<ul class = "country-info-list">
 <li class = "country-info-list-item"><span class="country-span">
Capital:</span> ${capital}
 </li >
 <li class = "country-info-list-item"><span class="country-span">
Population:</span> ${population}
 </li >
 <li class = "country-info-list-item"><span class="country-span">
Languages:</span> ${langString}
 </li >
 </ul>`   

}).join('');
}

// function renderCountriesInfo(countries){
//     return countries.map(({capital, population, languages})=>{
//   return `<ul class='country-list-info'>
//   <li class='country-list-info-item'><span class="country-span">Capital:</span> ${capital}</li>
//   <li class='country-list-info-item'><span class="country-span">Population:</span> ${population}</li>
//   <li class='country-list-info-item'><span class="country-span">Languages:</span> ${Object.values(languages).join(', ')}</li>
//   </ul>`
//     }).join('');
//   }

function inputCheckup(countries) {
    if (countries.length === 1) {
        countryList.insertAdjacentHTML('beforeend', renderCountriesList(countries));
        countryInfo.insertAdjacentHTML('beforeend', renderCountriesInfo(countries));
    }
    else if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
    }

    else if (countries.length >= 2 && countries.length <= 10) {
        countryList.insertAdjacentHTML('beforeend', renderCountriesList(countries));
    }
}

function clearInput() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}