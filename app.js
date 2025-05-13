document.addEventListener('DOMContentLoaded', () => {
    const checkBtn = document.getElementById('check-availability');
    const dateInput = document.getElementById('date');
    const messageDiv = document.getElementById('availability-message');

    const showMessage = (text, isError = false) => {
        messageDiv.textContent = text;
        messageDiv.className = `text-center ${isError ? 'text-red-600' : 'text-green-600'} font-semibold`;
    };

    checkBtn.addEventListener('click', async () => {
        try {
            const selectedDate = dateInput.value;
            if (!selectedDate) {
                showMessage('Please select a date first!', true);
                return;
            }

            const response = await fetch('bookings.json');
            if (!response.ok) throw new Error('Failed to load availability data');
            
            const bookings = await response.json();
            const available = bookings[selectedDate] ?? 0;

            if (available > 0) {
                showMessage(`✅ ${available} board${available > 1 ? 's' : ''} available!`);
            } else {
                showMessage('⚠️ Fully booked for this date', true);
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('⚠️ Service unavailable - please try again later', true);
        }
    });
});
