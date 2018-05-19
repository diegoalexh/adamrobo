import React from 'react';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
export default class WebcamCapture extends React.Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }


  constructor(props){
    super(props);
    this.state = {snap: ''}
  }
 
  render() {
    return (
       <Grid container md={12}>
        <Grid item  md={6} >
        <div style={{textAlign:'center', position:'relative'}}>
          <Webcam className="video"
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <Button color="primary" onClick={() => this.props.onImageReady(this.webcam.getScreenshot())} variant="raised" className="capture">Capturar Imagem</Button>
        </div> 
        </Grid>
        <Grid item md={6} >
         <div style={{textAlign:'center', position:'relative'}}>
         <img height={350} src={this.props.original ? this.props.original.image  : this.state.snap}/>
         <p> { this.state.snap ? Date( Date.now()).toString() : '' }</p>
        </div> 
         </Grid>
       
      </Grid>
    );
  }
}