;(function () {

  'use strict'

  const ws = io.connect()

  ws.on('connect', () => {
    console.log('socket connected')
  })

  ws.on('receiveChat', msg => {
    displayChat(msg)
  })

  const form = document.querySelector('form')
  const name = document.querySelector('input[name="name"]')
  const text = document.querySelector('input[name="text"]')
  const ul = document.querySelector('ul')

  form.addEventListener('submit', () => {
    const chat = {
      name: name.value,
      text: text.value
    }

    ws.emit('sendChat', chat)
    displayChat(chat)
    text.value = ''
    event.preventDefault()
  })

  function displayChat (chat) {
    const li = generateLI(chat.name, chat.text)

    ul.appendChild(li)
  }

  function generateLI (name, text) {
    const li = document.createElement('li')
    const textNode = document.createTextNode(`${name}: ${text}`)

    li.appendChild(textNode)
    return li
  }

  function getJSON(url, cb) {
    const request = new XMLHttpRequest()

    request.open('GET', url)

    request.onload = () => {
      cb(JSON.parse(request.responseText))
    }

    request.send()
  }

  document.addEventListener('DOMContentLoaded', () => {
    getJSON('/chats', chats => {
      chats.forEach(displayChat)
    })
  })

})();
