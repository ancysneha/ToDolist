const input      = document.getElementById("input");
const addBtn     = document.getElementById("add");
const cancelBtn  = document.getElementById("cancel");
const todoList   = document.getElementById("todoList");

let editTarget   = null; 

const clearInput = () => { input.value = ""; input.focus(); };

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;       

  if (editTarget) {
    editTarget.querySelector(".todo-text").innerText = text;
    exitEditMode();
  } else {
    const li = document.createElement("li");
    li.className = "list-items";

    li.innerHTML = `
      <span class="todo-text">${text}</span>
      <div class="icons">
        <i class='bx bxs-edit   editBtn'></i>
        <i class='bx bxs-trash  deleteBtn'></i>
      </div>
    `;
    todoList.appendChild(li);
    clearInput();
  }
});


todoList.addEventListener("click", e => {
  if (e.target.classList.contains("editBtn"))  enterEditMode(e.target.closest("li"));
  if (e.target.classList.contains("deleteBtn")) deleteTask   (e.target.closest("li"));
});


cancelBtn.addEventListener("click", exitEditMode);


function enterEditMode(li) {
  editTarget = li;
  input.value      = li.querySelector(".todo-text").innerText;
  addBtn.textContent = "Save";
  cancelBtn.classList.remove("d");
  clearInput();
}

function exitEditMode() {
  editTarget = null;
  addBtn.textContent = "Submit";
  cancelBtn.classList.add("d");
  clearInput();
}

function deleteTask(li) {
 
  if (li === editTarget) exitEditMode();
  li.remove();
}
