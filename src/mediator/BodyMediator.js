import BaseMediator from './base/BaseMediator';
import $ from '../js/lib/jquery-3.7.1.min.js';

class BodyMediator extends BaseMediator {
	constructor(viewId) {
		super();
	}

	respondToReceiveShopList(mediator, data) {
		document.getElementById('shopTitle').textContent = "Shop List";
		$("#shopListTable").remove();
		let shopList = `
		<table id="shopListTable" class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Shop Name</th>
					<th scope="col">Ceo Name</th>
					<th scope="col">Shop URL</th>
					<th scope="col">Start Date</th>
				</tr>
			</thead>
			<tbody id="shopBody">
			</tbody>
		</table>`;
		$("#mainContents").append(shopList);

		for(let i in data) {
			let shopInfo = `
			<tr class='shop_tr'>
				<th scope="row">${parseInt(i)+1}</th>
				<td>${data[i].shopName}</td>
				<td>${data[i].ceoName}</td>
				<td>${data[i].shopUrl}</td>
				<td>${data[i].startDate}</td>
			</tr>`;
			$("#shopBody").append(shopInfo);
		}
	}

	respondToReceiveShopUsage(mediator, data) {
		document.getElementById('shopTitle').textContent = "Shop Usage";
		$("#shopListTable").remove();
		let shopList = `
		<table id="shopListTable" class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Shop Name</th>
					<th scope="col">Membership</th>
					<th scope="col">Template</th>
					<th scope="col">Text</th>
					<th scope="col">Image</th>
					<th scope="col">Clipart</th>
					<th scope="col">PDF</th>
					<th scope="col">Expire</th>
					<th scope="col">Shop Url</th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody id="shopBody">
			</tbody>
		</table>`;
		$("#mainContents").append(shopList);

		for(let i in data) {
			let shopInfo = `
			<tr class='shop_tr'>
				<th scope="row">${parseInt(i)+1}</th>
				<td>${data[i].shopName}</td>
				<td>${data[i].membershipName}</td>
				<td>${data[i].template}</td>
				<td>${data[i].text}</td>
				<td>${data[i].image}</td>
				<td>${data[i].clipart}</td>
				<td>${data[i].pdf}</td>
				<td>${data[i].expire_day.split(' ')[0]}</td>
				<td>${data[i].shopUrl}</td>
				<td>
					<i class="bi bi-pencil-fill shopEdit"></i>
					<i class="bi bi-x-circle-fill shopEdit"></i>
				</td>
			</tr>`;
			$("#shopBody").append(shopInfo);
		}
	}
}

export default BodyMediator;
