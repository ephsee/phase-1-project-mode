fetch('https://api.covidtracking.com/v1/states/current.json')
.then(r => r.json())
.then(data => console.log(data))





function handleForm() {
    const newComment = getELementById('comment-form')

        fetch('', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
}