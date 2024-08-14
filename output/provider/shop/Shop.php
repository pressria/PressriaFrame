<?php
class Shop {
	public function __construct() {}

	public function getShopList(object $data):Array {
		$sendArr = [];
		for($i = 0 ; $i < 10 ; $i++) {
			array_push($sendArr, array(
				'shopName'=> "Test Shop {$i}"
				, 'ceoName' => 'James Watson'
				, 'shopUrl' => "https://www.test{$i}.com"
				, 'startDate' => date('Y-m-d')
			));
		}
		
		return $sendArr;
	}

	public function getShopUsage(object $data):Array {
		$sendArr = [];
		for($i = 0 ; $i < 10 ; $i++) {
			array_push($sendArr, array(
				'shopName'=> "Test Shop {$i}"
				, 'membershipName' => 'Standard'
				, 'template' => "0"
				, 'text' => "0"
				, 'image' => "0"
				, 'clipart' => "0"
				, 'pdf' => "0"
				, 'expire_day' => date('Y-m-d')
				, 'shopUrl' => "https://www.test{$i}.com"
			));
		}
		
		return $sendArr;
	}
}
?>