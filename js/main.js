(function(){
  var PORYADOK_PEREMENNIH = "";
  var TESTINGSTR = "(A^B+C+D+D+C+A)";
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

  findCountOfVar(TESTINGSTR)
  // var testModel = new ModelOfIteration(PORYADOK_PEREMENNIH,getArrOfBin(Math.pow(2,findCountOfVar(TESTINGSTR)))[0]);
  // console.log(testModel.getObject());
  console.log(createArrayOfObjects(PORYADOK_PEREMENNIH,getArrOfBin(Math.pow(2,findCountOfVar(TESTINGSTR)))));

  function createArrayOfObjects(poryadok,arraOfArr){
    var resultArr = [];
    for(var i = 0, len = arraOfArr.length;i<len;i++){
      resultArr.push(new ModelOfIteration(poryadok,arraOfArr[i]).getObject());
    }
    return resultArr;
  }


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
  // console.log(getArrOfBin(Math.pow(2,findCountOfVar(TESTINGSTR))));

  // (A+B)*(B+C)+(!(A*B))
  function getAllSubForm(str){
    var locStr = str;
    if(str.match(/[(]/g).length!==str.match(/[)]/g).length){   //добавить проверку валидных символов
      return "Invalid sequence";
    }
    var arrOfSubForm = [];
    arrOfSubForm.push(locStr);
    locStr = removeFirstAndLastSymbol(locStr);
    // console.log(reqFindAll(locStr));
    arrOfSubForm.push(locStr);
    locStr.match(/\(.{3}\)/g).forEach(function(curr){
      arrOfSubForm.push(curr);
    });
    locStr.match(/\(.{2}\)/g).forEach(function(curr){
      arrOfSubForm.push(curr);
    });

    return arrOfSubForm;
  }

  function removeFirstAndLastSymbol(str){
    return str.slice(1,str.length-1);
  }


  String.prototype.replaceToGood = function(){
    return this.replace("^"," && ").replace("v"," || ")
    .replace("->"," <= ").replace("~"," == ");
  }

  // console.log(PORYADOK_PEREMENNIH);

  //
  // var testModel2 = new ModelOfIteration(PORYADOK_PEREMENNIH,getArrOfBin(Math.pow(2,findCountOfVar(TESTINGSTR)))[5]);
  // console.log(testModel2.getObject());
  // console.log(testModel.getObject());
  // console.log(getAllSubForm("(((A+B)*(B+C))+(!A)+(!(A*B)))"));
  // console.log("(A+B)*(B+C)+(!(A*B))".match(/!*\(.{3}\)/g));
  // console.log("((1^0)->1)~1".replaceToGood());
  // console.log(eval("(((1^1)->0)~0)".replaceToGood())); //goooooooood
}());
