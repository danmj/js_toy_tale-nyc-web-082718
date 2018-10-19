// GIVEN VARIABLES
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// MY VARIABLES
const toyCollect = document.getElementById('toy-collection')
const submit = document.querySelector('.submit')


// THIS PART CAME WITH THE LAB
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})



// LIKE BUTTON FEATURE EVENT

fetch('http://localhost:3000/toys/')
  .then(res => res.json())
  .then(json => {

    json.forEach((toy) => {
      let div = document.createElement('div')
      let h2 = document.createElement('h2')
      let img = document.createElement('img')
      let p = document.createElement('p')
      let button = document.createElement('button')

      div.className = 'card'
      h2.innerText = `${toy.name}`
      img.src = `${toy.image}`
      img.className = 'toy-avatar'
      p.innerText = `${toy.likes} likes`
      button.className = 'like-btn'
      button.innerText = 'Like'

      button.addEventListener('click', (event) => {
        let tlikes = ++toy.likes
        let toyIds = toy.id
        fetch(`http://localhost:3000/toys/${toyIds}`, {
          method: 'PATCH',//send an HTTP POST request
          headers: { //data about our request; metadata
            'Accept': 'application/json',//i (the client/browser) will ACCEPT json as a response from the server
            'Content-Type': 'application/json'// i (the client/browser) am SENDING the server JSON
          },
          body: JSON.stringify({ //we are sending you the following JSON data; our rails controller will see this in the params
            likes: tlikes
          })
        })
        .then(function(response) {
          return response.json()

        })
        .then(function(parsedJSONData) {
          p.innerText = tlikes
        })

      })

      div.appendChild(h2)
      div.appendChild(img)
      div.appendChild(p)
      div.appendChild(button)

      toyCollect.appendChild(div)

    })
  });


// CREATE NEW TOY FORM EVENT

submit.addEventListener('click', (event) => {
  event.preventDefault()
  let forms = document.getElementsByClassName("input-text")
  let nameForm = forms[0].value
  let urlForm = forms[1].value

  fetch('http://localhost:3000/toys', {
    method: 'POST',//send an HTTP POST request
    headers: { //data about our request; metadata
      'Accept': 'application/json',//i (the client/browser) will ACCEPT json as a response from the server
      'Content-Type': 'application/json'// i (the client/browser) am SENDING the server JSON
    },
    body: JSON.stringify({ //we are sending you the following JSON data; our rails controller will see this in the params
      name: nameForm, //this object must be turned into JSON
      image: urlForm,
      likes: 0
    })
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedJSONData) {
    parsedJSONData[parsedJSONData.length - 1]`1`
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let button = document.createElement('button')

    div.className = 'card'
    h2.innerText = `${toy.name}`
    img.src = `${toy.image}`
    img.className = 'toy-avatar'
    p.innerText = `${toy.likes} likes`
    button.className = 'like-btn'
    button.innerText = 'Like'

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)

    toyCollect.appendChild(div)
  })
})
