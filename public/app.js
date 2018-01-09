/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*********/
// Builds the HTML Table out of myList.
function buildHtmlTable(myList, selector) {
  var columns = addAllColumnHeaders(myList, selector);

  for (var i = 0; i < myList.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = myList[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $(selector).append(row$);
  }
}

function addAllColumnHeaders(myList, selector) {
  var columnSet = [];
  var headerTr$ = $('<tr/>');
  for (var i = 0; i < myList.length; i++) {
    var rowHash = myList[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }
  $(selector).append(headerTr$);

  return columnSet;
}

/******/

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    //mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  }

const AddHobby = document.querySelector('.addHobby');
AddHobby.addEventListener('submit', (e) => {
  e.preventDefault();
  var firstname = AddHobby.querySelector('.firstname').value;
  var lastname = AddHobby.querySelector('.lastname').value;
  var hobby = AddHobby.querySelector('.hobby').value;
  //post('http://localhost:8085/addHobby', { firstname, lastname, hobby });
  post('http://10.1.0.20:8085/addHobby', { firstname, lastname, hobby });
  document.forms['addHobby'].reset();
});

const FindHobby = document.querySelector('.findHobby');
FindHobby.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstname = FindHobby.querySelector('.firstname').value;
  //post('http://localhost:8085/findHobby', { firstname })
  post('http://10.1.0.20:8085/findHobby', { firstname })
    .then(function(hobbyRows){
      return hobbyRows.json();
      })
      .then(function(hobbyJ){
      buildHtmlTable(hobbyJ.hobbyRows,'#excelDataTable');
    });
});

