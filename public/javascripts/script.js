
$(function() {
      $(document).on("change",".uploadFile", function()
      {
              var uploadFile = $(this);
          var files = !!this.files ? this.files : [];
          if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
   
          if (/^image/.test( files[0].type)){ // only image file
              var reader = new FileReader(); // instance of the FileReader
              reader.readAsDataURL(files[0]); // read the local file
   
              reader.onloadend = function(){ // set image data as background of div
                  //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
  uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url("+this.result+")");
              }
          }
        
      });
      $('#loading-modal').modal('hide');

      $("#my-form").submit(function (e) {
        e.preventDefault();
        $('#loading-modal').modal('show');
        var formData = new FormData(this);
        console.log(formData)
        $.ajax({
            type: "POST",
            url: "/detect",
            data: formData,
            processData: false,
            contentType: false,
            success: function(r){
                console.log("result",r)
                document.getElementsByTagName('pre')[0].innerHTML=r.result;
                $('#loading-modal').modal('hide');
            },
            error: function (e) {
                console.log("some error", e);
            }
        });    
    });              
    
  });

  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}