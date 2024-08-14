### PressriaFrame
PressriaFrame은 javascript Frame입니다.<br/>
React와 같은 일종의 Frontend Framework입니다.<br/>
Framework이라고 하지 않는 이유는 React와 같이 많은 기능을 내포한 Framework는 아닌 아주 가벼운 Frame입니다.<br/>
Javascript 기반의 Frame이니까 그냥 Frame이라고 하겠습니다.<br/>
<br/>
<br/>
#### 사용방법


#### 1. webpack entry에 정의된 index.js에서 mediator라고 정의된 js class를 등록

```javascript
const serverMediator = new ServerMediator();
const loginMediator = new LoginMediator();
const topMediator = new TopMediator();
const leftMediator = new LeftMediator();
const bodyMediator = new BodyMediator();

const mediators = {
	serverMediator: serverMediator
	, topMediator : topMediator
	, loginMediator : loginMediator
	, leftMediator : leftMediator
	, bodyMediator : bodyMediator
}

for (var key in mediators) {
	var item = mediators[key];
	item.mediators = mediators;
}
```

#### 2. 모든 Mediator는 BaseMediator.js를 상속받음
```javascript
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
```

#### 3. Mediator 호출
PressriaFrame은 Message기반의 frame입니다.<br/>
하나의 정의된 Class(Mediator)는 다른 Class(Mediator)를 호출할때 Direct로 호출 하지 않습니다.<br/>
정의된 Message통해 data와 함께 호출 합니다.<br/>

Sender:

    mediator.notification(mediator.config.GET_SHOP_LIST, {});
    
Receiver:

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

	respondToReceiveShopList(mediator, data) {
		....
	}
    
메세지를 보내고 받는 이 부분이 핵심적인 사용 방법 입니다.<br>
메세지를 받는 부분의 Method 이름의 접두어는 "respondTo~~"로 정의 합니다.<br>
접두어는 변경할수 있습니다. BaseMediator.js에 정의 되어 있습니다.<br>
이렇게 하는 이유는 재사용성에 있습니다. <BR>
예를 들면 TopMediator.js를 다른 프로젝트에다가 사용해도 문제 없이 돌아갑니다.<br>
여러 사람이 동시에 작업 할때 관섭 받지 않고 메세지 정의와 Data정의만 하면 잘 돌아갑니다.<br>
특히 서버에 요청하고 Data를 받을때 메세지와 Data, Receiver만 정의해서 소통하면 문제 없습니다<br>

#### 4. Config.js 정의
Singleton Pattern으로 구성되어 있습니다.<br>
모든 Message와 상태변수를 정의 합니다<br>
```javascript
const singleton = Symbol();
const config = Symbol();

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
```

<br>
사실 이러한 형태는 처음 만들어낸 형태는 아니고 예전에 사용했던 PureMVC의 ActionScript에서 사용하던 방식을 형태만 가져와서 Javascript로 만들었습니다.

### Mediator

Mediator(Class)는 하나의 단위 기능입니다.<br>
![image](./output/assets/image/readme_1.jpg)


### Config
메시지와 상태 정의를 config.js에서 합니다.


