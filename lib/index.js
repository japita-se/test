/**
 * Generate receipts from input data
 * Export a function literal
 */

const taxAdditional = {
	'standard':0.0,
	'imported':5.0
};
const taxGoods = {
	'standard' : 10,
	'medical' : 0,
	'books'   : 0,
	'food'    : 0
};
function Receipt() {
	
	let _items = [];

	function setItems(data = []) {
		_items = data;
		// TODO: validate data!
	}
	/**
	 * Compute taxes. Opt shall contain type,category and price.
	 * @param  {Object} opt [description]
	 * @return {[type]}     [description]
	 */
	function _computeTax(opt = {}) {
		
		let { type, category, price} = opt;
		// if the category is not set, return standard
		price = parseFloat(price);
		const tax  = taxGoods[category] !== undefined ? taxGoods[category] :  taxGoods['standard'];
		const specialTax = taxAdditional[type] || 0.0;				
		
		// tax
		num =  (price * (tax + specialTax) / 100.0);
		return Math.round(num * 20) / 20;
	}
	/**
	 * Print receipt
	 * @param  {[type]} receipt [description]
	 * @return {[type]}         [description]
	 */
	function printRcpt(receipt) {

	}
	function generate(mode = 'print') {
		let basicStruct = {
			"name":"",
			"type":"",
			"quantity":"0",
			"price":"0"		
		};
		let receipt = [];
		let totalRcpt = 0.0;
		let saleTaxes = 0.0;
		
		_items.forEach((v,i) => {
			item = Object.assign(basicStruct, v);
			if (!isNaN(item.price) && parseFloat(item.price) > 0) {				
				
				// Total for this item
				let temp = _computeTax(item);
				saleTaxes +=  temp;
				
				const total   = parseFloat(item.price) * parseFloat(item.quantity);
				let currTotal = (total + temp).toFixed(2);
				let o = `${item.quantity} ${item.name}: ${currTotal}`;
				receipt.push(o);
				// Total tax for this item
			
				totalRcpt += total;
			}
		});

		saleTaxes = parseFloat(saleTaxes.toFixed(2));

		totalRcpt += saleTaxes;
	  
		receipt.push(`Sales Taxes:${saleTaxes}`);
		receipt.push(`Total:${totalRcpt}`);
		if (mode == 'print')
			printRcpt(receipt);
		
		return receipt;

	}
	return {generate,setItems};
} 

module.exports.Receipt = new Receipt();