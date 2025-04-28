document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const underline = document.querySelector(".underline");

    function animateUnderlineTo(targetBtn) {
        const rect = targetBtn.getBoundingClientRect();
        const containerRect = targetBtn.closest(".nav-menu").getBoundingClientRect();

        const finalHalfWidth = rect.width / 2;
        const centerX = rect.left - containerRect.left + rect.width / 2;

        underline.style.width = `${finalHalfWidth + 30}px`;
        underline.style.left = `${centerX - (finalHalfWidth + 30) / 2}px`;

        setTimeout(() => {
            underline.style.width = `${finalHalfWidth}px`;
            underline.style.left = `${centerX - finalHalfWidth / 2}px`;
        }, 240);
    }

    function moveUnderlineToActive(withAnimation = true) {
        const active = document.querySelector(".nav-item.active button");
        if (!active) return;

        if (withAnimation) {
            animateUnderlineTo(active);
        } else {
            const rect = active.getBoundingClientRect();
            const containerRect = active.closest(".nav-menu").getBoundingClientRect();

            const finalHalfWidth = rect.width / 2;
            const centerX = rect.left - containerRect.left + rect.width / 2;

            underline.style.width = `${finalHalfWidth}px`;
            underline.style.left = `${centerX - finalHalfWidth / 2}px`;
        }
    }

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".nav-item.active")?.classList.remove("active");
            item.classList.add("active");
            moveUnderlineToActive(true);
        });
    });

    moveUnderlineToActive(false);
    window.addEventListener("resize", () => moveUnderlineToActive(false));
});