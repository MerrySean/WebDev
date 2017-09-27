var Fname, Lname, Gender, Bday, Age, Course, StdType

Fname   = document.getElementById('fname')
Lname   = document.getElementById('lname')
Gender  = document.getElementById('genderRadio')
Bday    = document.getElementById('Bdatepicker')
Edad    = document.getElementById('age')
Course  = document.getElementById('crs')
StdType = document.getElementById('studentType')

var RegisterAccounts = []

var printMasterlistClick = false

function dateblur(){
    var myDate = new Date(Bday.value);

    var ageDifference = new Date();

    var agebyyear = ageDifference.getFullYear() - myDate.getFullYear();
    if(agebyyear !== NaN && agebyyear > 0){
        Edad.value = agebyyear;
    }
}


$("#submitForm").click(function (event) {
    event.preventDefault();
    
    if(CheckIfAllInputHasValue()){
        var IdItem = ""
        if(RegisterAccounts.length > 0){
            for(var i=1; i <= RegisterAccounts.length; i++){
                IdItem = "item" + i
            }   
        }else{
            IdItem = "item0"
        }
        var Account = {
            FullName: Fname.value + " " + Lname.value,
            itemId:   IdItem,
            Fname:    Fname.value,
            Lname:    Lname.value,
            Gnd:      $('#genderRadio:checked').val(),
            Bday:     Bday.value,
            age:      Edad.value,
            Crs:      Course.value,
            SdtType:  StdType.value
        }
        RegisterAccounts.push(Account);
        NewAccountCreated()
        clearForm()
    }

});

function NewAccountCreated(){
    var itemTpl = $('script[data-template="listitem"]').text().split(/\$\{(.+?)\}/g);

    $('#accordion').empty();

    $('#accordion').append(
        RegisterAccounts.map(
            function(item) {
                return itemTpl.map(render(item)).join('');
            }
        )
    );
}

function CheckIfAllInputHasValue(){
    if(Fname.value !== "" &&
       Lname.value !== "" &&
       Gender.value !== "" &&
       Bday.value !== "" &&
       Edad.value !== "" &&
       Course.value !== "" &&
       StdType.value !== ""){
        return true;
    }
    return false
}

function render(props) {
    return function(tok, i) {
      return (i % 2) ? props[tok] : tok;
    };
}

function clearForm(){
    Fname.value = ""
    Lname.value  = ""
    Gender.checked = false
    Bday.value  = ""
    Edad.value  = ""
    Course.value  = "Select Course"
    StdType.checked = false
}

function PrintMasterlist() {
    $('#Masterlist').addClass("printThis top")
    $('#perAcc').removeClass("printThis center")

    var itemTpl = $('script[data-template="PrintMasterList"]').text().split(/\$\{(.+?)\}/g);

    var itemTpl2 = $('script[data-template="PrintMasterlistHeader"]').text();

    $('#Masterlist-table').empty()

    $('#Masterlist-table').append(itemTpl2);

    $('#Masterlist-table').append(
        RegisterAccounts.map(
            function(item) {
                return itemTpl.map(render(item)).join('');
            }
        )
    );

    window.print();
}

function PrintThisData(data){
    $('#perAcc').addClass("printThis center")
    $('#Masterlist').removeClass("printThis top")

    var AccountIndex = data[data.length - 1];
    
    var itemTpl = $('script[data-template="PrintAccountinfo"]').text().split(/\$\{(.+?)\}/g);

    $('#perAcc-card').empty()

    $('#perAcc-card').append(itemTpl.map(render(RegisterAccounts[AccountIndex])).join(''))

    window.print();
}