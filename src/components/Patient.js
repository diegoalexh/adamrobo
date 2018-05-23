import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import grey from '@material-ui/core/colors/grey';
import { CirclePie } from 'salad-ui.chart';

var moment = require('moment');
require('moment/locale/pt-br');
const Patient = (props) => {


return (
	  <Card  style={{backgroundColor: grey['300']}}>
	  <CardContent>
      <Grid container md={12}>
          <Grid item md={9}>
         
         <Typography variant="headline" component="h2" >
           {props.patient.name}           
          </Typography>
           <Typography  color="textSecondary">
          {props.patient.email}  
          </Typography>
         <Typography  color="textSecondary">
              {props.patient.image_ref ? <img  height={100}  src={'/api/images/' +  props.patient.image_ref }/> : ''} 
          </Typography>
          </Grid>
          <Grid item md={3} style={{display:  (props.patient.cv_result && props.patient.cv_result.length > 0) ? '': 'none', textAlign:'center'}}>
            <Typography variant="headline" component="h2" >
            Resultado Custom Vision
          </Typography>
           <Typography variant="textSecondary"  >
            {            
                 props.patient.cv_result[0] ?  moment(props.patient.cv_result[0]['created']).format('LLLL')   : ''
            }
          </Typography>
          <br/>

          <Typography variant="textSecondary"  >
          <div style={{display: 'flex' , textAlign: 'center'}}>
          {            
            (props.patient.cv_result[0] && props.patient.cv_result[0].predictions.length > 0) ? props.patient.cv_result[0].predictions.map(item=>{ return  <Grid  md={12}>
            <CirclePie
            width={100}
            height={100}
            strokeWidth={7}
            percent={parseFloat(Math.round(item.probability * 100)).toFixed(3)}
          /><br/>{ item.tagName} <br/>{
            }</Grid> 
            })  : ''  
            }
          </div>
          </Typography>
          <div style={{textAlign:'center'}}>
           <IconButton  aria-label="Delete"  onClick={(e)=> props.onAnalysisRequest(e, props.patient)}> 
              <Icon>remove_red_eye</Icon>
            </IconButton> 
               <Typography variant="textSecondary" >
            Analisar Novamente
          </Typography>
          </div>
          </Grid>


          <Grid item md={3} style={{display:  props.patient.cv_result.length === 0 ? '': 'none',textAlign: 'center'}}  justify="center" alignItems="center" >
          <IconButton  aria-label="Delete"  onClick={(e)=> props.onAnalysisRequest(e, props.patient)}> 
              <Icon>remove_red_eye</Icon>
            </IconButton> 
               <Typography variant="textSecondary" >
            Analisar com Custom Vision
          </Typography>
          </Grid>
        </Grid>
        </CardContent>
		    <CardActions>
           <IconButton aria-label="Edit" onClick={()=> props.onSelect(props.patient)}>
              <Icon>edit</Icon>
          </IconButton>   
          <IconButton  aria-label="Delete"  onClick={(e)=> props.onDelete(e, props.patient)}> 
              <Icon size="small" >delete</Icon>
          </IconButton>
        </CardActions>
		</Card>
	)

}

export default Patient;