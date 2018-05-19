import React from 'react';

const EditHero = (props) => {
if (props.selectedPatient){
    return (
	<div> 
		<label>Id</label>
		<input name="id" value={props.selectedPatient.id} onChange={props.onChange}/>
		<label>Nomes</label>
		<input name="name" value={props.selectedPatient.name} onChange={props.onChange}/>
		<label>Score</label>
		<input name="score"  value={props.selectedPatient.score} onChange={props.onChange} />
		<button onClick={()=> props.onSave(props.selectedPatient)}> Salvar</button>
		<button onClick={()=> props.onCancel()}> Cancelar</button>
	</div>

    	);

}else{
	return (

		<div></div>
		);
}	
		

}

export default EditHero;