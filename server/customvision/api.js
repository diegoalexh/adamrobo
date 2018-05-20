const baseUrl = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/3c3d4e5f-ceac-466e-864d-69d22936e1b7/image?iterationId=7753bb99-85f5-40cf-8d8d-5c3889aa4a50';
//const baseUrl = 'https://brazilsouth.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&language=en';

var fetch = require('fetch-everywhere');
const env = require('../environment/environment');

const customVisionApi = {
	analyzeUrl(image_url){
		console.log("Analysing image url " +  image_url)
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}`,{
					method: 'POST',
					body: JSON.stringify({"url": image_url}),
					headers: {
						'Content-Type': 'application/json',
						'Prediction-Key' : `${env.predictionkey}`,
					}
			})
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});
	}, 
	analyzeData(data){
		console.log("Analysing data content ")
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}`,{
					method: 'POST',
					body: data,
					headers: {
						'Content-Type': 'application/octet-stream',
						//'Ocp-Apim-Subscription-Key' : `${env.OcpApimSubscriptionKey}`,
						'Prediction-Key' : `${env.predictionkey}`,
					}
			})
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});
	}, 
}

module.exports = customVisionApi;