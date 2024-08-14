<p>PressriaFrame은 javascript Frame입니다.</p>
<div>쉽게 이야기 하자면 React와 같은 Frontend Framework입니다.</div>
<div>Framework이라고 하지 않는 이유는 React와 같이 많은 기능을 내포하는 그러한 Framework는 아니여서 입니다. </div>
<div>Javascript 기반의 Frame이니까 그냥 Frame이라고 하겠습니다.</div>
<div>PressriaFrame은 Message기반의 frame입니다.</div>
<div>하나의 정의된 Class(Mediator)는 다른 Class를 호출할때 Direct로 호출 하지 않습니다.</div>
<div>정의된 Message를 data와 함께 호출 합니다.</div>
<div>보내는쪽: <br> mediator.notification(mediator.config.GET_SHOP_LIST, {});</div>
<br>
<div>받는 쪽:<br> &nbsprespondToGetShopList(mediator, data) {<br>
&nbsp&nbsplet sendData = {<br>
&nbsp&nbsp&nbsp'receiver': mediator.config.RECEIVE_SHOP_LIST<br>
&nbsp&nbsp&nbsp, 'namespace' : "shop.Shop.getShopList"<br>
&nbsp&nbsp&nbsp, "data": {<br>
&nbsp&nbsp&nbsp&nbsp'type': 'all'<br>
&nbsp&nbsp&nbsp}<br>
&nbsp&nbsp}<br>
&nbsp&nbspmediator.notification(mediator.config.CLIENT_TO_SERVER, sendData);<br>
&nbsp}<br>
</div>
