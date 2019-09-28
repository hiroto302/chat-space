$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    image = (message.image.url !== null) ? `<img src="${message.image.url}">` : "";     
    console.log(image)
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
      var last_message_id = $('.contents__message__box:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      // var group_id = $(".group").data("group-id");
      console.log(last_message_id)
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        console.log("ok")
        var insertHTML = '';//追加するHTMLの入れ物を作る
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
          if (message.id > last_message_id){
          $('.contents__message').append(insertHTML);//メッセージを追加
          $('.contents__message').animate({scrollTop: $('.contents__message')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
          }
        })
      })
      .fail(function () {
        console.log('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
});
