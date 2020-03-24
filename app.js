'use strict';

let summaryURL = 'https://api.covid19api.com/summary';
let container = document.getElementById('container');
let countryInfo = document.getElementById('country-info');

container.insertAdjacentHTML('beforebegin', `
    <h1 id='header'>COVID-19 Pandemic Information</h1>
`);

fetch(summaryURL)
    .then(data => {
        return data.json()
    })
    .then(res => {
        createDOM(res);
    })

function createDOM(info) {
    let tableBody = document.getElementById('table-body');
   
    info.Countries.map(item => (
        tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td class='country'>${item.Country}</td>
                <td class='total-confirmed'>${item.TotalConfirmed}</td>
                <td class='new-confirmed'>${item.NewConfirmed}</td>
                <td class='total-deaths'>${item.TotalDeaths}</td>
                <td class='new-deaths'>${item.NewDeaths}</td>
                <td class='total-recovered'>${item.TotalRecovered}</td>
                <td class='new-recovered'>${item.NewRecovered}</td>
            </tr>
        `)
    ))
    $('#country-info').DataTable({
        'paging': false,
        'order': [[1, 'desc']]
    });
    updateDOM();
};

function updateDOM() {
    let country = document.getElementsByClassName('country');
    let newConfirmed = document.getElementsByClassName('new-confirmed');
    let newDeaths = document.getElementsByClassName('new-deaths');
    let newRecovered = document.getElementsByClassName('new-recovered');
    let totalDeaths = document.getElementsByClassName('total-deaths');
    let totalRecovered = document.getElementsByClassName('total-recovered');
    
    for (let i = 0; i < country.length; i++) {
        if (newConfirmed[i].innerHTML >= 100) {
            newConfirmed[i].classList.add('red');
        }
        if (newDeaths[i].innerHTML >= 100) {
            newDeaths[i].classList.add('red');
        }
        if (newRecovered[i].innerHTML >= 100) {
            newRecovered[i].classList.add('green');
        }
        if (totalDeaths[i].innerHTML > totalRecovered[i].innerHTML) {
            totalDeaths[i].classList.add('red');
        }
        if (totalRecovered[i].innerHTML > totalDeaths[i].innerHTML) {
            totalRecovered[i].classList.add('green');
        }    
    }
}