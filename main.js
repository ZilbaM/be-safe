var passForm = document.getElementById('passForm')
var passResult = document.getElementById('passResult')

passForm.addEventListener('submit', function(event){
    event.preventDefault()
    let fetchLink = "https://passwordinator.herokuapp.com/generate?";

    let passLength = document.querySelector('#passForm input[type=number]').value;
    fetchLink += `len=${passLength}`
    let passInputs = document.querySelectorAll('#passForm input[type=checkbox]')
    passInputs.forEach(input => {
        if(input.checked){
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

function resetForm(form){
    form.reset()
}
function resetPass(){
    passForm.style.display = 'flex'
    passResult.style.display = 'none'
}