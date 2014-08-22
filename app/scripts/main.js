(function () {
    'use strict';

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
})();
