function call(){
  $("#result").load("https://economia.awesomeapi.com.br/json/all", function(response, status, xhr) {

    if (xhr.status == 200) {
      const obj = JSON.parse(response);
      var size = Object.keys(obj).length;

      for(var i = 0; i < size; i++){
        var nome = Object.entries(obj)[i][1].name
        var valor = Object.entries(obj)[i][1].bid;
        var variacao = Object.entries(obj)[i][1].varBid;
        var data = Object.entries(obj)[i][1].create_date;

        console.log("Nome: " + nome + " | Valor: " + valor + " | Variação: " + variacao + " | data: " + data);

        var color = "green-background";
        var colorLeft = "green-background-left";
        if (variacao >= 0.0) {
          var color = "green-background";
          var colorLeft = "green-background-left";
        } else {
          var color = "red-background";
          var colorLeft = "red-background-left";
        }

        var card = '<div class="moeda-card-container '+colorLeft+'"><div class="moeda-info-container"><h2>'+nome+'</h2><p>'+data+'</p></div><div class="moeda-valor-container"><span class="value">'+valor+'</span><span class="variation ' + color + '">'+variacao+'</span></div></div>';

        card = $.parseHTML( card);
        $("#moedas-container").append(card);
      }
    }
  });

}
