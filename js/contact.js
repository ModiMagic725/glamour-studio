// Highlight today's row in the salon hours table
(function () {
    var rows = document.querySelectorAll('.hours-table tr');
    var i = (new Date().getDay() + 6) % 7;
    if (rows[i]) rows[i].classList.add('hours-today');
})();
