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
    
    const popUpBox = document.createElement('span')
    const delBtn = document.createElement('button')
    setTimeout( () => {
    const popUp = document.querySelector('body')
    popUpBox.style.color = 'black'
    popUpBox.style.backgroundColor = 'white'
    popUpBox.style.padding = '10px'
    popUpBox.innerText = 'HELLO BUY MY STUFF THANKS!'
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

    setTimeout(function(){
        const changeBackgroundColor = document.querySelector('body')
        changeBackgroundColor.style.color = 'blue'
        console.log('now the text is ' + changeBackgroundColor.style.color)
    }, 5000);
})

// The COVID Tracking Project at The Atlantic’s data and website content is published under a Creative Commons CC BY 4.0 license,
// which requires users to attribute the source and license type (CC BY 4.0) when sharing our data or website content.
// Our preferred attribution is The COVID Tracking Project at The Atlantic or The COVID Tracking Project.

// https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Alabama.svg/1200px-Flag_of_Alabama.svg.png - AL
// https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Alaska.svg/2560px-Flag_of_Alaska.svg.png - AK
// https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arizona.svg/1200px-Flag_of_Arizona.svg.png - AZ
// https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arkansas.svg/1200px-Flag_of_Arkansas.svg.png -AR
// https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/1200px-Flag_of_California.svg.png - CA
// https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Flag_of_Colorado.svg/255px-Flag_of_Colorado.svg.png - CO
// https://www.50states.com/wp-content/uploads/2020/01/Connecticut-state-flag-300x232.png - CT
// https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Flag_of_Delaware.svg/1200px-Flag_of_Delaware.svg.png - DE
// https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_the_District_of_Columbia.svg/1200px-Flag_of_the_District_of_Columbia.svg.png - DC
// https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Florida.svg/255px-Flag_of_Florida.svg.png - FL
// https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Georgia_%28U.S._state%29.svg/1200px-Flag_of_Georgia_%28U.S._state%29.svg.png -GA
// https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Hawaii_Hawaiian_sovereignty.svg/2560px-Flag_of_Hawaii_Hawaiian_sovereignty.svg.png - HI
// https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_Idaho.svg/2560px-Flag_of_Idaho.svg.png -ID
// https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Illinois.svg/1200px-Flag_of_Illinois.svg.png - IL
// https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Flag_of_Indiana.svg/1200px-Flag_of_Indiana.svg.png - IN
// https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Iowa.svg/1200px-Flag_of_Iowa.svg.png - IA
// https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Kansas.svg/640px-Flag_of_Kansas.svg.png - KS
// https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Flag_of_Kentucky.svg/1200px-Flag_of_Kentucky.svg.png -KY
// https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Flag_of_Louisiana.svg/2560px-Flag_of_Louisiana.svg.png - LA
// https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_Maine.svg/800px-Flag_of_Maine.svg.png - ME
// https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Maryland.svg/2000px-Flag_of_Maryland.svg.png - MD
// https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Massachusetts.svg/2000px-Flag_of_Massachusetts.svg.png - MA
// https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Michigan.svg/1200px-Flag_of_Michigan.svg.png - MI
// https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Minnesota.svg/1200px-Flag_of_Minnesota.svg.png - MN
// https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_Mississippi.svg/255px-Flag_of_Mississippi.svg.png - MS
// https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Flag_of_Missouri.svg/800px-Flag_of_Missouri.svg.png - MO
// https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_Montana.svg - MT
// https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Flag_of_Nebraska.svg/800px-Flag_of_Nebraska.svg.png - NE
// https://upload.wikimedia.org/wikipedia/commons/f/f1/Flag_of_Nevada.svg - NV
// https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Flag_of_New_Hampshire.svg/1200px-Flag_of_New_Hampshire.svg.png - NH
// https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_New_Jersey.svg/2560px-Flag_of_New_Jersey.svg.png - NJ
// https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_New_Mexico.svg - NM
// https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_New_York.svg/2560px-Flag_of_New_York.svg.png - NY
// https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_North_Carolina.svg/1200px-Flag_of_North_Carolina.svg.png - NC
// https://upload.wikimedia.org/wikipedia/commons/0/05/North_Dakota_state_flag.png - ND
// https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Ohio.svg/1200px-Flag_of_Ohio.svg.png - OH
// https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Oklahoma.svg - OK
// https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Oregon.svg/1200px-Flag_of_Oregon.svg.png - OR
// https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Pennsylvania.svg/1200px-Flag_of_Pennsylvania.svg.png - PA
// https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Rhode_Island.svg/800px-Flag_of_Rhode_Island.svg.png - RI
// https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Flag_of_South_Carolina.svg/800px-Flag_of_South_Carolina.svg.png - SC
// https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_South_Dakota.svg/255px-Flag_of_South_Dakota.svg.png - SD
// https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Tennessee.svg/1200px-Flag_of_Tennessee.svg.png - TN
// https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Texas.svg/2000px-Flag_of_Texas.svg.png -TX
// https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Flag_of_the_State_of_Utah.svg/1280px-Flag_of_the_State_of_Utah.svg.png - UT
// https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Vermont.svg/1200px-Flag_of_Vermont.svg.png - VT
// https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Virginia.svg/1200px-Flag_of_Virginia.svg.png - VA
// https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/1200px-Flag_of_Washington.svg.png - WA
// https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_West_Virginia.svg/1200px-Flag_of_West_Virginia.svg.png -WV
// https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_Wisconsin.svg - WI
// https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Wyoming.svg/1280px-Flag_of_Wyoming.svg.png - WY
