var myPins = function(){'use-strict';
  $( document ).ready(function() {

    var $grid = $('.grid').masonry({
      columnWidth: '.grid-item',
      itemSelector: '.grid-item',
      gutter: 10
    });
    requestMyPins();

    function requestMyPins(){
      $('.grid').empty();
      $.post( "/my-pins", {action: 'show'} ,function( data ) {
        createUI(data);
      });
    }

    function createUI(allData){
      console.log(allData);
      allData.myDocuments.forEach(function(singlePin, index, arr){
        //variable Size
        var classExtension="";
        var rand = Math.random();
        if(rand < 0.1){
          classExtension = "grid-item--width";
        }else if(rand > 0.9){
          classExtension = "grid-item--height";
        }

        var div = $("<div/>", {
          class: 'grid-item ' + classExtension,
        });
        var img = $("<img/>", {
          src: singlePin.url,
          error: function(){
            $(this).attr('src', 'img/notfound.jpg');
          }
        });
        var span = $("<span/>", {
          class: 'fa fa-times',
          click: function(){
            $.post( "/my-pins", {action: 'delete', _id: singlePin._id} ,function( data ) {
              if(data.myDocuments.n >0){
                toastr.success("Deleted Pin successfully.");
                requestMyPins();
              }else{
                toastr.error("Oops, something went wrong deleting the Pin.");
              }
            });
          }
        });
        var title = $("<p/>", {
          text: singlePin.title,
          class: 'text-center'
        });
        div.append(span);
        div.append(img);
        div.append(title);
        div.appendTo('.grid');
      });

      $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
      });
    }
  });//doc ready
}();
