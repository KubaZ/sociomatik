(function () {
    'use strict';

    function mobileNavigation () {
        var toggleButton = document.querySelector('.btn-navigation');
        var navigationContainer = document.querySelector('.navigation-container');

        function toggleVisibility (e) {
            if (e) {
                e.preventDefault();
            }

            navigationContainer.classList.toggle('open');
        }

        toggleButton.addEventListener('click', toggleVisibility, false);
        window.addEventListener('hashchange', toggleVisibility, false);
    }

    function subscription () {
        var emailElement = document.querySelector('#trial-email');
        var submitButton = document.querySelector('#pakiety .btn-submit');
        var emailSubject = encodeURIComponent(document.querySelector('#pakiety .container > h3').innerHTML);
        var submitButtonInitialValue = submitButton.getAttribute('href');

        function updateSubmitButton () {
            var email = encodeURIComponent('Email: ' + emailElement.value);
            submitButton.setAttribute(
                'href',
                submitButtonInitialValue + '?subject=' + emailSubject + '&body=' + email
            );
        }

        emailElement.addEventListener('change', updateSubmitButton, false);
        updateSubmitButton();
    }

    function carousel (options) {
        var container = document.querySelector('.carousel-container');
        var previous = container.querySelector('.navigation .prev');
        var next = container.querySelector('.navigation .next');
        var carouselItems;
        var counter = container.querySelector('.counter');
        var paginationDots = container.querySelectorAll('.pagination li');
        var currentItem = 0;
        var animationInterval;
        var scrollEnd;
        var isMobile = options.isMobile;

        function animateCarousel () {
            stopAnimation();
            animationInterval = setInterval(moveForward, 3000);
        }

        function stopAnimation () {
            clearInterval(animationInterval);
        }

        function disableCurrentItem () {
            carouselItems[currentItem].classList.remove('active');
            if (isMobile) {
                paginationDots[currentItem].classList.remove('active');
            }
        }

        function setCurrentItem () {
            carouselItems[currentItem].classList.add('active');
            var img = carouselItems[currentItem].querySelector('img');
            if (img && img.getAttribute('data-original')) {
                img.setAttribute('src', img.getAttribute('data-original'));
            }
            if (isMobile) {
                paginationDots[currentItem].classList.add('active');
                return;
            }
            counter.innerHTML = currentItem + 1 + '/' + carouselItems.length;
        }

        function paginationHandler (e) {
            e.preventDefault();
            disableCurrentItem();

            for (var i = 0; i < paginationDots.length; i++){
                if (paginationDots[i] === this) {
                    currentItem = i;
                    setCurrentItem();
                    return;
                }
            }
        }

        function moveBackward (e) {
            if (e) {
                e.preventDefault();
            }
            disableCurrentItem();
            currentItem--;
            checkBoundries();
            setCurrentItem();
        }

        function moveForward (e) {
            if (e) {
                e.preventDefault();
            }
            disableCurrentItem();
            currentItem++;
            checkBoundries();
            setCurrentItem();
        }

        function checkBoundries () {
            if (currentItem < 0) {
                currentItem = carouselItems.length - 1;
                return;
            }

            if (currentItem === carouselItems.length) {
                currentItem = 0;
                return;
            }
        }

        function isInViewPort () {
            clearTimeout(scrollEnd);
            scrollEnd = setTimeout(function () {
                if (document.body.scrollTop + window.innerHeight > container.getBoundingClientRect().top) {
                    animateCarousel();
                    window.removeEventListener('scroll', isInViewPort, false);
                }
            }, 100);
        }

        function attachDesktopHandlers () {
            previous.addEventListener('click', moveBackward, false);
            next.addEventListener('click', moveForward, false);
            container.addEventListener('mouseover', stopAnimation, false);
            container.addEventListener('mouseout', animateCarousel, false);
            window.addEventListener('scroll', isInViewPort, false);
        }

        function attachMobileHandlers () {
            previous.addEventListener('click', moveBackward, false);
            next.addEventListener('click', moveForward, false);
            for (var i = 0; i < paginationDots.length; i++) {
                paginationDots[i].addEventListener('click', paginationHandler, false);
            }
        }

        if (!isMobile) {
            carouselItems = container.querySelectorAll('.desktop li');
            attachDesktopHandlers();
            setCurrentItem();
            return;
        }

        carouselItems = container.querySelectorAll('.carousel.mobile li');
        attachMobileHandlers();
    }

    subscription();
    mobileNavigation();

    var desktopCarousel = new carousel({isMobile: false});
    var mobileCarousel = new carousel({isMobile: true});
})();
