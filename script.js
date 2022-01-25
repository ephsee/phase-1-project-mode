handleForm()
showComments()

fetch('https://api.covidtracking.com/v1/states/current.json')
.then(r => r.json())
.then(data => showState(data))   

function showState(arr) {
    
    const dropDown = document.querySelector('.states')
    dropDown.addEventListener('change', e => {
        
        const tableState = document.querySelector('#stateName')
        const dropDownValue = e.target.value
        tableState.textContent = dropDownValue
        
        arr.forEach(stata => {
            
            if (dropDownValue === stata.state){
                
                const positive = document.createElement('td')
                positive.textContent = stata.positive
                tableState.append(positive)                
                const negative = document.createElement('td')
                negative.textContent = stata.negative
                tableState.append(negative)
                const hospital = document.createElement('td')
                hospital.textContent = stata.hospitalizedCurrently
                tableState.append(hospital)
                const tests = document.createElement('td')
                tests.textContent = stata.totalTestResults
                tableState.append(tests)
                
                const dateEl = document.querySelector('#date')
                dateEl.innerText = `Date of Findings ${stata.lastUpdateEt}`
            }
        })
    })
}

function handleForm() {
    
    const newComment = document.querySelector('#comment-form')
    newComment.addEventListener('submit', e => {
        
        e.preventDefault()
        
        const userNameEl = document.querySelector('#name')
        const userCommentEl = document.querySelector('#comment')
        const commentList = document.getElementById('comment-list')
        const listItem = document.createElement('li')
        
        const userName = userNameEl.value
        const userComment = userCommentEl.value
        
        listItem.textContent = `${userName} : ${userComment} `
        listItem.className = 'list-comment'
        
        commentList.append(listItem)
        newComment.reset()
        
        addComment = {
            'user name': userName,
            'user comment': userComment
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

function showComments() {
    
    fetch('http://localhost:3000/comments/')
    .then(r=>r.json())
    .then(dataComments => {
        const list = document.querySelector('#comment-list')
        
        dataComments.forEach(dbComment => {
            const oldComments = document.createElement('li')
            oldComments.innerText = dbComment['user name'] + ' : ' + dbComment['user comment']
            list.append(oldComments)
        })
    })
}

// The COVID Tracking Project at The Atlantic’s data and website content is published under a Creative Commons CC BY 4.0 license,
// which requires users to attribute the source and license type (CC BY 4.0) when sharing our data or website content.
// Our preferred attribution is The COVID Tracking Project at The Atlantic or The COVID Tracking Project.
