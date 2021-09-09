window.onload = renderList();

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let newEntry = {
    task: formData.get('task'),
    deadline: formData.get('deadline'),
  }
  saveEntry(newEntry);
})

function saveEntry(newEntry){
  console.log(newEntry)
  let tasks = [];
  if(localStorage.getItem('entries') != null)
    tasks = JSON.parse(localStorage.getItem('entries'));

  tasks.push(newEntry);
  localStorage.setItem("entries",  JSON.stringify(tasks));

  renderList();
}

function renderList(){
  let anchor = document.querySelector('.output');
  anchor.innerHTML = '';
  let storage = [];
  if(localStorage.getItem('entries') != null)
    storage = JSON.parse(localStorage.getItem('entries'));

  storage.forEach((e, i) => {
    let container = document.createElement('div');
    container.style.border = '1px solid black';
    anchor.appendChild(container);

    let name = document.createElement('h3');
    name.innerText = e.task;
    container.appendChild(name);

    let deadline = document.createElement('p');
    deadline.innerText = e.deadline;
    container.appendChild(deadline);

    let deleteTask = document.createElement('button');
    deleteTask.innerText = 'delete Task';
    deleteTask.classList.add('closingButtons', `task${i}`);
    container.appendChild(deleteTask);
  })
}

document.querySelector('.output').addEventListener('click', e => {
    if(e.target.classList[0] == 'closingButtons'){
      let index = e.target.classList[1].slice(4);
      deleteEntry(index);
    }
  });

function deleteEntry(index){
  console.log(index)
  let storage = JSON.parse(localStorage.getItem('entries'));
  storage.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(storage));
  renderList();
}

document.querySelector('#reset').addEventListener('click', e => {
  localStorage.clear();
  renderList();
})