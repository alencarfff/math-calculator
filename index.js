var calculator = {
    input: document.querySelector('#my-input'),
    numbers: document.querySelectorAll('.number'),
    commands: document.querySelectorAll('.command'),
    operators: document.querySelectorAll('.operator'), 

    //calculation variables 
    numberA: "",
    operator: "",
    numberB: "",

    addToCalculation : function(value) {        
        //if value is the numberA
        if(!isNaN(value) && this.operator == ""){
            this.numberA += value;
        }
        else if(isNaN(value)){
            this.operator = value;
        }
        else{
            this.numberB  += value;
        }   
    }, //adicionar calculo instantaneo ao clicar em um outro operador após já ter o numberB 

    deleteLastOne: function(){
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
        let number = "";
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
            case "add": operator = " + "; break;
            case "sub": operator = " - "; break;
            case "mul": operator = " x "; break;
            case "div": operator = " / "; break;
            case "per": operator = " % "; break;
        }
        
        this.input.value += operator;

        return operator;
    },

    sum: function(numberA, numberB){
        return numberA + numberB;
    },

    subtract: function(numberA, numberB){
        return numberA - numberB;
    },

    multiply: function(numberA, numberB){
        return numberA * numberB;
    },

    divide: function(numberA, numberB){
        return numberA / numberB;
    },

    getPercent: function(numberA, numberB){
        return Math.floor(numberA / numberB * 1);
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
    }
    else if(event.target.classList.contains('command')){
        if(event.target.value == 'del'){
            calculator.deleteLastOne();
        }
    
        if(event.target.value == 'AC'){
            calculator.cleanAll();
        }
    }

    console.log("numberA : " + calculator.numberA);
    console.log("operator : " + calculator.operator);
    console.log("numberB : " + calculator.numberB + "\n\n");
    

    if((calculator.numberA != "" && 
        calculator.operator != "" && 
        calculator.numberB != "") && 
        (event.target.classList.contains('operator') || (event.target.value === 'equals'))){
            
        //finally convert numbers to integer and finalize calculation;
        let tempA = parseInt(calculator.numberA);
        let tempB = parseInt(calculator.numberB);
        let result = "";

        switch(calculator.operator.trim()){
            case "+": result = calculator.sum(tempA, tempB); break;
            case "-": result = calculator.subtract(tempA, tempB); break;
            case "x": result = calculator.multiply(tempA, tempB); break;
            case "/": result = calculator.divide(tempA, tempB); break;
            case "%": result = calculator.getPercent(tempA, tempB); break;
            default: result = "que porra tu tentou calcular bro";
        }

        if(event.target.value === 'equals'){
            calculator.numberA = result;
            calculator.operator = "";
            calculator.numberB = "";
            calculator.input.value = result;
        }
        else if(event.target.classList.contains('operator')){
            calculator.numberA = result;
            calculator.operator = calculator.getOperator(event);
            calculator.numberB = "";
            calculator.input.value = result + calculator.operator;
        }
    }

}, false);


