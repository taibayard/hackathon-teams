$(document).ready(function() {
    $(".delete-btn").click(function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr("href"),
            method: "DELETE"
        }).then(function(response) {
            window.location.href = "/teams";
        })
    });
});