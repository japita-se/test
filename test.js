const fs = require('fs');
const assert = require('assert').strict;
const { Receipt } = require('./lib/index.js');

const testFile = ['data/test_data_1.js','data/test_data_2.js','data/test_data_3.js'];
const expected = {
    'data/test_data_1.js' : [
        '2 book: 24.98',
        '1 music CD: 16.49',
        '1 chocolate bar: 0.85',
        'Sales Taxes:1.5',
        'Total:42.32'
      ],
    'data/test_data_2.js' : [
        '1 imported box of chocolatess: 10.50',
        '1 bottle of perfume: 54.65',
        'Sales Taxes:7.65',
        'Total:65.15'
      ],
    'data/test_data_3.js' : [
        '1 bottle of perfume: 32.19',
        '1 bottle of perfume: 20.89',
        '1 packet of headache pills: 9.75',
        '3 box of imported chocolates: 144.90',
        'Sales Taxes:8.5',
        'Total:207.73'
      ]
};
try {
    testFile.forEach((v,i) => {
        console.log(`Test ${i}`);
        let data = fs.readFileSync(v);

        data = JSON.parse(data);
        Receipt.setItems(data);
        receipt = Receipt.generate('print');

        assert.deepEqual(receipt, expected[v] );

        console.log(receipt);
    });
    
}
catch(e) {
    console.log(e);
}


