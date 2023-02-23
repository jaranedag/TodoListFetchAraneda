import React, { useState, useEffect } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


// He intentado que se borran todas las tareas pero parece que la API tiene un problema, porque no deja tener la lista vacia y obliga a tener una tarea guardada, pero si borras y agregas tareas igualmente funciona

const Todo = () =>{
	const [tareas,setTarea] = useState ([]);
	const borrarTarea = (i) => {
		setTarea(			
			tareas.filter((value,index)=>{
				return index !== i;
			})
        
		);
		if (tareas.length === 1){
			console.log("hola")
		    deleteApi()
		  }
	
	};
function deleteApi(){
	var myHeaders = new Headers();
	        myHeaders.append("Content-Type", "application/json");
			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: JSON.stringify([{"label":"","done":false}]),
				redirect: "follow",
			};
			fetch("https://assets.breatheco.de/apis/fake/todos/user/jaranedag",requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
}

function putApi(){
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify(tareas);
	console.log(raw)
	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};
	
	fetch("https://assets.breatheco.de/apis/fake/todos/user/jaranedag",requestOptions)
		.then((response) => response.json())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
	
}
useEffect(() => {
	var requestOptions = {
		method: "GET",
		redirect:"follow"
	};
	fetch("https://assets.breatheco.de/apis/fake/todos/user/jaranedag",requestOptions)
		.then((respuesta) => respuesta.json())
		.then((data) => setTarea(data))
		.catch(error => console.log("error",error));
}, []);
useEffect(()=>{
	putApi();
},[tareas])

return (
	<div className="container">
	  <h1>Mi lista de Tareas </h1>
		  <ul>
			 <li><input type="text"
			   
			   onKeyPress={(event) => {
				if (event.key == "Enter") {
					setTarea([...tareas, { label: event.target.value, done: false }]);
					event.target.value = "";
				}
			}}
			  placeholder="Que necesitas hacer?" /></li>

			
			
		 
		 </ul>
		 {tareas?.map((value,index) =>{
				return (
				<li key={index}>
					{value.label}<i className="fas fa-times text-danger  d-flex justify-content-end" onClick={() => borrarTarea(index)}></i>
				</li>
			)}
			)}
		 <div className="footer text-center ">{tareas.length} Tareas</div>
	</div>
);

};
export default Todo;
//create your first component
/*const Home = () => {
	const [inputValue, setInputValue] = useState ("");
	const [tareas,setTareas] = useState([]);
	

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jaranedag")
			.then(response => response.json())
			.then(result => {
				if (Array.isArray(result)) {
					setTareas(result);
				} else if (typeof result === "object") {
					setTareas(Object.values(result));
				}
			})
			.catch(error => console.log('error', error));
	}, []);
     function actualizar (){
		var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(tareas);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://assets.breatheco.de/apis/fake/todos/user/jaranedag", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
	 }
	 function eliminarTarea(index) {
		setTareasEliminadas(tareasEliminadas.concat(tareas[index]));
		setTareas(tareas.filter((t, i) => i !== index));
		console.log(tareas);
		actualizar()
	  }

	return (
	       <div className="container">
			 <h1>Mi lista de Tareas </h1>
                 <ul>
					<li><input type="text"
                      onChange={(e)=> setInputValue(e.target.value)}
					  value={inputValue}
					  onKeyPress={(e) => { 
						 if(e.key  === "Enter") {
							 setTareas(tareas.concat({label: inputValue, done: false}));
							 setInputValue("")
							 actualizar()
							  }
						  }}
					 placeholder="Que necesitas hacer?" /></li>

					
					 
					 {tareas.map((t,i)=> ( 
						 <li key={i}> 
							{t.label}<i  className="fas fa-times text-danger  d-flex justify-content-end" onClick={()=> {setTareas(tareas.filter((t,index)=>i != index))
									
									}}
								></i>
						 </li>
					  ))}
				
				</ul>
				<div className="footer text-center ">{tareas.length} Tareas</div>
		   </div>
	);
	
};

export default Home;*/
