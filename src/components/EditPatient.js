import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});
const EditHero = (props) => {

if (props.selectedPatient){
    return (
	<div> 
	 
		<FormControl >
          <InputLabel htmlFor="name">Nome</InputLabel>
          <Input name="name"  value={props.selectedPatient.name}  onChange={props.onChange} />
        </FormControl>
        <FormControl >
          <InputLabel htmlFor="score">Score</InputLabel>
          <Input name="score" value={props.selectedPatient.score} onChange={props.onChange} />
        </FormControl>
        <input
        accept="image/*"
        style={{display: 'none'}}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" className={styles.button}>
          Upload
        </Button>
      </label>
		<Button onClick={()=> props.onSave(props.selectedPatient)} color="primary" variant="raised"> Salvar</Button>
		<Button onClick={()=> props.onCancel()}> Cancelar</Button>
	</div>

    	);

}else{
	return (

		<div></div>
		);
}	
		

}

export default withStyles(styles)(EditHero);