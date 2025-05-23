document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const selectedDate = document.getElementById('date').value;
    const availabilityMessage = document.getElementById('availability-message');

    // Simulate checking Google Calendar (replace with real logic later)
    const bookedDates = ['2023-10-15', '2023-10-16']; // Example booked dates
    const totalBoards = 2;
    
    if (bookedDates.includes(selectedDate)) {
        availabilityMessage.innerHTML = `<p style="color: red;">⚠️ ${totalBoards - bookedDates.length} board(s) available!</p>`;
    } else {
        availabilityMessage.innerHTML = `<p style="color: green;">✅ ${totalBoards} boards available!</p>`;
    }
});
