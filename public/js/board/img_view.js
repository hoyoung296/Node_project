const readURL = ( input ) => {
    const file = input.files[0];
    if( file != '' ){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            document.querySelector("#preview").src = e.target.result;
        }
    }
}