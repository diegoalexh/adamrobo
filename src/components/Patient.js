import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const Patient = (props) => {

return (
	  <Card onClick={()=> props.onSelect(props.patient)} >
	  <CardContent>
          <Typography color="textSecondary">
           {props.patient._id}
          </Typography>
          <Typography variant="headline" component="h2">
           {props.patient.name}
          </Typography>
          <Typography  color="textSecondary">
          {props.patient.score}
          </Typography>
          
        </CardContent>
		<CardActions>
          <Button size="small" onClick={(e)=> props.onDelete(e, props.patient)}> Remover</Button>
        </CardActions>
		</Card>
	)

}

export default Patient;