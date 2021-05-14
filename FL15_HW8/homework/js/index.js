$.fn.createToDoList = function () {
  const $list = $(".list");
  const $input = $("#add-input");
  const $add = $("#add-submit");
  const $search = $('#search-input');

  const todosState = JSON.parse(localStorage.getItem('jquery-plugin-todos-data')) || [];

  function updateLS(data) {
    localStorage.setItem('jquery-plugin-todos-data', JSON.stringify(data));
  }

  function addToDo() {
    const isUnique = todosState.filter(el => el.text === $input.val().trim()).length === 0;
    if ($input.val().trim() && isUnique) {
      todosState.unshift({
        text: $input.val().trim(),
        done: false
      })
      updateLS(todosState);
      renderToDos(todosState);
      $input.closest('form').trigger('reset');
    }
  }

  function searchToDo(ev) {
    const textToMatch = ev.target.value.toLowerCase();
    if (textToMatch) {
      const filteredTodos = todosState.filter(todo => {
        return todo.text.toLowerCase().startsWith(textToMatch);
      });
      renderToDos(filteredTodos);
    } else {
      renderToDos(todosState);
    }
  }

  function renderToDos(data) {
    $list.empty();
    for (const task of data) {
      let item = $(`<li class="item">
      <span class="item-text ${task.done ? 'done' : ''}">${task.text}</span>
      <button class="item-remove">Remove</button>
    </li>`);
      item.find('.item-text').click(() => {
        if (!task.done) {
          task.done = true;
          updateLS(todosState);
          renderToDos(data);
        }
      })
      item.find('.item-remove').click(() => {
        if ($search.val()) {
          data.splice(data.indexOf(task), 1);
        }
        todosState.splice(todosState.indexOf(task), 1);
        updateLS(todosState);
        renderToDos(data);
      })
      $list.append(item);
    }
  }

  $(document).ready(() => {
    $add.click((ev) => {
      ev.preventDefault();
      addToDo();
    });
    $search.on('input', (ev) => {
      searchToDo(ev);
    })
    updateLS(todosState);
    renderToDos(todosState);
  })
}

$('.list').createToDoList();