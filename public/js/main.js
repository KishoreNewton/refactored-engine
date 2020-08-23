const numberInput = document.getElementById('number')
const textInput = document.getElementById('msg')
const button = document.getElementById('button')
const response = document.querySelector('.response')

button.addEventListener('click', send, false)

const socket = io()
socket.on('smsStatus', (data) => {
    response.innerHTML = `<h5>Text message sent to ${data.number}</h5>`
})

function send() {
    const number = numberInput.value.replace(/\D/g, '')
    const text = textInput.value

    fetch('/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ number, text })
    }).then((res) => {
        console.log(res)
    }).catch(err => {
        throw new Error(err)
    })
}