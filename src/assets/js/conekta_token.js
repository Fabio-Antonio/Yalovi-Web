

 function tokenizador (){
  Conekta.setPublicKey("key_L1LqzNdaCCYPukNqF7XbGEw");

    
  const data = {
    "card": {
      "number": $('#ccnumber').val(),
      "name": $('#ccname').val(),
      "exp_year": "20"+$('#ccaa').val(),
      "exp_month": $('#ccmm').val(),
      "cvc": $('#cccvv').val()
    }
  }; 
  var successHandler = function(token){
      /* token keys: id, livemode, used, object */
      
      localStorage.setItem("tk",token.id);
      
    };
     
    var errorHandler = function(err) {
      localStorage.setItem("tk","");
      /* err keys: object, type, message, message_to_purchaser, param, code */
      console.log(err);    
      
    };
  
  
  
    Conekta.Token.create(data, successHandler, errorHandler);


}

