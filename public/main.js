$(document).ready(function(){
    var json;
    $.ajax({
        url: "posts.json",
        dataType: 'json',
        async: false,
        type: "get"
    }).done(function(response){
        json = response;
    })

    debugger;
})