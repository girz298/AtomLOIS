function ModelOfIteration(porOfVar, stateOfVar){
    var saveObj = {};
    for (var i = 0; i < porOfVar.length; i++) {
      saveObj[porOfVar[i]]=stateOfVar[i];
    }
    return {
      getObject : function (){
        return saveObj;
      },
      addColumn : function (colName,state) {
        saveObj[colName]=state;
      }
    }
}
