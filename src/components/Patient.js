import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
const Patient = (props) => {




return (
	  <Card  >
	  <CardContent>
      <Grid container md={12}>
          <Grid item md={6}>
          <Typography variant="headline" component="h2" >
           <IconButton  aria-label="Add an alarm"  onClick={()=> props.onSelect(props.patient)}>
              <Icon>remove_red_eye</Icon>
          </IconButton>  <IconButton  aria-label="Add an alarm"  onClick={(e)=> props.onDelete(e, props.patient)}> 
              <Icon size="small" >delete</Icon>
          </IconButton> {props.patient.name}           
          </Typography>
         <Typography  color="textSecondary">
              {props.patient.image_ref ?<img  height={100}  src={'/api/images/' +  props.patient.image_ref }/> : ''} 
          </Typography>
          </Grid>
          <Grid item md={6}>
          <Typography variant="headline" component="h2" >
            Resultado Custom Vision
          </Typography>
         <Typography  color="textSecondary">
          Positivo para "Catarata"
          </Typography>
          </Grid>



     </Grid>
        </CardContent>
		    <CardActions>
         
          <Button size="small" onClick={(e)=> props.onAnalysisRequest(e, props.patient)}> Analise Com Custom Vision</Button>
        </CardActions>
		</Card>
	)

}

export default Patient;