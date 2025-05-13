document.addEventListener('DOMContentLoaded', async () => {
    // Fetch booking data
    const response = await fetch('bookings.json');
    const bookingsData = await response.json();

    // Initialize Flatpickr with dynamic disabled dates
    flatpickr(".flatpickr-input", {
        minDate: "2025-05-01",
        maxDate: "2025-09-30",
        dateFormat: "Y-m-d",
        disable: [
            function(date) {
                const dateString = date.format("Y-m-d");
                return bookingsData[dateString] === 2; // Disable when fully booked (2 boards booked)
            }
        ]
    });

    // Form submission handler
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedDate = document.querySelector('.flatpickr-input').value;
        const availabilityMessage = document.getElementById('availability-message');

        fetch('bookings.json')
            .then(response => response.json())
            .then(data => {
                const booked = data[selectedDate] || 0; // Default to 0 if not found
                const available = 2 - booked; // New calculation
                
                if (available > 0) {
                    availabilityMessage.innerHTML = `
                        <p class="text-green-600 font-semibold mb-2">✅ ${available} board(s) available!</p>
                        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2">Reserve Now</button>
                    `;
                } else {
                    availabilityMessage.innerHTML = `
                        <p class="text-red-600 font-semibold">⚠️ All boards booked for ${selectedDate}</p>
                    `;
                }
            })
            .catch(error => {
                availabilityMessage.innerHTML = "⚠️ Error checking availability.";
            });
    });
});
