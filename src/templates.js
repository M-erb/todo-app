import { todoDefault } from '~/components/tasks.js'
import { format as dateFormat } from 'date-fns'

const todoItem = (data = todoDefault) => {
  const template = `<div class="todo_item">
    <div class="todo_title_bar">
      <div class="todo_title_item todo_checkbox_space">
        <input type="checkbox" id="js_checkbox"/>
      </div>
      <div class="todo_title_item todo_title_space">
        <h4>${data.name}</h4>
      </div>
      ${data.dueDate ? `<div class="todo_title_item todo_duedate_space">
        <span>due: ${data.dueDate ? dateFormat(data.dueDate, 'MMM/dd/yyyy') : ''}</span>
      </div>` : ''}
      <div class="todo_title_item">
        <button class="btn_icon js_delete_btn" title="Delete this todo"><i icon-name="x-circle"></i></button>
      </div>
    </div>

    <div class="todo_body">
      <p>${data.desc}</p>
    </div>

    <p>DEBUG TMEP <i icon-name="corner-right-down"></i></p>
    <p>Is Done: ${data.isDone}</p>
    <p>Date Created: ${dateFormat(data.date, 'MMM/dd/yyyy')}</p>
  </div>`

  template.trim()
  return template
}

const singleTodo = (data = todoDefault) => {
  return `<div class="todo_page">

  </div>`
}

const modal = (data) => {
  const template = `<div class="modal">

  </div>`
}

export default {
  todoItem,
  singleTodo,
  modal
}
