document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('booking-form');
    const dateInput = document.getElementById('date');
    const availabilityMessage = document.getElementById('availability-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const selectedDate = dateInput.value;
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
            console.error("Error fetching data:", error);
            availabilityMessage.innerHTML = `<p class="text-red-600">⚠️ Error checking availability.</p>`;
        }
    });
});
