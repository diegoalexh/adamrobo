import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import moment from 'moment'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const EditPatient = (props) => { 

if (props.selectedPatient){
  return (
	<div style={{textAlign: 'center',height: '100%'}}> 
      <Card style={{padding: '16px'}}>
          <Typography variant="title" color="inherit" >
           {props.selectedPatient._id ? 'Editar Teste' : 'Adicionar Teste'} 
          </Typography>
		    <FormControl style={{margin: '16px'}}>
          <InputLabel htmlFor="name">Nome</InputLabel>
          <Input name="name"  value={props.selectedPatient.name}  onChange={props.onChange} />
        </FormControl>
        <FormControl style={{margin: '16px'}} >
          <InputLabel htmlFor="score">Email</InputLabel>
          <Input name="email" value={props.selectedPatient.email} onChange={props.onChange} />
        </FormControl>
          {props.selectedPatient.image ?  <img  height={100}  src={ props.selectedPatient.image }/> : (props.selectedPatient.image_ref ? <img  height={100}  src={'http://localhost:3001/api/images/' +  props.selectedPatient.image_ref }/> : '') } 
		<br/><br/><Button onClick={()=> props.onSave(props.selectedPatient)} color="primary" variant="raised">  {props.selectedPatient._id ? 'Atualizar' : 'Salvar'} </Button>
		<Button onClick={()=> props.onCancel()}> Cancelar</Button>
  
</Card>
      
	</div>

    	);

}else{
	return (

		<div></div>
		);
}	
		

}

export default (EditPatient);