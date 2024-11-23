// site.js
document.addEventListener("DOMContentLoaded", function () {
    let sidebarContentCache = null; // Cache to store sidebar content

    const sidebar = document.querySelector("#sidebar");
    const offcanvasBody = sidebar.querySelector(".offcanvas-body");

    sidebar.addEventListener("show.bs.offcanvas", function () {
        // Check if content is already loaded
        if (!sidebarContentCache) {
            fetch("/sidebar-content.html") // Path to the sidebar content file
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to load sidebar content");
                    }
                    return response.text();
                })
                .then(content => {
                    sidebarContentCache = content; // Store in cache
                    offcanvasBody.innerHTML = content; // Populate sidebar body
                    offcanvasBody.setAttribute("data-loaded", "true");
                })
                .catch(error => {
                    console.error(error);
                    offcanvasBody.innerHTML = "<p>Failed to load content. Please try again later.</p>";
                });
        } else {
            // Load from cache if already fetched
            offcanvasBody.innerHTML = sidebarContentCache;
        }
    });
});
