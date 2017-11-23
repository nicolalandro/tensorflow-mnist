function openFile(event) {
            var input = event.target;

            var reader = new FileReader();
            reader.onload = function(){
              var dataURL = reader.result;
              var output = document.getElementById('output');
              output.src = dataURL;
              output.width = 150;
              output.height = 200;
            };
            reader.readAsDataURL(input.files[0]);
};

function init(){
    alert("pippo");
    $("#image_loader").on("change", openFile);
}

window.onload="init()";