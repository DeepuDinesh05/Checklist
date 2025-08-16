document.addEventListener("DOMContentLoaded", LoadTasks);

function LoadTasks()
{
  //On Start
  console.log("DOM is fully loaded!");

  let cookies = document.cookie;
  console.log("Saved Tasks From Last Session:");

  if(cookies != [''])
  {
    deleteDefaultTask();

    //split all the tasks from the cookie, returns in format "task text = value"
    const tasks = cookies.split(";");
    let taskvalues = new Array();
  
    // Debugging cookie generation
    tasks.forEach(task =>
    {
      console.log(task.trim());
      task.split("=").forEach(val =>
      {
        taskvalues.push(val);
      });

    });

    console.log(taskvalues);
    for (let index = 0; index < taskvalues.length; index += 2) 
    {
      const taskname = taskvalues[index].trim();  // Even index = task name
      let taskvalue = taskvalues[index + 1].trim();  // Odd index = task value ("true" or "false")

      // Convert taskvalue ("true" or "false") to boolean
      taskvalue = (taskvalue === "true");

      // Add the task to the list
      AddTaskModular(taskname, taskvalue);
    }
  }
  
}

// --------- FILE IMPORT FUNCTIONS --------- //

function toggleFileInputVisibility() 
{
  console.log('Button clicked'); // Debugging line to check if the function is being triggered
  
  if (importForm.style.display === 'none' || importForm.style.display === '') 
  {
      importForm.style.display = 'block';
  } 
  else 
  {
    importForm.style.display = 'none';
  }
}

const importTaskButton = document.getElementById('import-task-btn');
const importForm = document.getElementById('ImportFileForm');
importTaskButton.addEventListener('click', toggleFileInputVisibility);

//Import Logic
const fileinput = document.getElementById('FileImport_Input');

function ImportTasks() 
{
  const file = fileinput.files[0];
  
  if(file)
  {
    // Read the file as text
        const reader = new FileReader();
        reader.onload = function (event) {
            console.log('File contents:', event.target.result);
        };
        reader.readAsText(file);
  }
    
}

fileinput.addEventListener('change',ImportTasks);


// --------- TASK ADDITION/DELETION FUNCTIONS --------- //

const addtaskButton = document.getElementById('add-task-btn');

// Delete task function
function deleteTask(element) 
{
  const taskItem = element.closest('li');
  taskItem.remove();
}

function deleteDefaultTask() 
{
  const firstTask = document.getElementById('defaultTask');
  if(firstTask != null)
  {
    firstTask.remove();  // Remove the first task
  }
  
}

//Add task function
function AddTask()
{
  deleteDefaultTask();

  const taskInput = document.getElementById('new-task-input');
  const taskText = taskInput.value.trim();
  
  if (taskText)
  {        
    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');
    newTask.classList.add('list-group-item', 'bg-primary', 'mb-1', 'text-white', 'rounded-1', 'd-flex', 'justify-content-between', 'align-items-center');
    
    newTask.innerHTML = 
    `<input type="checkbox" class="form-check-input rounded-1">
      ${taskText} 
      <span class="delete-btn" onclick="deleteTask(this)">
        <svg class = "delete-btn-img" fill="#ffffff" width="24"  height="24" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z"/></g></svg>
      </span>`;
        
    taskList.appendChild(newTask);
    taskInput.value = ''; // Clear the input field

    SaveAllCurrentTasks(taskList)
  }
};

function AddTaskModular(name, val)
{
  const taskInput = document.getElementById('new-task-input');
  const taskText = name.trim();

  const taskList = document.getElementById('task-list');
  const newTask = document.createElement('li');
  newTask.classList.add('list-group-item', 'bg-primary', 'mb-1', 'text-white', 'rounded-1', 'd-flex', 'justify-content-between', 'align-items-center');
    
  newTask.innerHTML = 
  `<input type="checkbox" class="form-check-input rounded-1">
    ${taskText} 
    <span class="delete-btn" onclick="deleteTask(this)">
      <svg class = "delete-btn-img" fill="#ffffff" width="24"  height="24" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z"/></g></svg>
    </span>`;

    // Get the checkbox element that was created
  const checkbox = newTask.querySelector('input[type="checkbox"]');

  // Set the checkbox checked state based on the val parameter
  checkbox.checked = val;
        
  taskList.appendChild(newTask);
  taskInput.value = ''; // Clear the input field

}

addtaskButton.addEventListener('click', AddTask);


// --------- COOKIE - DATA PERSISTENCE --------- //

function SaveAllCurrentTasks(tasklistgrp)
{
  const tasksarr = tasklistgrp.getElementsByClassName('list-group-item');
  let CurrentTasksSaved = ""; 

  Array.from(tasksarr).forEach(task => 
  {
    const taskText = task.childNodes[1].nodeValue;
    
    const checkbox = task.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;

    if(taskText != null)
    {
      SetCookie(taskText,isChecked);
      CurrentTasksSaved += taskText + "=" + isChecked + ",";
      console.log(CurrentTasksSaved);
    }

  });

}

function SetCookie(newtaskText, value)
{
  const cookieName = newtaskText.trim().replace(/\s+/g, '_'); // Replace spaces with underscores, regex no clue how this works
  document.cookie = `${cookieName}=${value}; expires=Sat, 1 Jan 2030 12:00:00 UTC; path=/`;
  console.log(`Cookie set: ${cookieName}=${value}`);
}

