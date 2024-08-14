import BaseMediator from './base/BaseMediator';
import $ from '../js/lib/jquery-3.7.1.min.js';

class TopMediator extends BaseMediator {
	constructor(viewId) {
		super();
	}

	respondToLoginSuccess(mediator, data) {
		if(data.success) {
			$("#logoutBtn").off("click").on("click", (e)=>{
				mediator.setStyle("topMenu", {"display": "none"});
				mediator.setStyle("layoutSidenav", {"display": "none"});
	
				$("body").removeClass("sb-nav-fixed");
				mediator.setStyle("loginContainer", {"display": "block", "opacity":"1"});
			})
		}
	}
}

export default TopMediator;
