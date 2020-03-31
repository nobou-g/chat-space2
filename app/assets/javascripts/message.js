$(function(){

  var buildHTML = function(message) {
    let message_user_name= `<div class= "user-name">
                            ${message.user_name}
                          <div>`
              
    let message_created_at= `<div class= "send-time">
                              ${message.created_at}
                            </div>`
    
    let message_content= `<div class= "message__content">
                            ${message.content}
                          </div>`

    let message_image= `<img src=${message.image}>`
    
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message-info">` +
          message_user_name +
          message_created_at +
          message_content +
          message_image +
      `</div>` +
    `</div>`

    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message-info">` +
          message_user_name +
          message_created_at +
          message_content +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message-info">` +
          message_user_name+
          message_created_at +
          message_image +
        `</div>` +
      `</div>`
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
      url: '/api/messages',
      data: {id: last_message_id},
      dataType: 'json'
      .done(function(messages){
        console.log('success');
      })
      .fail(function(){
        alert('error');
      })
    });
  };
});


