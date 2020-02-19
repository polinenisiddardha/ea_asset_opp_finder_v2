function calculate() {
    var myBox1 = document.getElementById('mv').value;	
    var myBox2 = document.getElementById('aht').value;
    var result = document.getElementById('fte');	
    var myResult = myBox1 * myBox2;
    var myyResult = myResult/10080;
    var myyyResult = Math.ceil(myyResult);
    result.value = myyyResult;
    fte_benifit();

    
}


function automation(){
    var selObj  = document.getElementById('docpre');
    var selValue = selObj.options[selObj.selectedIndex].value;
    document.getElementById("Ar").value = selValue*100;
    fte_benifit();

}

function ap(){
    var selObj1  = document.getElementById("rbased");
    var selValue1 = selObj1.options[selObj1.selectedIndex].value;
    var arpa = document.getElementById('arpa').value;
    var arpa1 = arpa/100;
    var crpa = document.getElementById('crpa').value;
    var crpa1 = crpa/100;
    var result1 = (arpa1*selValue1*100)+(crpa1*(crpa/2));
    result2 = result1.toFixed(2);
    // var result2 = crpa/2;
    // var result3 = crpa*result2;
    // var result4 = result1+result3;
   
    
    document.getElementById("apot").value = result2;
    fte_benifit();

}
function fte_benifit(){
    var ap = document.getElementById('apot').value/100;
    var fte = document.getElementById('fte').value;
    var resulta = document.getElementById('fteb');
    var result2 = ap*fte;
    var final = Math.ceil(result2);
    resulta.value = final;  

}
function ValidateRange() {
    var value = parseInt(document.getElementById("arpa").value);
    if (value < 0 || value > 100) {
        alert("Please enter number between 0 and 100");
        return false;
    }
    return true;
}
function ValidateRange1() {
    var value = parseInt(document.getElementById("crpa").value);
    if (value < 0 || value > 100) {
        alert("Please enter number between 0 and 100");
        return false;
    }
    return true;
}


     


    

 






