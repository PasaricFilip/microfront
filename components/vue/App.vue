<template>
  <div>
      <h1>Hello from Vue</h1>
      <h4>My value is {{count}}</h4>
      <input type="button" v-on:click="handleIncrement" value="+"/>
      <input type="button" v-on:click="handleDecrement" value="-"/>

      <details>
      <summary>Input data</summary>
      <div class="container">
      <input type="text" placeholder="Enter your candidate_id" id="candidate_id">
      <input type="text" placeholder="Enter your mentor_id" id="mentor_id">
      <input type="text" placeholder="Enter your car_id" id="car_id">
      <input type="text" placeholder="Enter your start_time" id="start_time">
      <input type="text" placeholder="Enter your end_time" id="end_time">
      <input type="text" placeholder="Enter your price" id="price">
      
      <input type="button" v-on:click="handleSubmit" value="submit"/>
    </div>
    </details>

    <details>
      <summary>Change data</summary>
      <div class="container">
      <input type="text" placeholder="id" id="id_change" disabled>
      <input type="text" placeholder="Enter your candidate_id" id="candidate_id_change">
      <input type="text" placeholder="Enter your mentor_id" id="mentor_id_change">
      <input type="text" placeholder="Enter your car_id" id="car_id_change">
      <input type="text" placeholder="Enter your start_time" id="start_time_change">
      <input type="text" placeholder="Enter your end_time" id="end_time_change">
      <input type="text" placeholder="Enter your price" id="price_change">
      
      <input type="button" v-on:click="handleChange" value="submit"/>
    </div>
    </details>


    <input type="button" v-on:click="handleRefresh" value="Refresh"/>
        <!-- Table to display all rows with CRUD operations -->
  <table>
    <thead>
      <tr>
        <th>candidate_id</th>
        <th>mentor_id</th>
        <th>car_id</th>
        <th>start_time</th>
        <th>end_time</th>
        <th>price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  </div>
</template>
<style>
  /* Style the table */
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    color: #333;
  }

  /* Style the buttons */
  input[type='button'] {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-right: 10px;
    cursor: pointer;
  }

  input[type='button']:hover {
    background-color: #45a049;
  }
