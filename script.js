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

                fetch('http://localhost:3000/flags')
                .then(r=>r.json())
                .then(flags => flags.forEach( flag => {
                    
                    if (dropDownValue === flag.state){
                        const displayFlag = document.querySelector('#flag')
                    displayFlag.src = flag.image
                }                   
                
                })
                )}
            })
    })
}

function handleForm() {
    
    const newComment = document.querySelector('#comment-form')
    newComment.addEventListener('submit', e => {
        
        e.preventDefault()
        
        const userNameEl = document.querySelector('#name')
        const userCommentEl = document.querySelector('#comment')
        const userStateEl = document.querySelector('#user-state')
        const commentList = document.getElementById('comment-list')
        const listItem = document.createElement('li')
        
        const userName = userNameEl.value
        const userComment = userCommentEl.value
        const userState = userStateEl.value
        
        listItem.textContent = `${userName} from ${userState} said : ${userComment}`
        listItem.className = 'list-comment'
        
        commentList.append(listItem)
        newComment.reset()
        
        addComment = {
            'user name': userName,
            'user comment': userComment,
            'user state': userState
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
            oldComments.innerText = `${dbComment['user name']} from ${dbComment['user state']} said : ${dbComment['user comment']}`
            list.append(oldComments)
        })
    })
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed', event);
    
    const popUpBox = document.createElement('p')
    const delBtn = document.createElement('button')
    setTimeout( () => {
        const popUp = document.querySelector('body')
        popUpBox.style.color = 'black'
        popUpBox.style.backgroundColor = 'white'
        popUpBox.style.padding = '10px'
        popUpBox.style.position= 'absolute'
        popUpBox.style.left= '40px'
        popUpBox.style.top= '40px'
        const webLink = document.createElement('a')
        webLink.href = 'https://www.covidtests.gov/'
        webLink.innerText = `GET FREE AT-HOME COVID-19 TESTS `
        popUpBox.append(webLink)
        delBtn.innerText = 'x'
        delBtn.style.color = 'red'
        delBtn.style.backgroundColor = 'black'
        popUpBox.style.margin = '10px'

        popUp.append(popUpBox)
        popUpBox.append(delBtn)
    }, 7000);

    delBtn.addEventListener('click', e => {
        console.log('clicked', e)
        popUpBox.remove()
    })
})
    