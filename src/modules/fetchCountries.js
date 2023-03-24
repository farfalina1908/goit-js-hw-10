
export function fetchCountries(name) {
   return fetch (`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
   .then(response => {
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    // console.log(response.json());
    return response.json();
    
   });
}

