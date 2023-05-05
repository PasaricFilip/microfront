import singleSpaHtml from 'single-spa-html';
const htmlLifecycles = singleSpaHtml({
  template: `<h1>Hello from VanillaJS</h1>
  <h2>Counter value is <span id="counterVal"></span></h2>
  <input type="button" onclick="window.myapp.incrementor()" value="+"></input>
  <input type="button" onclick="window.myapp.decrementor()" value="-"></input>

  <details>
    <summary>Input data</summary>
    <div class="container">
    <input type="text" placeholder="Enter your ime" id="ime">
    <input type="text" placeholder="Enter your priimek" id="priimek">
    <input type="text" placeholder="Enter your tip" id="tip">
    <input type="button" onclick="window.myapp.submitData()" value="submit"></input>
  </div>
  </details>

  <details>
  <summary>Change data</summary>
  <div class="container">
  <input type="text" id="id_change" disabled>
  <input type="text" placeholder="Enter your name" id="name_change">
  <input type="text" placeholder="Enter your surname" id="surname_change">
  <input type="text" placeholder="Enter your type" id="type_change">

  <input type="button" onclick="window.myapp.changeData()" value="change"></input>
</div>
</details>
  <style>
  details {
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: 0.5em 0.5em 0;
}

summary {
    font-weight: bold;
    margin: -0.5em -0.5em 0;
    padding: 0.5em;
}

details[open] {
    padding: 0.5em;
}

details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: 0.5em;
}
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th, td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  form {
    display: inline-block;
  }
  
  input[type=text], select {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  input[type=submit] {
    background-color: #4CAF50;
    color: white;
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  input[type=submit]:hover {
    background-color: #45a049;
  }


</style>
  <input type="button" onclick="window.myapp.refresh()" value="Refresh" class="refresh"></input>


  <!-- Table to display all rows with CRUD operations -->
  <table>
    <thead>
      <tr>
        <th>Ime</th>
        <th>Priimek</th>
        <th>Tip</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  `,
})
function clearTable(){
  //remove all rows from table
  var tbody=document.querySelector("tbody")
  tbody.innerHTML=""
}
htmlLifecycles.originalMount = htmlLifecycles.mount;
htmlLifecycles.mount = function(opts, props) {
  return htmlLifecycles.originalMount(opts, props)
    .then(() => {
      const el = document.querySelector('#counterVal');
      el.innerText = window.myapp.counter;
      window.addEventListener('onIncrement', () => {
        el.innerText = window.myapp.counter;
      });
      window.addEventListener('onDecrement', () => {
        el.innerText = window.myapp.counter;
      });
      window.addEventListener('onEdit', async () => {
        console.log("Edit event received");

      });


      window.addEventListener('onDelete', async () => {
        console.log("Delete event received");
        el.innerText = window.myapp.counter;
        //fetch method delete http://localhost:44361/mentor/delete/byID?Id=123123123
        

      });

      window.addEventListener('onChange',async () => {
        console.log("Change event received");
        el.innerText = window.myapp.counter;

        //get data from input fields name_change, surname_change, type_change and save in variables
        var name_change=document.getElementById("name_change").value
        var surname_change=document.getElementById("surname_change").value
        var type_change=document.getElementById("type_change").value
        var id_change=document.getElementById("id_change").value
        const requestBody = {
          mentor: {
            _id: {
              timestamp: 0
            },
            ime: name_change,
            priimek: surname_change,
            tip: type_change
          },
          id: id_change
        };
        
        const respose=await fetch('http://localhost:44361/mentor/put/mentor', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })

        console.log(respose)

      });
      window.addEventListener('onRefresh', async () => {

        console.log("Refresh event received");
        //use the function clearTable
        clearTable()
        console.log("clearTable called")
        el.innerText = window.myapp.counter;
        
        var fetched_data = [];
        //fetch data from api from http://localhost:44361/mentor/get/All and save in variable then console.log response
        const response=await fetch('http://localhost:44361/mentor/get/All')

        const data=await response.json()
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
            var td4=document.createElement("td")
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            //in td insert user.name
            td1.innerHTML=user.Ime
            //in td insert user.email
            td2.innerHTML=user.Priimek
            //in td insert user.email
            td3.innerHTML=user.Tip
            //in td insert input button edit
            var edit=document.createElement("input")
            edit.setAttribute("type","button")
            edit.setAttribute("value","Edit")
            edit.setAttribute("onclick","window.myapp.edit()")
            edit.addEventListener("click",async function(){
              var id=user._id
              var type=user.Tip
              var name=user.Ime
              var surname=user.Priimek

              //insert into name_change value of name
              var id_change=document.querySelector("#id_change")
              id_change.value=id
              //insert into name_change value of name
              var name_change=document.querySelector("#name_change")
              name_change.value=name
              //insert into surname_change value of surname
              var surname_change=document.querySelector("#surname_change")
              surname_change.value=surname
              //insert into type_change value of type
              var type_change=document.querySelector("#type_change")
              type_change.value=type
            });

            td4.appendChild(edit)
            //in td insert input button delete
            var del=document.createElement("input")
            del.setAttribute("type","button")
            del.setAttribute("value","Delete")

            del.addEventListener("click",async function(){
              var id=user._id
              console.log(id)
              const response=await fetch('http://localhost:44361/mentor/delete/byID?Id='+id,{method:'DELETE'})
              console.log(response.status) // application/json; charset=utf-8
              window.myapp.refresh()

            });

            del.setAttribute("onclick","window.myapp.delete()")
            td4.appendChild(del)

            tr.addEventListener("click",function(){
              var id=user._id
              console.log(id)
            })

          }
          
      //<tr>
      //   <td>John Doe</td>
      //   <td>john@example.com</td>
      //   <td>
      //   <input type="button" onclick="window.myapp.edit()" value="Edit"></input>
      //   <input type="button" onclick="window.myapp.delete()" value="Delete"></input>
      //   </td>
      // </tr>


        
        

      });
      window.addEventListener('onSubmit', async () => {
        console.log("onSubmit event received");
        //get text from input fields by id name
        var name = document.getElementById("ime").value;
        var surname = document.getElementById("priimek").value;
        var type = document.getElementById("tip").value;

        console.log("name is "+name)
        console.log("email is "+surname)
        console.log("tip is "+type)

        //fetch method post http://localhost:44361/mentor/post/mentor
        const response=await fetch('http://localhost:44361/mentor/post/mentor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Ime: name,
            Priimek: surname,
            Tip: type,
          }),
        })
        console.log(response.status) // application/json; charset=utf-8
        //refresh table
        clearTable()
        //call refresh function
        window.myapp.refresh()
        


        el.innerText = window.myapp.counter;
      });
    });
}.bind(htmlLifecycles);

export const { bootstrap, mount, unmount }= htmlLifecycles