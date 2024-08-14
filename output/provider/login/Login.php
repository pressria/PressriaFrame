<?php
class Login {
	public function __construct() {}
	
	public function checkLogin(object $data):Array {
		// 아이디 비번을 체크하는 로직을 넣는다.
		// Include logic to check the username and password.
		return array("success"=> true);
	}
}
?>