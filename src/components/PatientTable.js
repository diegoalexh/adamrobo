import React, { Component } from 'react';
import Patient from './Patient';
import EditPatient from './EditPatient';
import heroesAPI from '../api';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import WebcamCapture from './WebcamCapture';
import Snackbar from '@material-ui/core/Snackbar';

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
	this.state = {patients: [], open_snack: false,open_dialog:false};
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
	console.log(patient)
	heroesAPI.sendFormAnalysis(patient).then(resp=>{
		alert('Analise finalizada')
		let p = patient;
		p.cv_result = resp;
		heroesAPI.update(p).then(resp2 => {
				this.setState({	selectedPatient: null})
				let patients = this.state.patients.filter(pta => pta._id !== resp2._id);
				patients.push(resp2);
				this.setState({patients: patients})
		})
	})
}


handleEnableAddMode(){
	this.setState({adding: true, selectedPatient: { name: '', email: '',image:null}})
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
	let selectedPatient = this.state.selectedPatient;
	if(this.state.adding){
		if(selectedPatient.image){
			heroesAPI.storeImage(selectedPatient).then(image=>{
					selectedPatient['image_ref'] = image._id
					heroesAPI.create(selectedPatient).then(p => {
						patients.push(p)
						this.setState({
							patients : patients,
							adding: false,
							selectedPatient: null
						})
					})
			})
		}else{
					heroesAPI.create(selectedPatient).then(p => {
						patients.push(p)
						this.setState({
							patients : patients,
							adding: false,
							selectedPatient: null
						})
					})
		}
	}else{
		if(selectedPatient.image){
			heroesAPI.storeImage(selectedPatient).then(image=>{
				selectedPatient['image_ref'] = image._id
				selectedPatient['image']=null;
				heroesAPI.update(selectedPatient).then(p => {
					this.setState({	selectedPatient: null})
				})
			});
		}
		heroesAPI.update(selectedPatient).then(p => {
				this.setState({	selectedPatient: null})
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
	}else{
    		this.setState({ open_snack: true });
	}
}

componentDidMount(){
	heroesAPI.get().then(json => {
		this.setState({patients: json})
	})
}
handleClose = () => {
    this.setState({ open_snack: false });
  };

render(){

	

	return (
				<Grid container style={{padding: '12px'}} justify="center" alignItems="center">
				
					<Grid item md={4}  >
						<WebcamCapture onImageReady={this.handleImageReady} />
					</Grid>
					<Grid item xs={12} md={8} style={{textAlign: 'center'}} >

							{this.state.selectedPatient ? <EditPatient 
									onCancel={this.handleCancel}
									onChange={this.handleChange} 
									selectedPatient={this.state.selectedPatient}
									onSave={this.handleSave}/> : <Button color="secondary" variant="raised" onClick={this.handleEnableAddMode}> Novo Teste</Button>}
					</Grid>
		       		<Grid item xs={12} md={12}>
							{
			this.state.patients.map((patient,index) =>{
			return <Patient key={index}	patient={patient} onSelect={this.handleSelect} onDelete={this.handleDelete} onAnalysisRequest={this.handleAnalysisRequest}	/>
			})	

		}
					</Grid>
					 <Snackbar
				          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				          open={this.state.open_snack}
				          autoHideDuration={6000}
				           onClose={this.handleClose}
				          ContentProps={{
				            'aria-describedby': 'message-id',
				          }}
				          message={<span id="message-id">Abra um teste ou crie um novo para capturar uma fotografia</span>}
				        />
				</Grid>
	)
}




}
export default withStyles(styles)(PatientTable);