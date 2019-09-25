$(function(){ 
  function buildHTML(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";     
    var html =
      `<div class="contents__message__box" data-message-id=${message.id}>
         <div class="contents__message__box__info">
           <div class="contents__message__box__info__user">
             ${message.user_name}
           </div>
           <div class="contents__message__box__info__date">
             ${message.date}
           </div>
         </div>
         <div class="contents__message__box__chat">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   }

$('.new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.contents__message').append(html);
    $('.contents__message').animate({scrollTop: $('.contents__message')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 });
});
