var passForm = document.getElementById('passForm')
var passResult = document.getElementById('passResult')

passForm.addEventListener('submit', function (event) {
    event.preventDefault()
    let fetchLink = "https://passwordinator.herokuapp.com/generate?";

    let passLength = document.querySelector('#passForm input[type=number]').value;
    fetchLink += `len=${passLength}`
    let passInputs = document.querySelectorAll('#passForm input[type=checkbox]')
    passInputs.forEach(input => {
        if (input.checked) {
            fetchLink += `&${input.name}=true`
        }
    })

    fetch(fetchLink, {
        method: 'GET',
        headers: {
            "accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            document.querySelector('#passResult p b').innerHTML = `${data.data}`
        })
    resetForm(passForm)
    passForm.style.display = 'none'
    passResult.style.display = 'flex'
})

function resetForm(form) {
    form.reset()
}
function resetPass() {
    passForm.style.display = 'flex'
    passResult.style.display = 'none'
}       
    
var encryptForm = document.getElementById('encryptForm')
encryptForm.addEventListener('submit', function(event){
    event.preventDefault()
    let action = document.querySelector('#encryptForm input[type=radio]:checked').value
    let message = document.querySelector('#encryptForm textarea').value
    let key = document.querySelector('#encryptForm input[type=text]').value
    fetch(`https://classify-web.herokuapp.com/api/${action}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            "data": message,
            "key": key
        })
    }).then(response => response.json())
        .then(data => {
        let result = data.result
        document.querySelector('#cryptResult b').innerHTML = result
        document.querySelector('#cryptResult').style.display = 'flex'
        encryptForm.style.display = 'none'
        
})

})

var cryptBackButton = document.querySelector('#cryptResult button')
cryptBackButton.addEventListener('click', function(){
    encryptForm.style.display = 'flex'
    document.querySelector('#cryptResult').style.display = 'none'
    resetForm(encryptForm)
})

var newsFeed = document.getElementById('newsFeed');
var langSelect = document.getElementById('langSelect');
var updateButton = document.getElementById('updateButton');

function updateFeed(){
    
    let langChosen = langSelect.value
    if (['fr','en','zh','de','it','jp','ru','es'].includes(langChosen)){
        let newsLink = "https://newsdata.io/api/1/news?apikey=pub_4097ea562a8e5ee77b955a53f26484752f42&language=" + langChosen
        fetch(newsLink, {method:"GET"})
        .then(response=> response.json())
        .then(data => {
           let result = data.results;
           newsFeed.innerHTML = "";
           result.forEach(element => {
               newsFeed.innerHTML += `
               <div class="news-piece">
               <a href="${element.link}" target="_blank"><h4>${element.title}</h4></a>
               <p>${element.pubDate} - <b>${element.source_id}</b></p>
               </div>
               `
           })
        })
    }
}
setInterval(updateFeed, 15000)
updateFeed()

