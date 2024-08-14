import BaseMediator from './base/BaseMediator';
import axios from 'axios';

class ServerMediator extends BaseMediator {
	constructor() {
		super();
	}

	respondToClientToServer(mediator, data) {
		let sendData = JSON.stringify(data);
		const params = new URLSearchParams();
		params.append('data', sendData);
		axios.post(
			mediator.config.providerUrl + "/provider/"
			, params
			, { headers: { "Content-Type": "application/x-www-form-urlencoded"} }
		)
		.then(function (retData) {
			let receiveData = retData.data;
			if (receiveData.receiver !== "") {
				mediator.notification(receiveData.receiver, JSON.parse(receiveData.data));
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export default ServerMediator;
