$(document).ready(function() {

    var location = window.location.href;
    var id = location.substring(location.lastIndexOf("/") + 1);
    LoadAllInfo(id);


    function LoadAllInfo(id) {

        $.ajax({
            type: 'GET',
            url: "https://localhost:44390/api/Admin/" + id, //Search name by id value
            datatype: 'json',

            success: function(data) {
                var name = data.Name;
                $("#first_name").val(name);
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
            error: function() {
                alert("Something Went wrong");
            }
        });
    }


    $("#btnSave").click(function() {

        updateInfo(id);
    });

    function updateInfo(id) {

        $.ajax({
            type: 'PUT',
            url: "https://localhost:44390/api/Home/" + id, //Search name by id value
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token"),
                contentType: "application/json"
            },
            data: {
                Name: $("#first_name").val(),
                Email: $("#email").val(),
                Type: $("#type").val(),
                Status: $("#status").val(),
                Password: $("#password").val()

            },

            success: function(data) {

                alert("Information Updated");


            },
            error: function() {
                alert("Something Went wrong");
            }
        });
    }



});