document.addEventListener('DOMContentLoaded', async () => {
    const checkButton = document.getElementById('check-availability');
    const dateInput = document.getElementById('date');
    const availabilityMessage = document.getElementById('availability-message');

    checkButton.addEventListener('click', async () => {
        const selectedDate = dateInput.value;
        if (!selectedDate) {
            alert("Please select a date!");
            return;
        }

        try {
            const response = await fetch('bookings.json');
            const bookingsData = await response.json();
            const available = bookingsData[selectedDate] || 0;

            if (available > 0) {
                availabilityMessage.innerHTML = `<p class="text-green-600">✅ ${available} board(s) available!</p>`;
            } else {
                availabilityMessage.innerHTML = `<p class="text-red-600">⚠️ All boards booked for ${selectedDate}</p>`;
            }
        } catch (error) {
            console.error("Error:", error);
            availabilityMessage.innerHTML = `<p class="text-red-600">⚠️ Error checking availability.</p>`;
        }
    });
});
