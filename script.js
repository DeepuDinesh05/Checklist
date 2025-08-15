// --------- FILE IMPORT FUNCTIONS --------- //

function toggleFileInputVisibility() 
{
    console.log('Button clicked'); // Debugging line to check if the function is being triggered
    if (importForm.style.display === 'none' || importForm.style.display === '') {
        importForm.style.display = 'block';
    } else {
        importForm.style.display = 'none';
    }
}

const importTaskButton = document.getElementById('import-task-btn');
const importForm = document.getElementById('ImportFileForm');
importTaskButton.addEventListener('click', toggleFileInputVisibility);


// --------- TASK ADDITION/DELETION FUNCTIONS --------- //

// Add new task functionality
document.getElementById('add-task-btn').addEventListener('click', function() 
{
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
  }
});

// Delete task function
function deleteTask(element) 
{
  const taskItem = element.closest('li');
  taskItem.remove();
}