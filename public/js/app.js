console.log('Clientside java script is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = ''
                messageTwo.textContent = data.error
            } else {
                messageTwo.textContent = ''
                messageOne.textContent = data. location + '. ' + data.forecast
            }
        })
    })
})