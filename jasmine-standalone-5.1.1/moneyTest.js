import { formatCurrency } from "../scripts/utils/money.js";

describe('test suite: formatCurrency', () => { //describe() creates a test suite    
    it('converts cents into dollars', () => { //it() creates a test 
        expect(formatCurrency(2095)).toEqual('20.95'); //expect compares values
    }); 
    it('checks for 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('checks for rounding down to nearest cent', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });
    it('checks for rounding up to nearest cent', () => {
        expect(formatCurrency(2000.6)).toEqual('20.01'); 
    });
});