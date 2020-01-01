$(".txtb input").on("click",function(){
    document.querySelectorAll(".txtb input").forEach(input => {
        if(input.value === "") {
            input.classList.remove("focus")
        } else {
            input.classList.add("focus")
        }
    });
    $(this).addClass("focus");
});
$(".txtb input[name='birthday']").on("focus",function(){
    $('.txtb .killer').addClass("focus");
});

// $(".txtb input").on("blur",function(){
//     if($(this).val() == "")
//     $(this).removeClass("focus");
// })