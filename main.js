// ON LOAD
window.onload = renderList();

// SUBMIT NEW DATA
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  let formData = new FormData(e.target);
  // create entry object
  let newEntry = {
    name: formData.get('name'),
    category: formData.get('category'),
    deadline: formData.get('deadline'),
    done : false,
  }
  // reset inputs
  document.querySelectorAll('input').forEach(e => e.value = '');
  saveEntry(newEntry);
})

// SAVE DATA TO LOCALE STORAGE
function saveEntry(newEntry){
  let tasks = [];
  // check for available content
  if(localStorage.getItem('entries') != null)
    tasks = JSON.parse(localStorage.getItem('entries'));

  tasks.push(newEntry);

  localStorage.setItem("entries",  JSON.stringify(tasks));

  renderList();
}

// (RE)RENDER THE LIST
function renderList(){
  let anchor = document.querySelector('.output');
  // reset old list
  anchor.innerHTML = '';

  let storage = [];
  // check for available content
  if(localStorage.getItem('entries') != null)
    storage = JSON.parse(localStorage.getItem('entries'));
  // create HTML
  storage.forEach((e, i) => {
    let container = document.createElement('div');
    container.style.border = '1px solid black';
    anchor.appendChild(container);

    let name = document.createElement('h3');
    name.innerText = e.name;
    container.appendChild(name);

    let category = document.createElement('p');
    category.innerText = e.category;
    container.appendChild(category);

    let deadline = document.createElement('p');
    deadline.innerText = e.deadline;
    container.appendChild(deadline);

    if(e.done == true){
      let markDone = document.createElement('button');
      markDone.innerText = 'undone';
      markDone.classList.add('doneButtons', `task${i}`);
      container.classList.add('done');
      container.appendChild(markDone);
    }
    else if(e.done == false){
      let markDone = document.createElement('button');
      markDone.innerText = 'done';
      markDone.classList.add('doneButtons', `task${i}`);
      container.appendChild(markDone);
    }

    let deleteTask = document.createElement('button');
    deleteTask.innerText = 'delete Task';
    deleteTask.classList.add('closingButtons', `task${i}`);
    container.appendChild(deleteTask);
  })
}

// DONE BUTTONS
document.querySelector('.output').addEventListener('click', e => {
  if(e.target.classList[0] == 'doneButtons'){
    if(e.target.innerText == 'done') e.target.innerText = 'undone';
    else e.target.innerText = 'done';
    e.target.parentElement.classList.toggle('done');
    let index = e.target.classList[1].slice(4);
    toggleDone(index);
  }
    
});

function toggleDone(index){
  let storage = JSON.parse(localStorage.getItem('entries'));
  if(storage[index].done == true)
    storage[index].done = false;
  else storage[index].done = true;
  localStorage.setItem("entries", JSON.stringify(storage));
}

// CLOSING BUTTONS
document.querySelector('.output').addEventListener('click', e => {
    if(e.target.classList[0] == 'closingButtons'){
      // get index number
      let index = e.target.classList[1].slice(4);
      deleteEntry(index);
    }
  });

// DELETE SINGLE ENTRY
function deleteEntry(index){
  let storage = JSON.parse(localStorage.getItem('entries'));
  storage.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(storage));
  renderList();
}

// DELETE ALL ENTRIES
document.querySelector('#reset').addEventListener('click', () => {
  localStorage.clear();
  renderList();
});