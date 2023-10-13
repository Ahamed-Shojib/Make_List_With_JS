var form = document.getElementById('input_list');
var ul = document.getElementById('add_list_item');
var addMe = document.getElementById('add_me_list');
var filter = document.getElementById('filter_list');
var removeList = document.getElementById('remove_list');

addMe.addEventListener('click', addItem);
ul.addEventListener('click', removeListItem);
removeList.addEventListener('click', removeall);
filter.addEventListener('keyup', filterCheck)
document.addEventListener('DOMContentLoaded',getTasks);

function addItem(e){
    // 
    // item.innerHTML = form.ariaValueMax;
    // item.appendChild(ul);
    if(form.value === ''){
        alert('Please enter a value');
    }else{
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(form.value + " "));
        var link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = `x`;
        item.appendChild(link);
        ul.appendChild(item);
        storeLocal(form.value);
        form.value = "";
    }
}

function removeListItem(e){
    if(e.target.hasAttribute('href')){
        var tar_item = e.target.parentElement;
        tar_item.remove();
        removeFromLocalMemory(tar_item);
    }
}

function removeall(e){
    ul.innerHTML = "";
    localStorage.clear();
}

function filterCheck(e){
    let  text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task =>{
            let item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!= -1){
                task.style.display = 'block';

            }else{
                task.style.display = 'none';
            }
    });

}

//Store Local Location......
function storeLocal(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task =>{
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(task + " "));
        var link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = `x`;
        item.appendChild(link);
        ul.appendChild(item);
    });

}

function removeFromLocalMemory(taskitem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
let li = taskitem;
    li.removeChild(li.lastChild);
    tasks.forEach((task,index)=>{
        if(li.textContent.trim() === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));

}