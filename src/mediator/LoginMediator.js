import BaseMediator from './base/BaseMediator';
import $ from '../js/lib/jquery-3.7.1.min.js';

class LoginMediator extends BaseMediator {
	constructor(viewId) {
		super();
	}

	init() {
		let mediator = this;
		$("#loginBtn").on("click", (e)=>{
			let userId = $("#Username").val();
			let userPw = $("#password").val();
			if( userId === "") {
				alert("Enter your user name!");
				return;
			}
			if( userPw === "") {
				alert("Enter your password!");
				return;
			}

			let sendData = {
				//LOGIN_SUCCESS는 LoginMediator, TopMediator, LeftMediator 에서 동시에 받는다 
				//어느 class인지 상관없이 respondToLoginSuccess 라는 method만 정의 되어 있으면 동시에 받는다.
				//LOGIN_SUCCESS is received simultaneously by LoginMediator ,TopMediator and LeftMediator.
				//It doesn't matter which class it is, as long as it has a method called respondToLoginSuccess defined, it will receive it at the same time.
				'receiver': mediator.config.LOGIN_SUCCESS
				, 'namespace' : "login.Login.checkLogin"
				, "data": {
					'userId': userId
					, 'userPw': userPw
				}
			}
			mediator.notification(mediator.config.CLIENT_TO_SERVER, sendData);
		});

		this.setStyle("topMenu", {"display": "none"});
		this.setStyle("layoutSidenav", {"display": "none"});
	}

	respondToLoginSuccess(mediator, data) {
		if(data.success) {
			$("#loginContainer").animate({opacity: '0%'}, {
				duration: 500
				, complete: function () {
					mediator.setStyle("loginContainer", {"display": "none"});
					$("body").addClass("sb-nav-fixed");
					mediator.setStyle("topMenu", {"display": "flex"});
					mediator.setStyle("layoutSidenav", {"display": "block"});
					mediator.notification(mediator.config.GET_SHOP_LIST, {});
				}
			});
		}
	}
}

export default LoginMediator;
