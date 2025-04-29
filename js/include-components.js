// Dynamically load nav and footer into placeholders
function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

document.addEventListener("DOMContentLoaded", function() {
    loadComponent("nav-placeholder", "nav.html");
    loadComponent("footer-placeholder", "footer.html");
});
