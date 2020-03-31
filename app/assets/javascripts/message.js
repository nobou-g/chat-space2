$(function(){

  function buildHTML(message) {
    if (message.image && message.content) {
      var html= `<div class="message", data-message-id= ${message.id}>
                  <div class= "message__info">
                    <div class= "user-name">
                      ${message.user_name}
                    <div>
                    <div class= "send-time">
                      ${message.created_at}
                    </div>
                    <div class= "message__content">
                      ${message.content}
                    </div>
                    <img src=${message.image}>
                  </div>
                </div>`
    } else if (message.content) {
      var html= `<div class="message", data-message-id= ${message.id}>
                  <div class= "message__info">
                    <div class= "user-name">
                      ${message.user_name}
                    </div>
                    <div class= "send-time">
                      ${message.created_at}
                    </div>
                    <div class= "message__content">
                      ${message.content}
                    </div>
                  </div>
                </div>`
    } else if (message.image) {
      var html= `<div class="message", data-message-id= ${message.id}>
                  <div class= "message__info">
                    <div class= "user-name">
                      ${message.user_name}
                    <div>
                    <div class= "send-time">
                      ${message.created_at}
                    </div>
                    <img src=${message.image}>
                  </div>
                </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData= new FormData(this);
    var url= $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html= buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.input-submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages= function() {
    var last_message_id= $('.message:last').data('message-id');
    $.ajax({
      type: 'GET',
      url: 'api/messages',
      data: {id: last_message_id},
      dataType: 'json' 
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML= '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message);
        })
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
});