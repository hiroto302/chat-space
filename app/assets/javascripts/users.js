$(document).on('turbolinks:load', function() {
$(function(){ 
  
  var user_list = $("#user-search-result");
  var member_list = $("#member_search_result");

  function appendUsers(user) {
    var html = 
        `<div class='chat-group-user clearfix js-chat-member'>
          <div class='chat-group-form__field--right'>
            <p class="chat-group-user__name">
              ${user.name}
            </p>
            <a class="user_search_add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
              追加
            </a>
        </div>`
    user_list.append(html); 
  }  
  
  // function appendErrMsgToHTML(user){
  //   var html = `<div class='chat-group-user clearfix'>${ user }</div>`
  //   search_list.append(html);
  // }
  
  var member_list = $("#chat-group-users");
  
  function appendMembers(userId,userName) {
    var html =
        `<div id='chat-group-users'>
          <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
            <input name='group[user_ids][]' type='hidden' value='${userId}'>
              <p class='chat-group-user__name'>${userName}</p>
              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
        </div>`;
    member_list.append(html);
  }

  $("#user-search-field").on('keyup', function(e){   
    e.preventDefault();
    var input = $("#user-search-field").val()
    $.ajax({
      url: '/users',
      type: "GET",
      data: {keyword: input},
      dataType: 'json'
    })
  
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUsers(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }    
    })
    .fail(function() {
      alert('error');
    })
  });  
  $(document).on("click", ".user_search_add", function () {
    $('#chat-group-users').val();
      var userId = $(this).attr('data-user-id');
      var userName = $(this).attr('data-user-name');
      appendMembers(userId,userName);      
      $(this).parent().remove();
    });
  $(document).on("click", ".user-search-remove", function () {     
    $(this).parent().remove();
    });
  });
});