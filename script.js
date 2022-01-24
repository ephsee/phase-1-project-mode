handleForm()

fetch('https://api.covidtracking.com/v1/states/current.json')
.then(r => r.json())
.then(data => data.forEach(showData))   

function showData(data) {
    
    const newDate = document.querySelector('#date')
    newDate.textContent = 'DATE: ' + data.date
    
    const allStats = document.querySelector('#all-states')
    
    const newState = document.createElement('tr')
    newState.textContent = 'State: ' + data.state
    allStats.append(newState)
    
    const newPositive = document.createElement('td')
    newPositive.textContent = 'Positive: ' + (data.positive)
    newState.append(newPositive)
    
    const newNegative = document.createElement('td')
    newNegative.textContent = 'Negative: ' + (data.negative) // check null value
    newState.append(newNegative)
    if(newNegative === null) {
        newNegative.textContent = parseInt('0')
    }
    
    const newHospitalizations = document.createElement('td')
    newHospitalizations.textContent = 'Hospitalizations: ' + data.hospitalizedCurrently // check null value
    newState.append(newHospitalizations)
    
    const newTests = document.createElement('td')
    newTests.textContent = 'Tests: ' + data.totalTestResults // check null value
    newState.append(newTests)
}

function handleForm() {
    
    const newComment = document.querySelector('#comment-form')
    
    newComment.addEventListener('submit', e => {
        
        e.preventDefault()
        
        const userName = document.querySelector('#name')
        const userComment = document.querySelector('#comment')
        const commentList = document.getElementById('comment-list')
        const listItem = document.createElement('li')
        
        listItem.textContent = userName.value + `: ${userComment.value} `
        listItem.className = 'list-comment'
        
        commentList.append(listItem)
        newComment.reset()
        
        addComment = {
            'user name': userName.value.textContent,
            'user comment': userComment.value.textContent
        }
        
        fetch('http://localhost:3000/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addComment),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
    })
    
}

// function deleteComment(comment) {
//     return fetch('http://localhost:3000/comments/${id}', {
//         method: 'DELETE'
//     })
// }

// document.addEventListener(DOMContentLoaded, welcomeMessage)

// function welcomeMessage() {    
//     alert("Hello!")
// }