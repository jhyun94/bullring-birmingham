$(document).ready(function(){
  var json;
  var counter;
  loadFile();
  var data = Object.assign({}, json);

  appendInitial(data);

  $(".btn").on("click", function(){
    loadMore(data);
    buttonChecker(data);
  })

  $(".filter li").on("click", function(){
    var filtered = filter(this.innerText);
    data = filtered;
    updateClass(this);
    $(".row").empty();
    for (var i =0; i < 8; i++){
      $(".row").append(product(filtered.items[i]));
      if (i == filtered.items.length -1){
        break;
      }
    }
    buttonChecker(filtered);
  })

  function loadFile(){
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
  }

  function appendInitial(data){
    for (var i = 0; i < 8; i++){
      $(".row").append(product(data.items[i]));
    }
  }

  function loadMore(data){
    var counter = $(".row")[0].children.length;
    for (var i =0; i < 4; i++){
      $(".row").append(product(data.items[counter]));
      counter++;
      if (counter >= data.items.length){
        break;
      }
    }
  }

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
      case "All":
        filtered = json;
        return filtered;
        break;       
    }
  }

  function buttonChecker(data){
    var counter = $(".row")[0].children.length;
    if (counter == data.items.length){
      $(".btn").hide();
    }
    else{
      $(".btn").show();
    }
  }
  function updateClass(list){
    var old = document.getElementsByClassName("active");
    $(old).removeClass("active");
    $(list).addClass("active");
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