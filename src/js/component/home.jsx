import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState ("");
	const [tareas,setTareas] = useState([]);
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jaranedag")
  .then(response => response.json())
  .then(result => setTareas(result))
  .catch(error => console.log('error', error));
						
	},[])
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
							 actualizar();
							  }
						  }}
					 placeholder="Que necesitas hacer?" /></li>

					
					 
					 {tareas.map((t,i)=> ( 
						 <li key={i}> 
							{t.label}<i  className="fas fa-times text-danger  d-flex justify-content-end" onClick={()=> {setTareas(tareas.filter((t,index)=>i != index))
									actualizar();
									}}
								></i>
						 </li>
					  ))}
				
				</ul>
				<div className="footer text-center ">{tareas.length} Tareas</div>
		   </div>
	);
};

export default Home;

