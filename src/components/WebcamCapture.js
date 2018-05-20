import React from 'react';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
export default class WebcamCapture extends React.Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }


  constructor(props){
    super(props);
    this.state = {snap: ''}
    this.handleSnap = this.handleSnap.bind(this)
  }

  handleSnap(props){
    var last = this.webcam.getScreenshot();
    this.setState({snap:last })
    setTimeout(5000, this.setState({snap: '' }))
    this.props.onImageReady(last)
  }
 
  render() {
    return (
                <div style={{textAlign:'center', position:'relative', marginBottom: '16px', marginRight: '16px'}}>
                <Typography variant="title" color="inherit" >
                  Camera de Captura
               </Typography>
                  <Webcam className="video"
                  audio={false}
                  height={350}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  width={350}
                />
                <Button color="primary" onClick={this.handleSnap} variant="raised" className="capture">Capturar Imagem</Button>

                 <input
        accept="image/*"
        style={{display: 'none'}}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span">
          Carregar Imagem
        </Button>
      </label>
                </div> 
    );
  }
}