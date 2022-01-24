fetch('https://api.covidtracking.com/v1/states/current.json')
    .then (r => r.json())
    .then (console.log)