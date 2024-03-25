
// Selectores
const inputTarea = document.querySelector("#input-tarea");
const btnAgregar = document.querySelector("#boton-agregar");
const form = document.querySelector("#form");
const list = document.querySelector("#lista");
const contTotal = document.querySelector("#total");
const contComplete = document.querySelector("#completas");
const contIncomplete = document.querySelector("#incompletas");

 let tasks = [];

//Functions

//Crear elemento para agregar a la lista

const renderTasks = () => {
  list.innerHTML = "";
  tasks.forEach((tasks) => {
    // Crear elemento
    const li = document.createElement("li");
    li.classList.add("tareas");
    li.id = tasks.id;
    li.innerHTML = `
    <div id="icono-eliminar">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> <path
      stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </div>
    <p class="tarea">${tasks.task}</p>
    <div class="icono-check">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /> </svg>
    </div>
    `;
    if (tasks.checked){
      li.classList.add("tarea-hecha");
      const boton = li.children[2];
      boton.classList.add('check');
      
      
    } else{
      li.classList.remove("tarea-hecha");
      
    }

    list.append(li);
    renderCounters();
  });
};

//Crear el evento para agregar y mostrar

form.addEventListener('submit', e => {

  // Previene el evento pre definido
  e.preventDefault();
  
  
  if (inputTarea.value === "") return
  // Obtengo el ultimo elemento del array
  const lastElement = tasks[tasks.length - 1];
  // Crear objeto con el nombre y el numero
  const newTask = {
    id: lastElement ? lastElement.id + 1 : 1, // compruebo si el ultimo elemento existe
    task: inputTarea.value,
    checked: false

  }
  // Agrego al array
  tasks = tasks.concat(newTask);
   

  // Guardar en el navegador
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Limpiar form
  form.reset();

  // Mostrar en el html
    renderTasks();
    renderCounters();

});


// Botones borrar y checkear

list.addEventListener('click', e => {
  const deleteBtn = e.target.closest('#icono-eliminar');
  const checkBtn = e.target.closest('.icono-check');


  if (deleteBtn) {
    const id = Number(deleteBtn.parentElement.id);
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(); 
    renderCounters();

  }

  if (checkBtn) {
    const li = checkBtn.parentElement;
    tasks = tasks.map(task => {
        if (task.id === Number(li.id)) {
          return {...task , checked: !task.checked};
        } else {
          return  task
        }
    });

     localStorage.setItem('tasks', JSON.stringify(tasks)); 
     renderTasks();

  }

});

// Contadores

const renderCounters = () => {
  const total = Number(tasks.length);
  contTotal.innerHTML= `
  Total: ${total}
  `;

   const completas = document.querySelectorAll(".tarea-hecha").length;
  contComplete.innerHTML=`
  Completas: ${completas}
  `;

  const incompletas = total - completas;
  contIncomplete.innerHTML=`
  Incompletas: ${incompletas}
  `;

}

(() => {
  const taskStringArray = localStorage.getItem('tasks');
  if (taskStringArray) {
    tasks = JSON.parse(taskStringArray);
    renderTasks();
  }
})();



