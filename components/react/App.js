import React,{ useEffect, useState } from "react"

const App = () => {
    const [val, setVal] = useState(0);

    useEffect(() => {
        window.addEventListener('onIncrement', () => {
            console.log("Increment event received")
            setVal(window.myapp.counter);
        });
        window.addEventListener('onDecrement', () => {
            console.log("Decrement event received")
            setVal(window.myapp.counter);
        });
        window.addEventListener('onRefresh',async () => {
            console.log("Refresh event received")
            var tbody=document.querySelector("tbody")
            tbody.innerHTML=""

            setVal(window.myapp.counter);
            //fetch data from http://localhost:8086/rides and console.log it
            var data=await fetch('http://localhost:8080/api/tutorials')
            data=await data.json()

            console.log(data)

                    //write code to display each of the data in table
        //for loop to iterate through data
        for(let user of data){
            console.log(user)
              //in tbody insert tr
              var tbody=document.querySelector("tbody")
              var tr=document.createElement("tr")
              tbody.appendChild(tr)
              //in tr insert td
              var td1=document.createElement("td")
              var td2=document.createElement("td")
              var td3=document.createElement("td")
              tr.appendChild(td1)
              tr.appendChild(td2)
              tr.appendChild(td3)
              //in td insert user.name
              td1.innerHTML=user.title
              //in td insert user.email
              td2.innerHTML=user.description

              //in td insert input button edit
              var edit=document.createElement("input")
              edit.setAttribute("type","button")
              edit.setAttribute("value","Edit")
              edit.setAttribute("onclick","window.myapp.edit()")
              edit.addEventListener("click",async function(){
                var id=user.id
                var title=user.title
                var description=user.description

  
                document.querySelector("#id_change").value=id
                document.querySelector("#title_change").value=title
                document.querySelector("#description_change").value=description

              });
  
              td3.appendChild(edit)
              //in td insert input button delete
              var del=document.createElement("input")
              del.setAttribute("type","button")
              del.setAttribute("value","Delete")
  
              del.addEventListener("click",async function(){
                var id=user.id
                console.log(id)
                //fetch delete request http://localhost:8080/api/tutorials/id
                await fetch('http://localhost:8080/api/tutorials/'+id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
  
              });
  
              del.setAttribute("onclick","window.myapp.delete()")
              td3.appendChild(del)
  
              tr.addEventListener("click",function(){
                var id=user._id
                console.log(id)
              })
  
            }

            

        });
        window.addEventListener('onEdit', () => {
            console.log("Edit event received")
            setVal(window.myapp.counter);
        });
        window.addEventListener('onChange', () => {
            console.log("Change event received")
            var title=document.querySelector("#title_change").value
            var description=document.querySelector("#description_change").value
            var id=document.querySelector("#id_change").value

            console.log(title,description,id)

            const body = {
                "title": title,
                "description": description
              };
              
              fetch('http://localhost:8080/api/tutorials/'+id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              })

              window.myapp.refresh()

        });
        window.addEventListener('onDelete', () => {
            console.log("Delete event received")
            //setVal(window.myapp.counter);
        });
        window.addEventListener('onSubmit', () => {
            console.log("Submit event received")
            setVal(window.myapp.counter);

            var title=document.querySelector("#title").value
            var description=document.querySelector("#description").value

            console.log(title,description)

            //fetch post request http://localhost:8080/api/tutorials with title and description as json body
            fetch('http://localhost:8080/api/tutorials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title, description: description }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.myapp.refresh()
            }
            )
        });
    },[])

    return (
        <>
            
            <h1>Hello from React</h1>
            <p>Counter is {val}</p>
            <input type="button" onClick={() => window.myapp.incrementor()} value="+"></input>
            <input type="button" onClick={() => window.myapp.decrementor()} value="-"></input>

            <details>
                <summary>Input data</summary>
                <div className="container">
                    <input type="text" placeholder="Enter your title" id="title"></input>
                    <input type="text" placeholder="Enter your description" id="description"></input>
                    <input type="button" onClick={() => window.myapp.submitData()} value="submit"></input>
                </div>
            </details>
            <details>
                <summary>Edit data</summary>
                <div className="container">
                    <input type="text" placeholder="Enter your id" id="id_change" disabled></input>
                    <input type="text" placeholder="Enter your title" id="title_change"></input>
                    <input type="text" placeholder="Enter your description" id="description_change"></input>
                    <input type="button" onClick={() => window.myapp.changeData()} value="change"></input>
                </div>
            </details>

            <input type="button" onClick={() => window.myapp.refresh()} value="refresh"></input>

            <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>

  

        </>
    )
}

export default App

// CSS styles
import "./App.css";