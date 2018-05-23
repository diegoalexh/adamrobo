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
    this.handleChange = this.handleChange.bind(this)
    this.getBase64 = this.getBase64.bind(this)
  }
  getBase64(file,props) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
      props.onImageReady(reader.result) ;
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
  }
  handleSnap(props){
    var last = this.webcam.getScreenshot();
    this.setState({snap:last })
    setTimeout(5000, this.setState({snap: '' }))
    this.props.onImageReady(last)
  }
  handleChange(e){
   // this.getBase64( e.target.files[0],this.props);
   // let reader = new FileReader();
      //      reader.onload = (e) => {
          //       this.props.onImageLoaded( e.target.result)
         //   };
          //  reader.readAsDataURL(e.target.files[0]);

           this.props.onImageLoaded(e.target.files[0])
    
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
        id="raised-button-file" onChange={ (e) => this.handleChange(e) }
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