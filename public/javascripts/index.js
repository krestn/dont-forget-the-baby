// import { List, Task } from '../../db/models'
// const db = require('../../db/models')

window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

const demoButton = document.querySelector('#demo-user')
const demoUser = document.querySelector('#creds-input')
const demoSecret = document.querySelector('#pw-input')

demoButton.addEventListener('click', () => {
    console.log('inside demo click')
    demoUser.value = 'demo_user'
    demoSecret.value = 'demo'
})

// const addList = document.querySelector('#add-list-button')
// const newListValue = document.querySelector('.add-list-value')

// addList.addEventListener('click', async (e) => {
//     e.preventDefault()

//     let listName = newListValue.value
//     console.log(newListValue.value)
//     if (listName) {

//     }

// })
