/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Prepare the document and add initial EventListeners

//prepare unique id for notes
let noteId = 0;

//create a variable to allow dragged note to be on top of other notes
let zIndex = 1;

// Resize body so the border is always around the whole window
let body = document.getElementById("body");
body.style.width = window.innerWidth + "px";
body.style.height = window.innerHeight + "px";

window.addEventListener("resize", resizeBody);

function resizeBody() {
  body.style.width = window.innerWidth + "px";
  body.style.height = window.innerHeight + "px";
}

// Add note button
let addButton = document.getElementById("addNoteBtn");
addButton.addEventListener("click", ()=>{
  createNote();
  clearInput();
});

// Clear input after adding a note
function clearInput(){
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle note movement

window.addEventListener("mouseup", mouseUp);

function mouseDown(e) {
  window.addEventListener("mousemove", handleMove);
}

function handleMove(e) {
  let div = document.getElementById(e.target.id);
  div.style.position = "absolute";
  div.style.zIndex = zIndex++;
  div.style.top = e.clientY - 72 + "px"; // center the cursor on the note
  div.style.left = e.clientX - 182 + "px";
}

function mouseUp() {
  window.removeEventListener("mousemove", handleMove);
}
function mouseOut() {
  window.removeEventListener("mousemove", handleMove);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Create new note

function createNote() {
  //get access to input elements
  let inputTitle = document.getElementById("noteTitle");
  let inputContent = document.getElementById("noteContent");

  // create new note
  let newNote = document.createElement("div");
  newNote.id = ++noteId + "note";
  newNote.addEventListener("mousedown", mouseDown);
  newNote.addEventListener("mouseout", mouseOut);
  newNote.classList.add("div-note");

  // create the title
  let newNoteTitle = document.createElement("div");
  newNoteTitle.innerHTML = inputTitle.value;
  newNoteTitle.classList.add("div-title");
  newNote.appendChild(newNoteTitle);

  //create div-delete-btn
  let newNoteDelete = document.createElement("div");
  newNoteDelete.classList.add("div-delete-btn");
  //create delete note img
  let btnImg = document.createElement("i");
  btnImg.classList.add("delete-img");
  btnImg.classList.add("fas");
  btnImg.classList.add("fa-minus-circle");
  btnImg.addEventListener("click", () => {
    newNote.remove();
  });
  newNoteDelete.appendChild(btnImg);
  newNote.appendChild(newNoteDelete);

  // create the hr
  let newNoteHr = document.createElement("hr");
  newNoteHr.classList.add("note-hr");
  newNote.appendChild(newNoteHr);

  // create the content
  let newNoteContent = document.createElement("div");
  newNoteContent.innerHTML = inputContent.value;
  newNoteContent.classList.add("div-content");
  newNote.appendChild(newNoteContent);

  // append new note to the body element
  body.appendChild(newNote);
}
