$(function(){
  function appendUser (user) {
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= "${user.id}" data-user-name="${user.name}">追加</a>
              </div>
              `;
    $('#user-search-result').append(html);
  }

  function addNoUser() {
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>
               `;
    $('#user-search-result').append(html);
  }

  function  addUserToGroup(id, name) {
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${id}'>
              <p class='chat-group-user__name'>${name}</p>
              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
            </div>
            `;
    $('.js-add-user').append(html);
  }
  $('#user-search-field').on('keyup', function(){
    let input= $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach (function(user){
          appendUser(user);
        })
      } else if (input.length == 0) {
        return false
      } else {
        addNoUser();
      }
    })
    .fail(function(){
      alert('error');
    });
  });

  $('#user-search-result').on('click', '.user-search-add', function() {
    const user_id= $(this).data('user-id');
    const user_name= $(this).data('user-name');
    $(this).parent().remove();
    addUserToGroup(user_id, user_name);
  });

  $('.js-add-user').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
});