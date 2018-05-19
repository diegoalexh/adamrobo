import React from 'react';

const Patient = (props) => {

return (
		<li 
			className={props.patient == props.selectedHero  ? 'selected' : ''}
		>
				<button onClick={(e)=> props.onDelete(e,props.patient)}> Remover</button>

			<div className="card" onClick={()=> props.onSelect(props.patient)}>
				<div>{props.patient.id}</div>
				<div>{props.patient.name}</div>
				<div>{props.patient.score}</div>
			</div>
		</li>
	)

}

export default Patient;