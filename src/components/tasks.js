import templates from '~/templates.js'
import { isAfter, isBefore } from 'date-fns'
import generateIcons from '~/utility/generateIcons.js'

export const todoDefault = {
  name: 'Todo',
  desc: '',
  isDone: false,
  date: new Date(),
  dueDate: ''
}

export const tasks = {
  todos: [],
  settings: {
    type: 'list', // list, date
    showDone: false
  },
  get viewType () { return this.settings.type },
  set viewType (value) {
    this.settings.type = value
    this.render()
  },
  get showDone () { return this.settings.showDone },
  set showDone (value) {
    this.settings.showDone = value
    this.render()
  },
  add (data = todoDefault) {
    this.todos.push(data)
    this.render()
  },
  update (index, data = todoDefault) {
    this.todos[index] = data
    this.render()
  },
  delete (index) {
    this.todos.splice(index, 1)
    this.render()
  },
  sortAlpha () {
    this.todos.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1

      return 0
    })
    this.render()
  },
  sortDueDate () {
    this.todos.sort((a, b) => {
      if (a.dueDate === '' || b.dueDate === '') return 1
      if (isBefore(a.dueDate, b.dueDate)) return -1
      if (isAfter(a.dueDate, b.dueDate)) return 1

      return 0
    })
    this.render()
  },
  render () {
    const container = document.querySelector('.js_todo_list')
    container.innerHTML = ''

    this.todos.forEach((item, index) => {
      // if (item.isDone) return

      const pos = `pos_${index}`
      const listItem = document.createElement('li')
      listItem.id = pos
      listItem.dataset.index = index
      listItem.innerHTML = templates.todoItem(item)

      // create item DOM and set state
      container.appendChild(listItem)
      generateIcons()
      const checkbox = container.querySelector(`#${pos} input#js_checkbox`)
      checkbox.checked = item.isDone

      // todo event listeners
      container.querySelector(`#${pos} input#js_checkbox`)?.addEventListener('change', e => {
        const input = e.target
        item.isDone = input.checked
        this.update(index, item)
      })

      container.querySelector(`#${pos} button.js_delete_btn`)?.addEventListener('click', () => {
        this.delete(index)
      })
    })
  }
}
