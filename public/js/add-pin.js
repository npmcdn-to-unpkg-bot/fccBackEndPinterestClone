'use-strict';
$('form').submit(function() {
    var data = $("form").serializeArray();
    $.post( "/add-pin", data, function( respData ) {
      console.log(respData);
      if(respData.error){
        toastr.error("Oops, something went wrong adding the Pin.");
      }else{
        toastr.success("Added Pin \"" + respData.obj.title +  "\" successfully.");
      }
      document.getElementById("add-pin-form").reset();
      return false;  //stop forwarding
    });
});
