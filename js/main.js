(function(){
  var PORYADOK_PEREMENNIH = "";
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
  console.log(findCountOfVar("(A^B+C+B+A+DABHTABAB)"));

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
  console.log(getArrOfBin(Math.pow(2,findCountOfVar("(A^B+C+D+D+C+A)"))));

  // (A+B)*(B+C)+(!(A*B))
  function getAllSubForm(str){
    if(str.match(/[(]/g).length!==str.match(/[)]/g).length){   //добавить проверку валидных символов
      return "Invalid sequence";
    }
    var arrOfSubForm = [];
  }

  String.prototype.replaceToGood = function(){
    return this.replace("^"," && ").replace("v"," || ")
    .replace("->"," <= ").replace("~"," == ");
  }

  // console.log(PORYADOK_PEREMENNIH);

  var testModel = new ModelOfIteration(PORYADOK_PEREMENNIH,getArrOfBin(Math.pow(2,findCountOfVar("(A^B+C+D+D+C+A)")))[0]);
  console.log(testModel.getObject());
  var testModel2 = new ModelOfIteration(PORYADOK_PEREMENNIH,getArrOfBin(Math.pow(2,findCountOfVar("(A^B+C+D+D+C+A)")))[5]);
  console.log(testModel2.getObject());
  console.log(testModel.getObject());
  console.log(getAllSubForm("(((A+B)*(B+C))+(!(A*B)))"));
  console.log("(A+B)*(B+C)+(!(A*B))".match(/\(.{0,3}\)/g));
  console.log("((1^0)->1)~1".replaceToGood());
  console.log(eval("(((1^1)->0)~0)".replaceToGood())); //goooooooood
}());
