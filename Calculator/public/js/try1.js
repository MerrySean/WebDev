var ans,memory;

var arrayInput = [];

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var operator = ['*', '/', '√','-','%','1⁄x', '+'];
var special = ['MC', 'M+', 'MS', 'MR', 'C', '=', '.', '+/-','<','π','x^2','Ans','x^y'];

//this is where you can the the numbers eveytime you click on a number button
var display = document.getElementById("display");
//this is beside the display, this is where you can see the operator that you want to use
var label = document.getElementById("label");
var equation = document.getElementById("equation");
var ul = document.getElementById("history");

display.value = "";

var equalslick = false;
var dotbtn = false;
var newnum = false;
var opClicked = false;

//function that is called when a button is clicked
function btnClick(value){
    //declare variables
    
    // this will be true if the user clicks on a number button 
    var isnumber = false;
    // this will be true if the user clicks on an operator button
    var isoperator = false;
    // this will be true if the user clicks on a special button
    var isSpecial = false;

    //check what button the user clicks
    
    // if user clicks on a number this will run
    if(numbers.includes(parseInt(value))){
        isnumber = true;
      
          //if the equal button is click then this makes sure that display, equation, label, and arrayInput is new
          //but also make sure that the dot can be used again
          //don't forget to make equalslick to back false, this makes sure that next user input will not clear the display until the equals is click again
          if (equalslick) {
              equalslick = false;
              display.value = "";
              equation.innerHTML = "";
              arrayInput = [];
              dotbtn  = false;
              label.innerHTML = "";
          }
    }
    // else if user clicks on an operator this will run
    else if (operator.includes(value)){
        isoperator = true;
         if (equalslick) {
              equalslick = false;
              arrayInput = [];
              equation.innerHTML = "";
              arrayInput.push(display.value);
              newnum = true;
         }
    }
    // else if user clicks on a special this will run 
    else if (special.includes(value)){
        isSpecial = true;
    }
    //else if the button value is not registered in any of the three arrays this will run
    else{
        alert("not a number " + value);
    }
  
    //check if input is number or operator for 1⁄x
    // we check this becuase the code above will find '1/x' included in the number array becuase there is a '1' in the value
    if(value == "1⁄x"){
        isnumber = false;
        isoperator = true;
    }

    //if user clicks on a number button
    // we display this number in the inputbox
    if (isnumber) {
        display.value += value;
        if(newnum === true){
           newnum = false;
        }

        //for operator
        if(opClicked){
          opClicked = false;   
        }
    }
    //if user clicks on an operator button
    else if(isoperator) {
        
        if(opClicked){
           arrayInput[arrayInput.length - 1] = value;
           
            label.innerHTML = value;
            
            //this is going to show the full equation to the user. 
            equation.innerHTML = arrayInput.toString().replace(/,/g,'');
        }
      
        //for multiple number equations
        if (display.value !== "") {
            
            if(!newnum){
              //this will push the number in the display to end of the array
              arrayInput.push(display.value);
            }
            
            //after pushing the first number this will then push the operator to the end of the array
            arrayInput.push(value);
            
            //clear operator label
            label.innerHTML = value;
          
            //clear display input
            display.value = "";
          
            //this is going to show the full equation to the user. 
            equation.innerHTML = arrayInput.toString().replace(/,/g,'');
            
            //we make this to false, because we know that the display is new, and this will make the user be able to use dot in there numbers again.
            dotbtn = false;
        }

        //this if is for 1number equations
        if (value == "√" || value == "1⁄x" ||value == "%") {
            
            //add the squar root symbol at the start of the array
            arrayInput.unshift(value);
            
            //we delete the symbol at the end (that was added at the top when we push the value)
            arrayInput.splice(-1,1);
            
            //we show the fool equation to the user
            equation.innerHTML = arrayInput.toString().replace(/,/g,' ');
            
            //we then call a funtion that would calculate the result
            OneNumCalc(arrayInput[arrayInput.length - 1],value);
            
            //let equalslick be true so that in the next user input the display will reset
            equalslick = true;

        }
      
      
        opClicked = true;
    }
    //if user clicks on a Special button
    else if(isSpecial) {
      
        
        if(opClicked){
          opClicked = false;   
        }
      
        //if user clicks on MC, then clear memory
        if (value == "MC") {
            memory = "";
            
        }
        //if user clicks on M+, then take whats in the memory then add it to the value in the display
        else if(value == "M+"){
             memory = (parseFloat(memory) + parseFloat(display.value));
        }
        //if user click on MS, then save what in the display to the memory
        else if(value == "MS"){
                memory = display.value;
        }
        //if users clicks on MR then display the value in the memory to the display.
        else if(value == "MR"){

                display.value = memory;
        }else if(value == "C"){
                clearAll();
                display.value = "";
        }else if(value == "."){
                if (dotbtn !== true) {
                  display.value += ".";
                  dotbtn = true;
                }else {
                  
                }
        }else if(value == "+/-"){
                if (parseFloat(display.value) > 0 ) {
                    display.value = ('-' + display.value);
                }else{
                    display.value = display.value.replace(/-/g,'');
                }
        }else if(value == "="){
          //check if equals is click twice, else don't run
           if (!equalslick) {
               if(arrayInput.length !== 0){
                  arrayInput.push(display.value);
                  equation.innerHTML = arrayInput.toString().replace(/,/g,' ');
                  calculate(equation.innerHTML)
               }
            }
        }else if(value == "<"){
            if(display.value !== ""){
                display.value = display.value.slice(0, -1);
            }else{
                arrayInput.splice(-1,1);
                equation.innerHTML = arrayInput.toString().replace(/,/g,' ');
                if(label.innerHTML !== ""){
                    label.innerHTML = "";
                }
            }
        }else if(value == "π"){
            display.value += '3.1415926535';
        }else if(value == "x^2"){
            //x to the power of 2
            var squared = parseFloat(display.value);
            // display.value = 
        }else if(value == 'Ans'){
            display.value += ans;
        }else if(value == 'x^y'){
            //x to the power of y
            
        }
    }
}

//calculate simple expression using eval()
function calculate(inputs){
    
    var total = eval(inputs.toString().replace(/,/g,''));

    display.value = total;

    equalslick = true;

    addhistory(equation.innerHTML, total);
  
    dotbtn = false;

    ans = total;
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
    dotbtn = false;
    addhistory(equation.innerHTML, total);
}

//clear all including memory
function clearAll(){
    equation.innerHTML = "";
    label.innerHTML = "";
    arrayInput = [];
    dotbtn = false;
}

//add history
function addhistory(argument1, argument2){
        var li = document.createElement("li");
        
        li.appendChild(document.createTextNode(argument1 + " = " + argument2));
        
        li.setAttribute("class", "list-group-item"); // added line
        ul.appendChild(li);
}