var num1, num2, num3,memory;

var arrayInput = [];

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var operator = ['*', '/', '√','-','%','1⁄x', '+'];
var special = ['MC', 'M+', 'MS', 'MR', 'C', '=', '.', '+/-'];

var display = document.getElementById("display");
var label = document.getElementById("label");
var equation = document.getElementById("equation");
var ul = document.getElementById("history");

display.value = "";

var equalslick = false;

function btnClick(value){
    if (equalslick) {
        equalslick = false;
        display.value = "";
        equation.innerHTML = "";
        arrayInput = [];
    }
    var isnumber = false;
    var isoperator = false;
    var isSpecial = false;
    var isblank = false;

    //check if input is number or operator or special
    if(numbers.includes(parseInt(value))){
        isnumber = true;
    }
    else if (operator.includes(value)){
        isoperator = true;
    }
    else if (special.includes(value)){
        isSpecial = true;
    }
    else{
        alert("not a number " + value);
    }
    //check if input is number or operator for 1⁄x
    if(value == "1⁄x"){
        isnumber = false;
        isoperator = true;
    }

    //if user clicks on a number button
    if (isnumber) {
        display.value += value;
    }
    //if user clicks on an operator button
    else if(isoperator) {
        //for multiple number equations
        if (display.value != "") {
            arrayInput.push(display.value);
            arrayInput.push(value);
            label.innerHTML = value;
            display.value = "";
            equation.innerHTML = arrayInput.toString().replace(/,/g,'');
        }

        //this if is for 1number equations
        if (value == "√") {
            
            arrayInput.unshift(value);
            arrayInput.splice(-1,1);

            equation.innerHTML = arrayInput.toString().replace(/,/g,'');

            OneNumCalc(arrayInput[arrayInput.length - 1],value);

            equalslick = true;

        }else if (value == "1⁄x"){
            
            arrayInput.unshift(value);
            arrayInput.splice(-1,1);

            equation.innerHTML = arrayInput.toString().replace(/,/g,'');

            label.innerHTML = "";

            OneNumCalc(arrayInput[arrayInput.length - 1],value);

            equalslick = true;
        }else if (value == "%"){
            
            arrayInput.unshift(value);
            arrayInput.splice(-1,1);

            equation.innerHTML = arrayInput.toString().replace(/,/g,'');

            label.innerHTML = "";

            OneNumCalc(arrayInput[arrayInput.length - 1],value);

            equalslick = true;
        }
    }
    //if user clicks on a Special button
    else if(isSpecial) {
        if (value == "MC") {
            memory = "";
        }else if(value == "M+"){
             memory = (parseFloat(memory) + parseFloat(display.value));
        }else if(value == "MS"){
                memory = display.value;
        }else if(value == "MR"){

                display.value = memory;
        }else if(value == "C"){
                clearAll();
                display.value = "";
        }else if(value == "."){

                display.value += ".";
        }else if(value == "+/-"){
                if (parseFloat(display.value) > 0 ) {
                    display.value = ('-' + display.value);
                }else{
                    display.value = display.value.replace(/-/g,'');
                }
        }else if(value == "="){
                arrayInput.push(display.value);
                equation.innerHTML = arrayInput.toString().replace(/,/g,'');
                calculate(equation.innerHTML)
        }
    }
}

function calculate(inputs){
    
    var total = eval(inputs.toString().replace(/,/g,''));

    display.value = total;

    equalslick = true;

    addhistory(equation.innerHTML, total);
}

//calculate a 1 number expression
function OneNumCalc(inputs, btnvalue){
    var total;
    if(btnvalue == "√"){
       total = Math.sqrt(inputs)
    }else if(btnvalue == "%"){
        total = inputs/100;
    }else if(btnvalue == "1⁄x"){
        total = 1/inputs
    }else if(btnvalue == "√"){
        total = Math.sqrt(inputs)
    }
    display.value = total;
}


//clear all including memory
function clearAll(){
    equation.innerHTML = "";
    label.innerHTML = "";
    arrayInput = [];
}


//add history
function addhistory(argument1, argument2){
        var li = document.createElement("li");
        
            li.appendChild(document.createTextNode(argument1 + " = " + argument2));
        
        //    li.appendChild(document.createTextNode(argument+ " " + num1 + ' = '+ (calculate(argument))));
        
        li.setAttribute("class", "list-group-item"); // added line
        ul.appendChild(li);
}