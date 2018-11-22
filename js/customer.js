
var host = "";

var readLink = "";
var writeLink = "";
var updateLink = "";

function initTodo(){
    $.ajax({url: readLink, success: function(result){
        var rows = result;
        var t = $('#dataTables-example').DataTable();
        t.clear().draw();
        for(var row in rows) {
            if(rows[row].done == ''){
                t.row.add( [
                    "",
                    rows[row].content,
                    rows[row].created,
                    rows[row].deadline
                ] ).draw( false );
            }
        }
        $('.add-todo').val('');
    }});
};

function initDone(){
    $.ajax({url: readLink, success: function(result){
        var rows = result;
        var t = $('#dataTables-example1').DataTable();
        t.clear();
        for(var row in rows) {
            if(rows[row].done != ''){
                t.row.add( [
                    rows[row].content,
                    rows[row].created,
                    rows[row].deadline,
                    rows[row].done
                ] ).draw( false );
            }
        }
    }});
};
    
$("#add").click(function(){
   if($("#newItem").val() != ''){
    var todo = $("#newItem").val();
     
    var deadline = '';
    if($("#chk-deadline")[0].checked) {
        deadline=$('#date-value').val();
    }

    var curDate = getCurrentDateTime();
     $.ajax({
      type: "POST",
      url: writeLink,
      data: {
        "content":  todo,
        "deadline": deadline,
        "created": curDate,
        "done": "",
        "date": getCurrentDateTime()
      },
      success: function(data) {
        var t = $('#dataTables-example').DataTable();
        t.row.add( [
            "",
            todo,
            curDate,
            deadline
        ] ).draw( false );
      },
      dataType: "json"
    });
    $('.add-todo').val('');
   }else{
       alert("Please input task content");
   }
});

function getCurrentDate(){
    
    var today = new Date(); 
    var dd = today.getDate(); 
    var mm = today.getMonth()+1; //January is 0! 
    var yyyy = today.getFullYear(); 
    if(dd<10){ dd='0'+dd; } 
    if(mm<10){ mm='0'+mm; } 
    var hours = today.getHours(), minutes = today.getMinutes(), seconds = today.getSeconds(); 
    return yyyy+'-'+mm+'-'+dd;
};

function getCurrentDateTime(){
    
    var today = new Date(); 
    var dd = today.getDate(); 
    var mm = today.getMonth()+1; //January is 0! 
    var yyyy = today.getFullYear(); 
    if(dd<10){ dd='0'+dd; } 
    if(mm<10){ mm='0'+mm; } 
    var hours = today.getHours(), minutes = today.getMinutes(), seconds = today.getSeconds(); 
    return yyyy+'-'+mm+'-'+dd+' '+hours+':'+minutes+':'+seconds;
};