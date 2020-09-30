$(document).ready(function () {

    LoadAllInfo();


    function LoadAllInfo() {
        var one = 6;
        $.ajax({
            type: 'GET',
            url: "https://localhost:44390/api/Home/" + one, //Search name by id value
            datatype: 'json',

            success: function (data) {
                var name = data.Name;
                var splitName = name.split("-");
                $("#first_name").val(splitName[0]); 
                $("#last_name").val(splitName[1]);
                $("#email").val(data.Email);
                $("#type").val(data.Type);
                $("#status").val(data.Status);
                $("#password").val(data.Password);

                // var str = '';
                // for(var i = 0; i < data.length; i++)
                // {
                // 	str+= "<tr>  <td>"+data[i].PostId+"</td>  <td>"+data[i].PostTitle+"</td> <td>"+data[i].PostBody+"</td>    </tr>";
                // 	$("#allPost").html(str);
                // }
                // $("#first_name").val() = data.Name;
                //$("#last_name").val() = data.Name;

                
            },
            error: function () {
                alert("Something Went wrong");
            }
        });
    }


    $("#btnSave").click(function(){

        updateInfo();
    });

    function updateInfo() {
        var one = 6;
        $.ajax({
            type: 'PUT',
            url: "https://localhost:44390/api/Home/" + one, //Search name by id value
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token"),
                contentType: "application/json"
            },
            data: {
                Name: $("#first_name").val() +"-"+  $("#last_name").val(),
                Email: $("#email").val(),
                Type: $("#type").val(),
                Status: $("#status").val(),
                Password: $("#password").val()
                
            },

            success: function (data) {
                
                alert("Information Updated");
                location.href = "myProfile.html";
                                
            },
            error: function () {
                alert("Something Went wrong");
            }
        });
    }



});
