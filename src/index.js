import ServerMediator from './mediator/ServerMediator';
import LoginMediator from './mediator/LoginMediator';
import TopMediator from './mediator/TopMediator';
import LeftMediator from './mediator/LeftMediator';
import BodyMediator from './mediator/BodyMediator';
import './scss/style.scss';

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

//Mediator(Class)에서 respondTo로 되어 있는 Method를 찾고 사용할수 있도록 한다.
//Find the Method in Mediator(Class) that has respondTo and make it available.
for (var key in mediators) {
	var item = mediators[key];
	item.mediators = mediators;
}

window.onload = function(){
	loginMediator.init();
}

