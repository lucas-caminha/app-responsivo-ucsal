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

        if(onlyRealBrasiliero(nome)){
          nome = nome.substring(0,nome.indexOf("/"));
          data = setDateBrazilianFormat(data);
          var color = setColorVariacao(variacao);
          var colorLeft = setColorVariacaoLeft(variacao);
          var positive = setPositive(variacao);

          var card = createMoedaCard(colorLeft, nome, data, valor, color, positive, variacao);
          card = $.parseHTML(card);
          $("#moedas-container").append(card);
        }
      }
    }
  });

}

function createMoedaCard(colorLeft, nome, data, valor, color, positive, variacao){
  return '<div class="moeda-card-container '+colorLeft+'"><div class="moeda-info-container"><h2>'+
  nome+'</h2><p>'+data+'</p></div><div class="moeda-valor-container"><span class="value">'+
  valor+'</span><span class="variation ' + color + '">'+positive+variacao+'</span></div></div>';
}

function setPositive(variacao) {
  if (variacao >= 0.0) {
    return "+";
  }
  return "";
}

function setColorVariacaoLeft(variacao) {
  if (variacao >= 0.0) {
    return "green-background-left";
  }
  return "red-background-left";
}

function setColorVariacao(variacao) {
  if (variacao >= 0.0) {
    return "green-background";
  }
  return "red-background";
}

function setDateBrazilianFormat(dataJSON){
  var data = new Date(dataJSON);

  var output = "";

  if(data.getDate() < 10){
    output += "0" + data.getDate();
  } else {
    output += data.getDate()
  }

  output += "\\";

  if(data.getMonth()+1 < 10){
    output += "0" + (data.getMonth()+1);
  } else {
    output +=  (data.getMonth()+1)
  }

  output += "\\" + data.getFullYear();

  let h = addZero(data.getHours());
  let m = addZero(data.getMinutes());
  let s = addZero(data.getSeconds());
  let time = h + ":" + m + ":" + s;

  return output + " " + time;
}

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function onlyRealBrasiliero(nome){
    var n = nome.substring(nome.indexOf("/"));
    if(n == "/Real Brasileiro"){
      return true;
    }
    return false;
}
