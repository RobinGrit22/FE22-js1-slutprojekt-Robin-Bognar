$('#btn').click(function(event){
    event.preventDefault();
    $('.lds-ellipsis').css('visibility', 'initial')
    $('#img-container').html('');
    let text = $('#userSearch').val();
    if(text == ''){
        $('.lds-ellipsis').css('visibility', 'hidden')
        throw 'please write something to search for';
    }
    let userNumber = $('#howMany').val();
    if(userNumber < 1){
        $('.lds-ellipsis').css('visibility', 'hidden')
        throw 'please chose quantity';
    }
    let sortSelect = $('#sort').val();
    let sizeInput = $('#size').val();
    $('.container').css('height','100%')
    let apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9fbf25e98aafad4f0262f7b8c6b995e2&text=
    ${text}&sort=${sortSelect}&per_page=${userNumber}&format=json&nojsoncallback=1`
    $.getJSON(apiUrl,{ 
    }).done(function(data){
        let getImageIds = data.photos.photo
                for(let i = 0; i < getImageIds.length; i++){
                    let id = getImageIds[i].id
                    let secret = getImageIds[i].secret
                    let server = getImageIds[i].server
                    const url = `https://live.staticflickr.com/${server}/${id}_${secret}_${sizeInput}.jpg`
                    let img = $('<img>');
                    img.attr('src', url);
                    $('#img-container').append(img)
                    $('.lds-ellipsis').css('visibility', 'hidden')
                    $('img').css('margin','10px')
                }
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown)
        $('.lds-ellipsis').css('visibility', 'hidden')
    })
})