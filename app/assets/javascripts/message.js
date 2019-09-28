$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    image = (message.image.url !== null) ? `<img src="${message.image.url}">` : "";
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
        <div class="contents__message__box__info__image">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <div class= "lower-message__image">
            ${image}
          </div>
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

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.contents__message__box:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          if (message.id > last_message_id){
          $('.contents__message').append(insertHTML);
          $('.contents__message').animate({scrollTop: $('.contents__message')[0].scrollHeight}, 'fast');
          }
        })
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
