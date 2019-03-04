// const selectAllButton = document.getElementById('selectAll')
const inputElement = document.getElementById('input')
const ulElement = document.getElementById('list')
let todoList = []

//=====================
// selectAllButton.addEventListener('click', ()=> {
//
//   console.log('fired')
//
// })
//=====================
inputElement.addEventListener('keydown', event => {

  if (event.key === 'Enter' || event.keyCode === 13) {

    todoList.unshift({
      content: inputElement.value,
      done: false,
      selected: false
    })

    inputElement.value = ''

    upgradeView()
    //при нажатии на энтр выполняется функция описаная ниже
  }
  // console.log(event)
})

//=====================
let upgradeView = () => {
  ulElement.innerHTML = ''

  // for (const todoItem of todoList) {
  for (let index = 0; index < todoList.length; index++) {

    const todoItem = todoList[index]

    const liElement = document.createElement('li')
    liElement.className = 'list-group-item'
    ulElement.append(liElement)
    //append добавление тега в тег

    const divElement = document.createElement('div')
    divElement.className = 'form-group form-check'
    liElement.append(divElement)

    const checkboxElement = document.createElement('input')
    divElement.append(checkboxElement)
    checkboxElement.type = 'checkbox'
    checkboxElement.className = 'form-check-input'
    checkboxElement.id = 'todoItem' + index
    checkboxElement.checked = todoItem.selected

    const labelElement = document.createElement('label')
    divElement.append(labelElement)
    labelElement.className = 'form-check-label'
    labelElement.setAttribute('for', 'todoItem' + index)
    labelElement.innerHTML = todoItem.content

    if (todoItem.done) {
      labelElement.className += ' todoDone'
    }

    if (!todoItem.done) {
      const buttonDoneElement = document.createElement('button')
      divElement.append(buttonDoneElement)
      buttonDoneElement.className = 'btn btn-outline-primary'
      buttonDoneElement.type = 'button'
      buttonDoneElement.innerHTML = 'Done'
      buttonDoneElement.style = 'float: right'

      buttonDoneElement.addEventListener('click', () => {
        todoItem.done = !todoItem.done
        upgradeView()
      })
    }

    else {
      const buttonRemoveElement = document.createElement('button')
      divElement.append(buttonRemoveElement)
      buttonRemoveElement.className = 'btn btn-outline-danger'
      buttonRemoveElement.type = 'button'
      buttonRemoveElement.innerHTML = 'Remove'
      buttonRemoveElement.style = 'float: right'

      buttonRemoveElement.addEventListener('click', () => {
        todoList = todoList.filter(currentTodoItem => currentTodoItem !== todoItem)
        upgradeView()


      })
    }





    checkboxElement.addEventListener('change', () => {
      todoItem.selected = checkboxElement.checked
    })


  }
}

document.getElementById('doneAction').addEventListener('click', () => {
  for (const todoItem of todoList) {
    if (todoItem.selected) {
      todoItem.done = true
      todoItem.selected = false
    }
  }

  upgradeView()

})

document.getElementById('restoreAction').addEventListener('click', () => {
  for (const todoItem of todoList) {
    if (todoItem.selected) {
      todoItem.done = false
      todoItem.selected = false
    }
  }

  upgradeView()

})

document.getElementById('removeAction').addEventListener('click', () => {
  todoList = todoList.filter(todoItem => !todoItem.selected)


  upgradeView()

})

document.getElementById('selectAll').addEventListener('click', ()=> {

  for (const todoItem of todoList) {
    todoItem.selected = true
  }
  upgradeView()
})










//
