'use strict';

const deleteIcons = document.querySelectorAll('.fa-trash')
const updateTodo = document.querySelector('#updateTodo')

Array.from(deleteIcons).map(el => {
    el.addEventListener('click', async (e) => {
        let item = e.target.closest('li');
        let task = item.innerText
        console.log(JSON.stringify({'task' : task}));
        try{
            const response = await fetch('deleteTodo', {
                method: 'delete',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({'task': task})
            })
            const data = await response.json()
            console.log(data)
            location.reload()
        }catch(err){
            console.error(err)
        }
    })
})

updateTodo.addEventListener('click', async() => {
    try{
        const response = await fetch('updateTodo', {
            method: 'put',
            headers: {"Content-Type": "application/json"},
            //body: JSON.stringify({'task': task})
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.error(err)
    }
})