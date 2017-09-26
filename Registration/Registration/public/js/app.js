var Fname, Lname, Gender, Bday, Age, Course, StdType

Fname   = document.getElementById('fname')
Lname   = document.getElementById('lname')
Gender  = document.getElementById('genderRadio')
Bday    = document.getElementById('Bdatepicker')
Edad     = document.getElementById('age')
Course  = document.getElementById('crs')
StdType = document.getElementById('studentType')

var RegisterAccounts = []

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
    var Account = {
        Firstname:   Fname.value,
        Lastname:    Lname.value,
        Sex:         Gender.value,
        BirthDay:    Bday.value,
        Age:         Edad.value,
        Crs:         Course.value,
        StudentType: StdType.value
    }

    RegisterAccounts.push(Account);
    NewAccountCreated()
});
function NewAccountCreated(){
    
}