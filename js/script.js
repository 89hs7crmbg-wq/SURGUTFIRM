document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader = document.querySelector(".page-loader");

    const finishLoading = () => {

        document.body.classList.add("loaded");

        if (loader) {

            setTimeout(() => {

                loader.classList.add("hidden");

                setTimeout(() => {
                    document.body.classList.remove("is-loading");
                }, 800);

            }, 600);

        } else {

            document.body.classList.remove("is-loading");

        }

    };


    if (document.readyState === "complete") {

        finishLoading();

    } else {

        window.addEventListener(
            "load",
            finishLoading,
            { once: true }
        );

    }


    /* =====================================================
       HEADER
    ===================================================== */

    const header = document.querySelector(".site-header");


    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       SERVICES
    ===================================================== */

    const serviceTabs =
        document.querySelectorAll(".service-tab");

    const serviceImages =
        document.querySelectorAll(".service-image");

    const serviceInfos =
        document.querySelectorAll(".service-info");

    const currentNumber =
        document.querySelector(".current-number");


    serviceTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const target =
                tab.dataset.service;


            /* Tabs */

            serviceTabs.forEach((item) => {

                item.classList.remove("active");

            });

            tab.classList.add("active");


            /* Images */

            serviceImages.forEach((image) => {

                image.classList.remove("active");

            });


            const targetImage =
                document.querySelector(
                    `.service-image[data-image="${target}"]`
                );


            if (targetImage) {

                targetImage.classList.add("active");

            }


            /* Text */

            serviceInfos.forEach((info) => {

                info.classList.remove("active");

            });


            const targetInfo =
                document.querySelector(
                    `.service-info[data-info="${target}"]`
                );


            if (targetInfo) {

                targetInfo.classList.add("active");

            }


            /* Counter */

            if (currentNumber) {

                const number =
                    tab.querySelector(".tab-number");

                if (number) {

                    currentNumber.textContent =
                        number.textContent;

                }

            }

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, .advantage"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       IMAGE ERROR CHECK
       Если изображение не загрузилось,
       добавляем класс для диагностики.
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            console.warn(
                "Не удалось загрузить изображение:",
                image.getAttribute("src")
            );

        });

    });


    /* =====================================================
       SERVICE SWIPE SUPPORT FOR MOBILE
    ===================================================== */

    const serviceNavigation =
        document.querySelector(
            ".services-navigation"
        );


    if (serviceNavigation) {

        let startX = 0;
        let startY = 0;


        serviceNavigation.addEventListener(
            "touchstart",
            (event) => {

                startX =
                    event.touches[0].clientX;

                startY =
                    event.touches[0].clientY;

            },
            { passive: true }
        );


        serviceNavigation.addEventListener(
            "touchend",
            (event) => {

                const endX =
                    event.changedTouches[0].clientX;

                const endY =
                    event.changedTouches[0].clientY;


                const deltaX =
                    endX - startX;

                const deltaY =
                    endY - startY;


                if (
                    Math.abs(deltaX) >
                    Math.abs(deltaY)
                ) {

                    serviceNavigation.scrollLeft -=
                        deltaX * 0.5;

                }

            },
            { passive: true }
        );

    }

});