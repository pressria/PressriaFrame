const singleton = Symbol();
const config = Symbol();

//Singleton Pattern을 사용하여 모든 Message정의와 상태 관리를 한다.
//We use the Singleton Pattern for all message definitions and state management.
class Config {
	constructor(mediator) {
		if (mediator !== config) {
			throw new Error('Cannot construct singleton');
		}

		this.providerUrl = location.protocol + "//" + location.hostname;

		this.LOGIN_SUCCESS = "LoginSuccess";
		this.RECEIVE_SHOP_LIST = "ReceiveShopList";
		this.RECEIVE_SHOP_USAGE = "ReceiveShopUsage";
		this.GET_SHOP_LIST = "GetShopList";
		this.GET_SHOP_USAGE = "GetShopUsage";
		this.CLIENT_TO_SERVER = "ClientToServer";
	}

	static get instance() {
		if (!this[singleton]) {
			this[singleton] = new Config(config);
		}

		return this[singleton];
	}
}

export default Config;
