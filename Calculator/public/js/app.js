var num1, num2, num3,memory;

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var operator = ['*', '/', '√','-','%','1⁄x', '+'];
var special = ['MC', 'M+', 'MS', 'MR', 'C', '=', '.', '+/-'];

var display = document.getElementById("display");
var label = document.getElementById("label");
var ln1 = document.getElementById("n1");
var ln2 = document.getElementById("n2");
var ul = document.getElementById("history");

display.value = "";

var equalslick = false;

function btnClick(value){
    if (equalslick) {
        equalslick = false;
        display.value = "";
    }
    var isnumber = false;
    var isoperator = false;
    var isSpecial = false;
    var isblank = false;

    //check if input is number or operator
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


    if (isnumber) {
        if (label.innerHTML == "" && num1 == undefined) {
            ln1.innerHTML += value;
            display.value += value;
        }else if(num2 != undefined && num2 != "" && display.value != ""){
            num1 = parseFloat(display.value);
            ln1.innerHTML = "First Number:";
            ln1.innerHTML += display.value;
            display.value = "";
            display.value += value;
        }else {
            ln2.innerHTML += value;
            display.value += value;
        }
    }
    else if(isoperator) {
        if (display.value != "" && num1 == undefined) {
            num1 = parseFloat(display.value);
            label.innerHTML = value;
            display.value = "";
        }
        if (num1 != undefined && num1 != "" && display.value != "") {
            num2 = parseFloat(display.value);
            display.value = calculate(value);
        }
        if (value == "√") {
            display.value = calculate(value);
            addhistory(value);
            equalslick = true;
            clearAll();
        }else if (value == "1⁄x"){
            display.value = calculate(value);
            addhistory(value);
            equalslick = true;
            clearAll();
        }else if (value == "%"){
            display.value = calculate(value);
            addhistory(value);
            equalslick = true;
            clearAll();
        }
    }
    else if(isSpecial) {
        if (value == "MC") {
            memory = "";
        }else if(value == "M+") {
            memory = (memory + display.value);
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
        }
        else {
            if (num1 != "") {
                num2 = parseFloat(display.value);
                equalslick = true;
                display.value = calculate(label.innerHTML);
                addhistory(label.innerHTML);
                clearAll();
            }
        }
    }
}

function calculate(argument){
    if (argument == "+") {
        return (num1 + num2);
    }else if(argument == "-"){
        return (num1 - num2);
    }else if(argument == "*"){
        return (num1 * num2);
    }else if(argument == "/"){
        return (num1 / num2);
    }else if(argument == "√"){
        return Math.sqrt(num1);
    }else if(argument == "%"){
        return num1 / 100;
    }else if(argument == "1⁄x"){
        return (1 / num1);
    }
}

function clearAll(){
    num1 = undefined;
    num2 = undefined;
    ln1.innerHTML = "First Number:";
    ln2.innerHTML = "Second Number:";
    label.innerHTML= "";
}

function addhistory(argument){
        var li = document.createElement("li");
        if (num2 != undefined) {
            li.appendChild(document.createTextNode(num1+ " " + argument + " " +num2+' = '+ (calculate(argument))));
        }else {
            li.appendChild(document.createTextNode(argument+ " " + num1 + ' = '+ (calculate(argument))));
        }
        li.setAttribute("class", "list-group-item"); // added line
        ul.appendChild(li);
}