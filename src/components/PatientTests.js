import React, { Component } from 'react';
import Patient from './Patient';
import EditPatient from './EditPatient';
import heroesAPI from '../api'
class PatientTests extends Component {
	


constructor(){
	super();
	this.state = {patients: []};
	this.handleSelect = this.handleSelect.bind(this)
	this.handleCancel = this.handleCancel.bind(this)
	this.handleChange = this.handleChange.bind(this)
	this.handleSave = this.handleSave.bind(this)
	this.handleDelete = this.handleDelete.bind(this)
	this.handleEnableAddMode = this.handleEnableAddMode.bind(this)
}

handleEnableAddMode(){
	this.setState({adding: true, selectedPatient: {id: '', name: '', score: ''}})
}
handleDelete(event, patient){
	event.stopPropagation();
	heroesAPI.destroy(patient).then(patient => {
	let patients = this.state.patients;
		patients = patients.filter(pta => pta.id !== patient.id);
		console.log(patients)
		this.setState({patients: patients})
		if(this.selectedPatient ===patient){
			this.setState({selectedPatient: null})
		}
	})
}
handleSave(){
	let patients = this.state.patients;
	if(this.state.adding){
		heroesAPI.create(this.state.selectedPatient).then(patient => {
			patients.push(patient)
			this.setState({
				patients : patients,
				adding: false,
				selectedPatient: null
			})
		})
	}else{
		heroesAPI.update(this.state.selectedPatient).then(patient => {
			this.setState({selectedPatient: null})
		})
	}
	

}
handleChange(event){
	
	let selectedPatient = this.state.selectedPatient;
	selectedPatient[event.target.name] = event.target.value;
	this.setState({selectedPatient: selectedPatient})
}
handleSelect(patient){
	console.log('select')
	this.setState({selectedPatient: patient})

}

handleCancel(){
	console.log('cancel')
	this.setState({selectedPatient: null, adding:false})
}

componentDidMount(){
	heroesAPI.get().then(json => {
		this.setState({patients: json})
	})
}

render(){
	return (
				<div>
				<button onClick={this.handleEnableAddMode}> Adicionar</button>
					{
						this.state.patients.map(patient =>{
							return <Patient 
							patient={patient} 
							onSelect={this.handleSelect} 
						
							onDelete={this.handleDelete}
							/>
						} )			
					}
					<EditPatient 
					onCancel={this.handleCancel}
					onChange={this.handleChange} 
					selectedPatient={this.state.selectedPatient}
					onSave={this.handleSave}/>
				</div>

	)
}




}
export default PatientTests;