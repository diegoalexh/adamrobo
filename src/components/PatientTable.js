import React, { Component } from 'react';
import Patient from './Patient';
import EditPatient from './EditPatient';
import heroesAPI from '../api';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import WebcamCapture from './WebcamCapture';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});
class PatientTable extends Component {
	


constructor(){
	super();
	this.state = {patients: []};
	this.handleSelect = this.handleSelect.bind(this)
	this.handleCancel = this.handleCancel.bind(this)
	this.handleChange = this.handleChange.bind(this)
	this.handleSave = this.handleSave.bind(this)
	this.handleDelete = this.handleDelete.bind(this)
	this.handleEnableAddMode = this.handleEnableAddMode.bind(this)
	this.handleImageReady = this.handleImageReady.bind(this)
	this.handleAnalysisRequest = this.handleAnalysisRequest.bind(this)
}

handleAnalysisRequest(event, patient){
	console.log(patient.image)
}
handleEnableAddMode(){
	this.setState({adding: true, selectedPatient: { name: '', score: ''}})
}
handleDelete(event, patient){
	console.log(patient._id)
	event.stopPropagation();
	heroesAPI.destroy(patient).then(response => {
	let patients = this.state.patients.filter(pta => pta._id !== patient._id);
		this.setState({patients: patients})
		if(this.state.selectedPatient && this.state.selectedPatient._id ===patient._id){
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
	this.setState({selectedPatient: null})
	this.setState({selectedPatient: patient})
}

handleCancel(){
	console.log('cancel')
	this.setState({selectedPatient: null, adding:false})
}

handleImageReady(imgSrc){
	if(this.state.selectedPatient){
			let selectedPatient = this.state.selectedPatient;
			selectedPatient['image'] = imgSrc;
			this.setState({selectedPatient: selectedPatient})
	}
}

componentDidMount(){
	heroesAPI.get().then(json => {
		this.setState({patients: json})
	})
}

render(){

	

	return (
				<Grid container style={{padding: '12px'}}>
						
				<WebcamCapture onImageReady={this.handleImageReady} original={this.state.selectedPatient}/>
				<Button color="primary" onClick={this.handleEnableAddMode}> Novo Teste</Button>
				<Grid container className={styles.root} spacing={16}>
				<Grid item xs={12} md={6}>
				<EditPatient 
					onCancel={this.handleCancel}
					onChange={this.handleChange} 
					selectedPatient={this.state.selectedPatient}
					onSave={this.handleSave}/>
					 </Grid>
       					 <Grid item xs={12} md={6}>
							{
								this.state.patients.map((patient,index) =>{
									return <Patient key={index}
									patient={patient} 
									onSelect={this.handleSelect} 
									onDelete={this.handleDelete}
									onAnalysisRequest={this.handleAnalysisRequest}
									/>
								} )			
							}
					 	</Grid>
					 </Grid>
				</Grid>
	)
}




}
export default withStyles(styles)(PatientTable);