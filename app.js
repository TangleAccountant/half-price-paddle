document.addEventListener('DOMContentLoaded', () => {
  const checkButton = document.getElementById('check-availability');
  const dateInput = document.getElementById('date');
  const availabilityMessage = document.getElementById('availability-message');

  checkButton.addEventListener('click', async () => {
    const selectedDate = dateInput.value;

    if (!selectedDate) {
      availabilityMessage.innerHTML = `
        <p class="text-red-600 font-semibold">⚠️ Please select a date!</p>
      `;
      return;
    }

    try {
      const response = await fetch('bookings.json');
      if (!response.ok) throw new Error("Failed to load bookings");
      
      const bookingsData = await response.json();
      const available = bookingsData[selectedDate] ?? 0; // Use nullish coalescing

      availabilityMessage.innerHTML = available > 0 
        ? `<p class="text-green-600 font-semibold">✅ ${available} board(s) available!</p>`
        : `<p class="text-red-600 font-semibold">⚠️ All boards booked for ${selectedDate}</p>`;

    } catch (error) {
      console.error("Error:", error);
      availabilityMessage.innerHTML = `
        <p class="text-red-600 font-semibold">⚠️ Error checking availability. Try again later.</p>
      `;
    }
  });
});
