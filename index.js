/**
 * Generate receipts from input data
 * Export a function literal
 */

const taxAdditional = {
	'standard':0.0,
	'imported':5.0
}
const taxGoods = {
	'standard' : 10,
	'medical' : 0,
	'books'   : 0,
	'food'    : 0
}
function Receipt() {
	
	let _items = [];

	function setItems(data = []) {
		items = data;
		// TODO: validate data!
	}
	/**
	 * Compute taxes. Opt shall contain type,category and price.
	 * @param  {Object} opt [description]
	 * @return {[type]}     [description]
	 */
	function _computeTax(opt = {}) {
		
		const { type, category, price} = opt;
		const tax  = taxGoods[category] || 0.0;
		const specialTax = taxAdditional[type] || 0.0;				
		
		// tax
		return price * (tax + specialTax)


	}
	/**
	 * Print receipt
	 * @param  {[type]} receipt [description]
	 * @return {[type]}         [description]
	 */
	function printRcpt(receipt) {

	}
	function generate(mode='print') {
		let basicStruct = {
			"name":""
			"type":""
			"quantity":"0"
			"price":"0"		
		}
		let receipt = [];
		let totalRcpt = 0.0;
		let saleTaxes = 0.0;
		
		_items.forEach((v,i) => {
			item = Object.assign(basicStruct, v);
			if (!isNaN(item.price) && parseFloat(item.price) > 0) {				
				
				// Total for this item
				const total   = parseFloat(item.price) * parseFloat(item.quantity)
				let temp = `${qty} ${item.name}: ${total}`;
				receipt.push(temp);
				// Total tax for this item
				saleTaxes += _computeTax(item);
				totalRcpt += total;
			}
		});
		totalRcpt += saleTaxes;
		receipt.push(`Sales Taxes:${saleTaxes}`);
		receipt.push(`Total:${saleTaxes}`);
		if (mode == 'print')
			printRcpt(receipt);
		
		return receipt;

	}
	return {
		generate,
		setItems
	}
} 

module.exports = Receipt;