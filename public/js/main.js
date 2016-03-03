;(function () {

  'use strict';

  const ws = io.connect()

  ws.on('connect', () => {
    console.log('socket connected')
  })

  ws.on('receiveChat', msg => {
    console.log(msg)
    displayChat(msg.name, msg.text)
  })

  const form = document.querySelector('form')
  const name = document.querySelector('input[name="name"]')
  const text = document.querySelector('input[name="text"]')
  const ul = document.querySelector('ul')

  form.addEventListener('submit', () => {
    const [n, t] = [name.value, text.value]

    ws.emit('sendChat', {
      name: n,
      text: t
    })

    displayChat(n, t)

    text.value = ''

    event.preventDefault()
  })

  function displayChat (name, text) {
    const li = generateLI(name, text)

    ul.appendChild(li)
  }

  function generateLI (name, text) {
    const li = document.createElement('li')
    const textNode = document.createTextNode(`${name}: ${text}`)

    li.appendChild(textNode)
    return li
  }









})();
