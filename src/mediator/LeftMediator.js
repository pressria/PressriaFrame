import BaseMediator from './base/BaseMediator';
import $ from '../js/lib/jquery-3.7.1.min.js';

class LeftMediator extends BaseMediator {
	constructor(viewId) {
		super();
	}

	respondToLoginSuccess(mediator, data) {
		if(data.success) {
			$("#shopListBtn").off("click").on("click", (e)=>{
				mediator.notification(mediator.config.GET_SHOP_LIST, {});
			});

			$("#shopUsageBtn").off("click").on("click", (e)=>{
				mediator.notification(mediator.config.GET_SHOP_USAGE, {});
			});
		}
	}

	respondToGetShopList(mediator, data) {
		let sendData = {
			'receiver': mediator.config.RECEIVE_SHOP_LIST
			, 'namespace' : "shop.Shop.getShopList"
			, "data": {
				'type': 'all'
			}
		}
		mediator.notification(mediator.config.CLIENT_TO_SERVER, sendData);
	}

	respondToGetShopUsage(mediator, data) {
		let sendData = {
			'receiver': mediator.config.RECEIVE_SHOP_USAGE
			, 'namespace' : "shop.Shop.getShopUsage"
			, "data": {
				'type': 'all'
			}
		}
		mediator.notification(mediator.config.CLIENT_TO_SERVER, sendData);
	}

}

export default LeftMediator;