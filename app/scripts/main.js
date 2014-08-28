(function () {
    'use strict';

    function subscription () {
        var emailElement = document.querySelector('#trial-email');
        var submitButton = document.querySelector('#pakiety .btn-submit');
        var emailSubject = encodeURIComponent(document.querySelector('#pakiety > h3').innerText);
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

    function carousel () {
        var container = document.querySelector('.carousel-container');
        var previous = container.querySelector('.navigation .prev');
        var next = container.querySelector('.navigation .next');
        var carouselItems = container.querySelectorAll('li');
        var counter = container.querySelector('.counter');
        var currentItem = 0;
        var animationInterval;
        var scrollEnd;

        function animateCarousel () {
            animationInterval = setInterval(moveForward, 3000);
        }

        function stopAnimation () {
            clearInterval(animationInterval);
        }

        function disableCurrentItem () {
            carouselItems[currentItem].classList.remove('active');
        }

        function setCurrentItem () {
            carouselItems[currentItem].classList.add('active');
            var img = carouselItems[currentItem].querySelector('img');
            if (img.getAttribute('data-original')) {
                img.setAttribute('src', img.getAttribute('data-original'));
            }
            counter.innerText = currentItem + 1 + '/' + carouselItems.length;
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

        function attachHandlers () {
            previous.addEventListener('click', moveBackward, false);
            next.addEventListener('click', moveForward, false);
            container.addEventListener('mouseover', stopAnimation, false);
            container.addEventListener('mouseout', animateCarousel, false);
            window.addEventListener('scroll', isInViewPort, false);
        }

        attachHandlers();
    }

    subscription();
    carousel();
})();
