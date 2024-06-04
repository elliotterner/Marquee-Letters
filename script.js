document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('YOUR_USER_ID');

    const lettersContainer = document.getElementById('letters');
    const numbersContainer = document.getElementById('numbers');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    // Create letter inputs
    for (let letter of alphabet) {
        let div = document.createElement('div');
        div.classList.add('letter-box');
        div.innerHTML = `<label>${letter}:</label> <input type="number" name="${letter}" min="0" max="10">`;
        lettersContainer.appendChild(div);
    }

    // Create number inputs
    for (let number of numbers) {
        let div = document.createElement('div');
        div.classList.add('number-box');
        div.innerHTML = `<label>${number}:</label> <input type="number" name="${number}" min="0" max="10">`;
        numbersContainer.appendChild(div);
    }

    // Form submission
    document.getElementById('rentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        let message = 'Rental request:\n';

        formData.forEach((value, key) => {
            if (value) {
                message += `${key}: ${value}\n`;
            }
        });

        // Send email
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            message: message,
            from_name: formData.get('name'),
            phone: formData.get('phone')
        }).then(() => {
            alert('Request sent successfully!');
        }).catch(error => {
            console.error('Error sending email:', error);
            alert('Failed to send request.');
        });

        // Send SMS using Twilio or another service
        // Example: sendSMS(message);

    });
});
