import Config from './Config';

class BaseMediator {
	constructor() {
		this.observers = {};
		//Singleton으로 정의된 config에서 Message 및 상태관리
		//Message and state management in config defined as a singleton.
		this.config = Config.instance;
	}

	get mediators() {
		return this._mediator;
	}
	set mediators(_mediators) {
		this._mediators = _mediators;
		this.setMediators(_mediators);
	}

	//class(mediator)안의 method이름 중에 respondTo 라고 정의된 method를 필터링한다. 
	//Filters for methods with method names in class(mediator) that are defined as respondTo.
	setMediators(mediators) {
		for (var key in mediators) {
			var item = mediators[key];
			//주어진 class(mediator)에서 method를 가져온다. Gets a method from the given class (mediator).
			for (let name of Object.getOwnPropertyNames(Object.getPrototypeOf(item))) {
				let method = item[name];

				if (!(method instanceof Function) || method === item)
					continue;

				if (name.indexOf("respondTo") != -1) {
					let notifyStr = name.substring(9);
					this.addObserver(notifyStr, item, method);
				}
			}
		}
	}

	//respondTo로 정의된 class(Mediator)와 method(callBack)를 this.observers에 담는다.
	//This observers contains the class (Mediator) and method (callBack) defined by respondTo.
	addObserver(notifyName, observer, callBack) {
		let obs = this.observers[notifyName];

		if (!obs) {
			this.observers[notifyName] = [];
		}
		let obj = { observer: observer, callBack: callBack };
		this.observers[notifyName].push(obj);
	}

	//notifyName를 가지고 mediator와 method를 찾고 호출한다.
	//Find and call the mediator and method with notifyName.
	notification(notifyName, data) {
		let obs = this.observers[notifyName];
		if (obs === undefined) {
			console.log("can't find " + notifyName);
			return;
		}
		for (var x = 0; x < obs.length; x++) {
			var obj = obs[x];
			obj.callBack(obj.observer, data);
		}
	}

	//mediator를 제거한다. 실제 프로젝트에서는 한번도 사용을 하지 않음.
	//Remove the mediator. Never used in a real project.
	removeObserver(observer, notifyName) {
		var obs = this.observers[notifyName];

		if (obs) {
			for (var x = 0; x < obs.length; x++) {
				if (observer === obs[x].observer) {
					obs.splice(x, 1);
					observers[notifyName] = obs;
					break;
				}
			}
		}
	}

	setCookieValue(key, value, path='', minute = 1) {
		var date = new Date();
		date.setTime(date.getTime() + minute * 60 * 24);
		document.cookie = key + '=' + value + ';expires=' + date.toUTCString() + ';path=/' + path;
	}

	getCookie(name) {
		name += "=";
		var arr = decodeURIComponent(document.cookie).split(';');
		for (var i = 0; i < arr.length; i++) {
			var c = arr[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}

	getStyle(id, style) {
		let elem;
		if(id.charAt(0) === "#") {
			id = id.substr(1, id.length-1);
			elem = document.getElementById(id);
		}
		else if(id.charAt(0) === ".") {
			id = id.substr(1, id.length-1);
			let elemArr = document.getElementsByClassName(id);
			elem = elemArr[0];
		}
		else {
			elem = document.getElementById(id);
		}
		
		if(elem === null) {
			return null;
		}
		let gStyle = window.getComputedStyle(elem);
		if(style === "width" || style === "height" || style === "left" || style === "top") {
			return Number(gStyle[style].replace("px",""));
		}
		return gStyle[style];
	}

	getEleStyleClass(id, style) {
		let elem = document.getElementsByClassName(id);
		let element = Array.from(elem);
		let gStyle = window.getComputedStyle(element[0]);
		if(style === "width" || style === "height" || style === "left" || style === "top") {
			return Number(gStyle[style].replace("px",""));
		}
		return gStyle[style];
	}

	setStyle(objId, propObject) {
		let type = 'id';
		if(objId.charAt(0) === ".") {
			type = 'class';
			objId = objId.substr(1, objId.length-1);
		}
		else if(objId.charAt(0) === "#") {
			objId = objId.substr(1, objId.length-1);
		}
		let elem;
		if(type === 'id') {
			elem = document.getElementById(objId);
		}
		else if(type === 'class') {
			elem = document.getElementsByClassName(objId);
		}

		if(elem === null) {
			console.log(objId + ' is NULL.');
			return;
		}

		for (let property in propObject) {
			let value = propObject[property];
			if(property === "width" || property === "height") {
				if (typeof value === 'number') {
					value = value + "px";
				}
				else {
					if(value.indexOf("%") === -1) {
						value = value + "px";
					}
				}
			}
			else if(property === "left" || property === "top"
				|| property.indexOf('padding') !== -1 || property.indexOf('margin') !== -1
			) {
				value = value + "px";
			}
			if(type === 'class') {
				let element = Array.from(elem);
				for(let i in element) {
					element[i].style[property] = value;		
				}
			}
			else {
				elem.style[property] = value;
			}
		}
	}
}

export default BaseMediator;
