var calculator = {
    input: document.querySelector('#my-input'),
    numbers: document.querySelectorAll('.number'),
    commands: document.querySelectorAll('.command'),
    operators: document.querySelectorAll('.operator'), 

    //calculation variables 
    numberA: "",
    operator: "",
    numberB: "",
    isNumberADecimal: false,
    isNumberBDecimal: false,

    addToCalculation : function(value) {
        //positive numberA        
        if(!isNaN(value) && this.operator == ""){
            this.numberA += value;  
        }

        //negative numberA
        else if(!isNaN(value) && this.numberA == "" && (this.operator == "" || this.numberB == "")){
            this.numberA = -value;
            this.operator = "";
        }
        
        //operator
        else if(isNaN(value)){
            this.operator = value;
        }
        
        //numberB 
        else if(!isNaN(value) && this.numberA != ""){
            this.numberB  += value;
        }   
    }, 

    deleteLastOne: function(){
        if(this.input.value == '0') { return; }

        if(this.numberA != "" && this.operator == "" && this.numberB == ""){
            let calc = this.numberA + "";
            let last = calc.length;
            this.numberA = calc.slice(0, last - 1);
            
            if(this.numberA / this.numberA != 1){
                this.input.value = 0;
                this.numberA = "";
                return;
            }
        }
        else if(this.numberA != "" && this.operator != "" && this.numberB == ""){
            this.operator = "";
            this.input.value = this.numberA;
            return;
        }
        else if(this.operator != "" && this.numberB != ""){
            let calc = this.numberB + "";
            let last = calc.length;
            this.numberB = calc.slice(0, last - 1);
            
            if(this.numberB / this.numberB != 1) { 
                this.numberB = "";
            }
        }
        let calc = this.input.value + "";
        let last = calc.length;
        if(this.input.value[last - 1] == " "){
            this.input.value = calc.slice(0, last - 3);    
        }
        else{
            this.input.value = calc.slice(0, last - 1);    
        }
    },

    cleanAll: function(){
        this.input.value = 0;
        this.numberA = this.numberB = this.operator = "";
    },

    getNumber: function(){
        if(this.input.value == 0){
            this.input.value = event.target.value; 
        }
        else{
            this.input.value += event.target.value; 
        }

        number = event.target.value + "";

        return number;
    },

    getOperator: function(event){
        switch(event.target.value){
            case "+": this.operator = " + "; break;
            case "-": this.operator = " - "; break;
            case "x": this.operator = " x "; break;
            case "/": this.operator = " / "; break;
            case "%": this.operator = " % "; break;
        }
        
        if(this.numberA == "")
        {
            if(this.operator != ' - '){
                return this.operator = "";
            }
            else{

            }
        }

        if(this.operator != " √ "){
            this.input.value = this.numberA + this.operator;
        }

        return this.operator;
    },

    addPoint : function(){
        if(this.numberA != "" && this.operator == ""){
            if(this.numberA.includes('.')){ 
                return; 
            }
            else{
                this.isNumberADecimal = true;
                this.input.value += '.';
                this.numberA += '.';
            }
        }
        else if(this.operator != "" && this.numberB != ""){
            if(this.numberB.includes('.')){ 
                return; 
            }
            else{
                this.isNumberBDecimal = true;
                this.input.value += '.';
                this.numberB += '.';
            }
        }
    },

    convertToDecimal: function(number){
        let point = number.indexOf('.');
        let last = number.length;
        
        let leftPoint = number.slice(0, point);
        let rightPoint = number.slice(point, last);

        return (leftPoint * 1.0) + (rightPoint / 1);
    },

    thereIsNoDecimal : function(){
        this.isNumberADecimal = false;
        this.isNumberBDecimal = false;
    },

    squareRoot : function(numA){
        if(this.numberA != "" && this.numberB == ""){
            let result = Math.sqrt(numA);

            this.numberA = result;
            this.operator = "";
            this.numberB = "";
            return this.input.value = result;
        }
    },

    sum: function(numA, numB){
        return numA + numB;
    },

    subtract: function(numA, numB){
        return numA - numB;
    },

    multiply: function(numA, numB){
        return numA * numB;
    },

    divide: function(numA, numB){
        return numA / numB;
    },

    getPercent: function(numA, numB){
        return (numA / 100) * numB;
    }
}

document.addEventListener('click', function (event) {
    if(event.target.classList.contains('number')){
        let number = calculator.getNumber();
        calculator.addToCalculation(number);
    }
    else if(event.target.classList.contains('operator')){
        let operator = calculator.getOperator(event);
        calculator.addToCalculation(operator);

        if(event.target.value == "√"){
            calculator.squareRoot(calculator.numberA);
        }
    }
    else if(event.target.classList.contains('command')){
        if(event.target.value == 'del'){
            calculator.deleteLastOne();
        }
    
        if(event.target.value == 'AC'){
            calculator.cleanAll();
        }
    }
    else if(event.target.classList.contains('punctuation')){
        calculator.addPoint();
    }

    if((calculator.numberA != "" && 
        calculator.operator != "" && 
        calculator.numberB != "") && 
        (event.target.classList.contains('operator') || (event.target.value === 'equals'))){
    
        calculator.numberA += "";            
        calculator.numberB += "";            

        if(!calculator.numberA.includes('.') || !calculator.numberB.includes('.')){
            calculator.thereIsNoDecimal();
        }

        if(calculator.isNumberADecimal || calculator.isNumberBDecimal){
            if(calculator.isNumberADecimal){
                var tempA = calculator.convertToDecimal(calculator.numberA);
            }    
            if(calculator.isNumberBDecimal){
                var tempB = calculator.convertToDecimal(calculator.numberB);
            }
        }
        else {
            var tempA = parseFloat(calculator.numberA);
            var tempB = parseFloat(calculator.numberB);
            var result = "";  
        }

        switch(calculator.operator.trim()){
            case "+": result = calculator.sum(tempA, tempB); break;
            case "-": result = calculator.subtract(tempA, tempB); break;
            case "x": result = calculator.multiply(tempA, tempB); break;
            case "/": result = calculator.divide(tempA, tempB); break;
            case "%": result = calculator.getPercent(tempA, tempB); break;
            default: result = "wtf did you try to calculate bro";
        }

        if(event.target.value === 'equals'){
            calculator.numberA = result;
            calculator.operator = "";
            calculator.numberB = "";
            calculator.input.value = result;
        }
        else if(event.target.classList.contains('operator')){
            if(event.target.value == "√"){
                calculator.numberA = result;
                calculator.numberB = "";
                calculator.squareRoot(calculator.numberA);
                return;
            }
            
            calculator.numberA = result;
            calculator.operator = calculator.getOperator(event);
            calculator.numberB = "";
            calculator.input.value = result + calculator.operator;
        }
    }

}, false);