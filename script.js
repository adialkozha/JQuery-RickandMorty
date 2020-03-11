'use strict'
$(function(){
    let modal = $('#modal');
    let button = $('.load-more')
    let list = [];
    let info = null;
    let closeButton = $('#X');
    let apiLink = 'https://rickandmortyapi.com/api/character/';
    load(apiLink);
    modal.hide();

    button.on('click',function(){
        load(info.next);
    })
    $(document).on('click','.list-item',function(){
        let index =$(this).data('index');
        fillModal(index);
        modal.show();
    })
    closeButton.on('click',function () {
        modal.hide();
    })
    function load(apiLink) {
        $.get(apiLink,function(data){
            list = [...list,...data.results];
            info = data.info;
            apiLink = info.next;
            fillStats();
            renderList();
        })
    };
    function fillStats(){
        $('#loaded-char').text(list.length);
        $('#all-Characters').text(info.count);
        console.log(list.length,info.count)
    }
    function renderList() {
        $('#list').html('');
        $.each(list,function (index,item) {

            let row = `<div class="list-item" data-index="${index}">
            <div>${index + 1}. ${item.name}</div>
          <div>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.995 511.995"
              style="enable-background:new 0 0 511.995 511.995;" xml:space="preserve">
              <path d="M381.039,248.62L146.373,3.287c-4.083-4.229-10.833-4.417-15.083-0.333c-4.25,4.073-4.396,10.823-0.333,15.083
      L358.56,255.995L130.956,493.954c-4.063,4.26-3.917,11.01,0.333,15.083c2.063,1.979,4.729,2.958,7.375,2.958
      c2.813,0,5.604-1.104,7.708-3.292L381.039,263.37C384.977,259.245,384.977,252.745,381.039,248.62z" />
            </svg>
          </div>
        </div>`
        $('#list').append(row);
            console.log(list);
            console.log(item);
            console.log(index);
        })
    }

    function fillModal(index){
        let char = list[index];
        $('#Char-name').text(char.name);
        $('#Char-status').text(char.status);
        $('#Char-species').text(char.species);
        $('#Char-gender').text(char.gender);
        $('#Char-origin').text(char.origin.name);
        $('#avatar-img').attr("src",`${char.image}`);
        console.log($("#avatar-img"));
        
        console.log();
        console.log(char.name);

    }
})