</style>
<script>
export default {
  name: 'app',
  data: () => ({
    count: window.myapp.counter,
  }),
  mounted() {
    window.addEventListener('onIncrement', () => {
      this.count = window.myapp.counter;
    });
    window.addEventListener('onDecrement', () => {
      this.count = window.myapp.counter;
    });
  },
  methods: {
    clearTable : () => {
      console.log('clearTable')
      window.myapp.incrementor();

        //remove all rows from table
        var tbody=document.querySelector("tbody")
        tbody.innerHTML=""
    },
    handleIncrement : () => {
      console.log('handleIncrement')
      window.myapp.incrementor();
    },
    handleDecrement : () => {
      console.log('handleDecrement')
      window.myapp.decrementor();
    },
    handleEdit : () => {
      console.log('handleEdit')
      window.myapp.decrementor();

    },
    handleDelete : () => {
      console.log('handleDelete')
      window.myapp.decrementor();
    },
    handleSubmit : () => {
      console.log('handleSubmit')
      window.myapp.decrementor();

      //get data from id_change,candidate_id_change, mentor_id_change, car_id_change, start_time_change, end_time_change, price_change
      const candidate_id = document.getElementById('candidate_id_change').value;
      const mentor_id = document.getElementById('mentor_id_change').value;
      const car_id = document.getElementById('car_id_change').value;
      const start_time = document.getElementById('start_time_change').value;
      const end_time = document.getElementById('end_time_change').value;
      const price = document.getElementById('price_change').value;
      const id = document.getElementById('id_change').value;




    },
    handleChange : () => {
      console.log('handleChange')
      window.myapp.decrementor();

      //get data from input fields id_change, candidate_id_change, mentor_id_change, car_id_change, start_time_change, end_time_change, price_change
      const id_change = document.getElementById('id_change').value;
      const candidate_id_change = document.getElementById('candidate_id_change').value;
      const mentor_id_change = document.getElementById('mentor_id_change').value;
      const car_id_change = document.getElementById('car_id_change').value;
      const start_time_change = document.getElementById('start_time_change').value;
      const end_time_change = document.getElementById('end_time_change').value;
      const price_change = document.getElementById('price_change').value;

      console.log(id_change, candidate_id_change, mentor_id_change, car_id_change, start_time_change, end_time_change, price_change)

      const body = {
        "id": {
          "timestamp": 1646943600,
          "counter": 1234,
          "randomValue1": 5678,
          "randomValue2": 9012,
          "date": "2022-03-10"
        },
        candidate_id_change: "ABC123",
        mentor_id_change: "DEF456",
        car_id_change: "GHI789",
        start_time_change: "2022-05-05T10:00:00.000Z",
        end_time_change: "2022-05-05T12:00:00.000Z",
        price_change: "50"
      };

      console.log(body)

      //fetch put request from http://localhost:8086/rides/id
      fetch('http://localhost:8086/rides/'+id_change, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });



    },
    handleRefresh : async () => {
      console.log('handleRefresh')


      //fetch data from http://localhost:8086/rides
      const response = await fetch('http://localhost:8086/rides');
      const data = await response.json();
      
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
            var td5=document.createElement("td")
            var td6=document.createElement("td")
            var td7=document.createElement("td")

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
            tr.appendChild(td6)
            tr.appendChild(td7)
            //in td insert user.name
            td1.innerHTML=user.candidate_id
            //in td insert user.email
            td2.innerHTML=user.car_id
            //in td insert user.email
            td3.innerHTML=user.mentor_id
            //in td insert user.email
            td4.innerHTML=user.start_time
            //in td insert user.email
            td5.innerHTML=user.end_time
            //in td insert user.email
            td6.innerHTML=user.price

            //in td insert input button edit
            var edit=document.createElement("input")
            edit.setAttribute("type","button")
            edit.setAttribute("value","Edit")
            edit.setAttribute("onclick","window.myapp.edit()")

            edit.addEventListener("click",async function(){
              console.log("clicked edit")
              var id=user.id
              var candidate_id=user.candidate_id
              var car_id=user.car_id
              var mentor_id=user.mentor_id
              var start_time=user.start_time
              var end_time=user.end_time
              var price=user.price

              console.log(id)
              console.log(candidate_id)
              console.log(car_id)
              console.log(mentor_id)
              console.log(start_time)
              console.log(end_time)
              console.log(price)
              //insert candidate_id in candidate_id_change
              document.querySelector("#id_change").value=id
              //insert candidate_id in candidate_id_change
              document.querySelector("#candidate_id_change").value=candidate_id
              //insert car_id in car_id_change
              document.querySelector("#car_id_change").value=car_id
              //insert mentor_id in mentor_id_change
              document.querySelector("#mentor_id_change").value=mentor_id
              //insert start_time in start_time_change
              document.querySelector("#start_time_change").value=start_time
              //insert end_time in end_time_change
              document.querySelector("#end_time_change").value=end_time
              //insert price in price_change
              document.querySelector("#price_change").value=price



              

              console.log("edit ended")

              //write candidate_id to candidate_id_change
            });

            td7.appendChild(edit)
            //in td insert input button delete
            var del=document.createElement("input")
            del.setAttribute("type","button")
            del.setAttribute("value","Delete")

            del.addEventListener("click",async function(){
              console.log("clicked delete")
              var id=user.id
              console.log(id)

              //delete user with id from http://localhost:8086/rides/id
              const response=await fetch('http://localhost:8086/rides/'+id,{method:'DELETE'})
            });

            del.setAttribute("onclick","window.myapp.delete()")
            td7.appendChild(del)

            tr.addEventListener("click",function(){
              console.log("clicked tr")
            })

          }




    },
  }
}
</script>