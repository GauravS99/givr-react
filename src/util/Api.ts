const axios = require('axios');


const auth_token='eed02a3ed761f461e032bc6d8b5d46a8ef24b64b9be41e7ac629cb35ce2b0a37';
const SERVER_URL='http://13.82.224.39:80';
//const SERVER_URL='http://localhost:3000';

// export function getData(url: string, params: any){
//     let config = {
//         headers: {
//             header1: value,
//         }
//     }
//
//     return axios.get(SERVER_URL + url);
// }
//
// export function postData(url: string, body: any, params: any) {
//     let config = {
//         headers: {
//             header1: value,
//         }
//     }
//
//     return axios.post(SERVER_URL + url);
// }




export function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(SERVER_URL + url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${auth_token}`,
            'Access-Control-Allow-Origin':'*',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => {console.log(response); return response.json()}); // parses JSON response into native JavaScript object
}

export function getData(url = '', query) {
    // Default options are marked with *


    return fetch(SERVER_URL + url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${auth_token}`,
            'Access-Control-Allow-Origin':'*',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    })
        .then(function(response) {
            console.log(response);
            return response.json();
        })

}
