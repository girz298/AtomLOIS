(function(){
  var PORYADOK_PEREMENNIH = "";
  var TESTINGSTR = "(((A^B)v(BvC))^((!A)^(A->(B^G))))";
  var CLASSFORM = "";
//  var TESTINGSTR = "((P->Q)~P)";

  /*
    Метод отвечающий за поиск кол-ва переменных в лог. выражении.
  */

  function findCountOfVar(str){
    var testStr = str.match(/[A-Z]/g);
    for (var i = 0; i < testStr.length; i++) {
        for (var j = i+1; j < testStr.length; j++) {
          if (testStr[i]===testStr[j]) {
            delete testStr[j];
          }
        }
    }
    PORYADOK_PEREMENNIH = testStr.join("").match(/[A-Z]/g);
    return testStr.join("").length;
  }


  /*
    Метод создающий массив объектов являющимися строкой в таблице истинности.
  */

  function createArrayOfObjects(poryadok,arraOfArr){
    var resultArr = [];
    for(var i = 0, len = arraOfArr.length;i<len;i++){
      resultArr.push(new ModelOfIteration(poryadok,arraOfArr[i]).getObject());
    }
    return resultArr;
  }


  /*
    Метод создающий двуменный массив с бинарным представлением чисел от 0 до
    2 в стемени кол-ва переменных;
  */

  function getArrOfBin(count){
    var arrOfInt = [];
    for(var i = 0;i<count;i++){
      arrOfInt.push(i.toString(2));
    }
    return arrOfInt.map(function(curr,i,arr){
      if(curr.length!==arr[arr.length-1].length){
        curr = Array(arr[arr.length-1].length-curr.length+1)
        .join("0")+curr;
        return curr.match(/[01]/g);
      }
      return curr.match(/[01]/g);
    });
  }


  /*
    Метод возвращающий массив подформул.
  */

  function getAllSubForm(str){
    var locStr = str;
    if(str.match(/[(]/g).length!==str.match(/[)]/g).length && str ){   //добавить проверку валидных символов
         alert("Invalid sequence");
         return "Invalid sequence";
    }
    var arrOfSubForm = [];
    arrOfSubForm.push(locStr);
    locStr = removeFirstAndLastSymbol(locStr);

    arrOfSubForm = arrOfSubForm.concat(locStr.match(/\({1}[^\(\)]{3,4}\){1}/g));
    if(locStr.indexOf("!")!==-1){
      arrOfSubForm = arrOfSubForm.concat(locStr.match(/\(![A-Z]{1}\)/g));
    }

    (function reqFindAllSub(reqStr){
      var counter = 0;
      var positionOfLast = 0;
      for (var i = 0 , len = reqStr.length; i < len ; i++) {
        if (reqStr[i] === "(") {
          counter++;
        }else if (reqStr[i] === ")") {
          positionOfLast = i;
          counter--;
        }else if (counter === 0 && reqStr.slice(1,positionOfLast).length>4) {
          arrOfSubForm.push(reqStr.slice(1,positionOfLast));
          reqFindAllSub(reqStr.slice(1,positionOfLast));
        }
      }
    })(locStr);

    (function reqFindAllSub(reqStr){
      var counter = 0;
      var positionOfLast = 0;
      var countOfScob = 0;
      for (var i = reqStr.length; i >= 0 ; i--) {
        if (reqStr[i] === ")") {
          countOfScob++;
          counter++;
        }else if (reqStr[i] === "(") {
          countOfScob++;
          positionOfLast = i;
          counter--;
        }else if (counter === 0 && countOfScob>2 && reqStr.slice(positionOfLast+1,reqStr.length-1).length>4) {
          arrOfSubForm.push(reqStr.slice(positionOfLast+1,reqStr.length-1));
          reqFindAllSub(reqStr.slice(positionOfLast+1,reqStr.length-1));
        }
      }
    })(locStr);
   console.log(arrOfSubForm);
    return arrOfSubForm;
  }


  /*
    Метод удаляющий первый и послединй символ из строки.
  */

  function removeFirstAndLastSymbol(str){
    return str.slice(1,str.length-1);
  }


  /*
    Метод добавляющий к каждому объекту из массива свойства-подформулы.
  */

  function addArrOfPropToAllObj(arrOfInObjects, arrOfProps){
    arrOfProps.forEach(function(curr){
      var localcurr = curr;
      arrOfInObjects.forEach(function(curr2){
        if (localcurr) {
          curr2[localcurr] = undefined;
        }
      });
    });
  };


  /*
    Прототипный метод объекта String для замены пользовательский символов на
    спецсимволы .
  */

  String.prototype.replaceToGood = function(){
    return this.replace(/\^/g," && ").replace(/v/g," || ")
    .replace(/\->/g," <= ").replace(/\~/g," == ");
  }


  /*
    Метод для вычисления результата лог. формулы.
  */

  function getLogicResult(obj){
      var nameOfProp;
      for(nameOfProp in obj){
        if(obj[nameOfProp]===undefined){
          var localStr = nameOfProp;
          // console.log(localStr.match(/[A-Z]/g));
          while(localStr.match(/[A-Z]/g)){
            var locArr = localStr.match(/[A-Z]/g);
            localStr = localStr.replace(locArr[0],obj[locArr[0]]);
          }
          obj[nameOfProp]= eval(localStr.replaceToGood())===false || eval(localStr.replaceToGood())===0?"0":"1";
        }
      }
    }


  /*
    Цепочка вызова методов.
  */


  findCountOfVar(TESTINGSTR); // можно пофиксить
  var arrOfObjects = createArrayOfObjects(PORYADOK_PEREMENNIH,getArrOfBin(Math.pow(2,findCountOfVar(TESTINGSTR))));
  addArrOfPropToAllObj(arrOfObjects,getAllSubForm(TESTINGSTR));
  arrOfObjects.forEach(function(curr){getLogicResult(curr);});

  (function(){
    if (arrOfObjects.every(function(curr){return curr[TESTINGSTR] === 1;})) {
      CLASSFORM = "выполнимая, общезначимая";
    }else if (arrOfObjects.every(function(curr){return curr[TESTINGSTR] === 1;})) {
      CLASSFORM = "противоречивая";
    }else {
      CLASSFORM = "выполнимая, нейтральная";
    }
  }());

  (function(){
    var node = document.createElement("caption");
    var textnode = document.createTextNode("Таблица истинности для формулы:  "+TESTINGSTR +"  "+CLASSFORM+"." );
    node.appendChild(textnode);
    document.getElementById("myTable").appendChild(node);
    var headers = document.createElement("tr");
    document.getElementById("myTable").appendChild(headers);

    for (var test in arrOfObjects[0]) {
      if (arrOfObjects[0].hasOwnProperty(test)) {
          var th = document.createElement("th");
          th.appendChild(document.createTextNode(test+""));
          headers.appendChild(th);
      }
    }
  }());

  (function(){
    arrOfObjects.forEach(function(curr){
    var headers = document.createElement("tr");
      for (var variable in curr) {
        if (curr.hasOwnProperty(variable)) {
          var td = document.createElement("td");
          td.appendChild(document.createTextNode(curr[variable]+""));
          headers.appendChild(td);
        }
      }
    document.getElementById("myTable").appendChild(headers);
  });}());

  console.log(arrOfObjects);
}());
