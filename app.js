document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch booking data (with error handling)
        const response = await fetch('bookings.json');
        if (!response.ok) {
            throw new Error("Failed to load bookings.json");
        }
        const bookingsData = await response.json();

        // Initialize Flatpickr
        flatpickr(".flatpickr-input", {
            minDate: "2025-05-01",
            maxDate: "2025-09-30",
            dateFormat: "Y-m-d",
            disable: [
                function(date) {
                    // Correct date formatting
                    const dateString = date.toISOString().split('T')[0];
                    return bookingsData[dateString] === 2;
                }
            ]
        });

        // Form submission handler
        document.getElementById('booking-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedDate = document.querySelector('.flatpickr-input').value;
            const availabilityMessage = document.getElementById('availability-message');

            // Reuse the existing bookingsData (no need to fetch again)
            const booked = bookingsData[selectedDate] || 0;
            const available = 2 - booked;

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
        });
    } catch (error) {
        console.error("Error initializing calendar or fetching data:", error);
        alert("Error loading booking data. Check console for details.");
    }
});
