var num1, num2, ops;

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var operator = ['*', '/', 'MC', 'M+', 'M-', 'MR', 'C','√','-','%','1⁄x', '+/-', '+', '='];

var display = document.getElementById('display');
var label = document.getElementById('label');

function btnClick(value){
    var isnumber = false;
    var isoperator = false;
    var isblank = false;

    //check if input is number or operator
    if(numbers.includes(parseInt(value))){
        isnumber = true;
    }
    else if (operator.includes(value)){
        isoperator = true;
    }
    else{
        alert("not a number " + isoperator);
    }

    if(value == "1⁄x"){
        isnumber = false;
        isoperator = true;
    }

    alert(isnumber + " " + isoperator + " " + value);

    

    //check if display has number
    if(display.value == "")
    {
        isblank = false
    }
    else{
        isblank = true
    }

}

function htmlEntities(str) {
    return String(str).replace(/√/g, '&radic;');
}