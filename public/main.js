$(document).ready(function(){
  var json;
  var counter = 8;
  $.ajax({
      url: "posts.json",
      dataType: 'json',
      async: false,
      type: "get"
  }).done(function(response){
      json = response;
  });
  json.items = json.items.sort(function(a,b){
    return new Date(b.item_created) - new Date(a.item_created);
  })
  appendInitial(json);
  $(".btn").on("click", function(){
    loadMore(json);
    buttonChecker();
  })

  $(".filter li").on("click", function(){
    var filtered = filter(this.innerText);
    $(".row").empty();
    for (var i =0; i < filtered.items.length; i++){
      $(".row").append(product(filtered.items[i]));
    }
  })

  function filter(category){
    var filtered = Object.assign({}, json);
    switch (category) {
      case "Manual":
        filtered.items = filtered.items.filter(function(item){
          if (item.service_name == "Manual"){
            return item;
          }
        })
        return filtered;
        break;
      case "Twitter":
        filtered.items = filtered.items.filter(function(item){
          if (item.service_name == "Twitter"){
            return item;
          }
        })
        return filtered;
        break;
      case "Instagram":
        filtered.items = filtered.items.filter(function(item){
          if (item.service_name == "Instagram"){
            return item;
          }
        })
        return filtered;
        break;  
    }
  }

  function loadMore(data){
    for (var i =0; i < 4; i++){
      $(".row").append(product(data.items[counter]));
      counter++;
      if (counter >= data.items.length){
        break;
      }
      console.log(counter);
    }
  }

  function buttonChecker(){
    if (counter == json.items.length){
      $(".btn").hide();
    }
  }

  function appendInitial(data){
    for (var i = 0; i < 8; i++){
      $(".row").append(product(data.items[i]));
    }
  }

  function product(data){
    switch (data.service_name){
      case "Manual":
        return `<div class="col-md-3"><div class="container"><img src="${data.item_data.image_url}"/>
        <a href="${data.item_data.link}"target="_blank">${data.item_data.link_text}</a><p>${data.item_data.text}</p></div></div>` 
        break;
      case "Twitter":
        return `<div class="col-md-3"><div class="container"><img src="${data.item_data.user.avatar}"/>
        <p>Username: ${data.item_data.user.username} <br> ${data.item_data.tweet}</p></div></div>`
        break;
      case "Instagram":
        return `<div class="col-md-3"><div class="container"><img src="${data.item_data.image.thumb}"/>
        <p>${data.item_data.caption}</p></div></div>`
        break;  
    }
  }
})