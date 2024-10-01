function clearScreen(){
   document.getElementById('input').value = "";
    
}
//function to display values
function display(value){
    document.getElementById('input').value +=value;
}
 function Calculate(){
    var initial= document.getElementById('input').value;
    var total = eval(initial);
    document.getElementById('input').value = total;
 }