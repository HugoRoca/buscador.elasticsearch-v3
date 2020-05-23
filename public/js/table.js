$(document).ready(function () {
    $('.JStableOuter table').scroll(function (e) {
        $('.JStableOuter thead').css("left", -$(".JStableOuter tbody").scrollLeft());
        $('.JStableOuter thead th:nth-child(1)').css("left", $(".JStableOuter table").scrollLeft() - 0);
        $('.JStableOuter tbody td:nth-child(1)').css("left", $(".JStableOuter table").scrollLeft());

        $('.JStableOuter thead').css("top", -$(".JStableOuter tbody").scrollTop());
        $('.JStableOuter thead tr th').css("top", $(".JStableOuter table").scrollTop());
    });
});
