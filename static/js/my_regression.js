function success(data){
    console.log("success")
    $("#output").text(JSON.stringify(data.results[0]));
};
function complete(){
    console.log("complete")
};
function error(xhr){
    var info = ["Error ["+xhr.status+", "+xhr.statusText+"]"];
    $("#output").text(info);
};

$(document).ready(
             function(){
                $('#input').on('change', function() {
                    var formData = {"x": parseFloat($(this).val())};
                    console.log("request: " + JSON.stringify(formData))

                    $.ajax({
                        url: 			"/api/my_regression",
                        type: 			'POST',
                        data: 			JSON.stringify(formData),
                        contentType:    "application/json; charset=utf-8",
                        dataType:       "json",
                        complete:       complete,
                        success: 		success,
                        error:          error
                    });
                });
             }
     );