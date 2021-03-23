export default class NumberFormatter {
    constructor() {}

    
    static formater() {
        return function(input) {
            var output = ('000' + parseInt(input)).slice(-3);
            return output;
        }
    }
}