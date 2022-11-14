import '~/index.html'
import '~/styles/main.pcss'
import generateIcons from '~/utility/generateIcons.js'
import { tasks } from '~/components/tasks.js'
import { addDays } from 'date-fns'
import toast from '~/utility/toasts.js'

// generate icons
generateIcons()

const toDos = [
  {
    name: 'You can mark tasks as complete!',
    desc: 'Try it out, click the check box in the top right of this box',
    isDone: false,
    date: new Date (),
    dueDate: addDays(new Date(), 1)
  },
  {
    name: 'Sort alphabetically',
    desc: 'Try it out! Click on the "alphabetical" button at the top',
    isDone: false,
    date: new Date (),
    dueDate: ''
  },
  {
    name: 'Sort by due date',
    desc: 'Try it out! Click on the "Due Date" button at the top',
    isDone: false,
    date: new Date (),
    dueDate: addDays(new Date(), 10)
  }
]

// inject starting tasks
tasks.todos = toDos

// init DOM
tasks.render()

// controls
const addBtn = document.querySelector('.js_add_btn')
if (addBtn) {
  addBtn.addEventListener('click', () => {
    // todo: show modal with fields to add a new todo
  })
}

function comingSoonToast () {
  toast.info('Coming soon! Almost there!')
}

// Controls event listeners
document.querySelector('.js_todo_sort_alpha')?.addEventListener('click', () => tasks.sortAlpha())
document.querySelector('.js_todo_sort_duedate')?.addEventListener('click', () => tasks.sortDueDate())
document.querySelector('.js_add_btn')?.addEventListener('click', () => comingSoonToast())
document.querySelector('.js_show_info_modal')?.addEventListener('click', () => comingSoonToast())
