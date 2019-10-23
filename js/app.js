//select Elements 
const dateElement = document.getElementById('date'),
      list = document.getElementById('list'),
      input = document.getElementById('input'),
      clear = document.querySelector('.clear')

//Classes name 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST , id ;

//get item from localstorage
let data = localStorage.getItem("TODO")

//check if data isn't empty
if(data){
    LIST = JSON.parse(data)
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); // load the list to the user interface 
}else{
    LIST = [];
    id = 0;
}

//load list function
function loadList(array){
    array.forEach(item => {
        AddToDO(item.name, item.id, item.done, item.trash)
    });
}

//clear the localStorage 
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})

//show todays date 
let today = new Date();
let option = {weekday:"long", month:"short", day:'numeric'};

dateElement.innerHTML = today.toLocaleDateString('en-US', option);

//add to do function 
function AddToDO(toDo, id, done, trash){

    if(trash){ return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    let item = `
                <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;

    let position = 'beforeend'
    list.insertAdjacentHTML(position, item);
}

//add eventlistener enter the to do

document.addEventListener('keydown',function(event){
    const toDo = input.value;
    if(event.keyCode == 13 ){
        AddToDO(toDo, id, false, false);
        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false
        });
        //add item to local storage apdating list after adding 
        localStorage.setItem("TODO",JSON.stringify(LIST))
        id++
        input.value="";
    }
})

//complete to do
function completeToDO(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true
}

//remove to do 
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener('click', function(event){

    const element = event.target; //return the clicked element inside list 
    const elementJob = element.attributes.job.value;// compete or delete
// console.log(element)
    if(elementJob == "complete" ){
        completeToDO(element)
    }else if(elementJob == "delete"){
        if(confirm('Are You Sure ?')){
            removeToDo(element)
        }
    }
    //add item to local storage 
    localStorage.setItem("TODO",JSON.stringify(LIST))
})