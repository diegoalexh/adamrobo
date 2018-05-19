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

const EditPatient = (props) => { 

if (props.selectedPatient){
    return (
	<div style={{textAlign: 'center'}}> 

      <Card style={{padding: '16px'}}>
		    <FormControl >
          <InputLabel htmlFor="name">Nome</InputLabel>
          <Input name="name"  value={props.selectedPatient.name}  onChange={props.onChange} />
        </FormControl>
        <FormControl >
          <InputLabel htmlFor="score">Score</InputLabel>
          <Input name="score" value={props.selectedPatient.score} onChange={props.onChange} />
        </FormControl>
         <FormControl disabled >
          <InputLabel htmlFor="score">Imagem</InputLabel>
          <Input name="image" value={props.selectedPatient.image ? 'Capurada!' : ''}  />
        </FormControl>
        <input
        accept="image/*"
        style={{display: 'none'}}
        id="raised-button-file"
        multiple
        type="file"
      />
      <CardActions style={{textAlign: 'center'}} disableActionSpacing>
		<Button onClick={()=> props.onSave(props.selectedPatient)} color="primary" variant="raised"> Salvar</Button>
		<Button onClick={()=> props.onCancel()}> Cancelar</Button>
</CardActions>
    <small>{ moment(props.selectedPatient.created).format('h:mm:ss a')  }</small>
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