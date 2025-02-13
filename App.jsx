import React, { useState } from 'react';
import './App.css';

const RestaurantReservation = () => {
    const totalSeats = 20;
    const [seatsLeft, setSeatsLeft] = useState(totalSeats);
    const [reservations, setReservations] = useState([]);

    const handleReserve = (e) => {
        e.preventDefault();
        const guestCount = parseInt(e.target.guestCount.value);
        const name = e.target.customerName.value.trim();
        const phone = e.target.phoneNumber.value.trim();

        if (guestCount > seatsLeft) {
            alert('Not enough seats available!');
            return;
        }

        const newReservation = {
            id: Date.now(),
            name,
            phone,
            guestCount,
            checkIn: new Date().toLocaleTimeString(),
            checkOut: null
        };

        setReservations([...reservations, newReservation]);
        setSeatsLeft(seatsLeft - guestCount);
        e.target.reset();
    };

    const handleCheckout = (id) => {
        setReservations(reservations.map(res => res.id === id ? { ...res, checkOut: new Date().toLocaleTimeString() } : res));
    };

    const handleDelete = (id, guestCount, checkedOut) => {
        setReservations(reservations.filter(res => res.id !== id));
        if (!checkedOut) {
            setSeatsLeft(seatsLeft + guestCount);
        }
    };

    return (
        <div className="container">
            <h2>Restaurant Reservation System</h2>
            <p><strong>Seats Left: {seatsLeft}</strong></p>
            <form onSubmit={handleReserve}>
                <input type="number" name="guestCount" placeholder="Guest Count" required min="1" />
                <input type="text" name="customerName" placeholder="Name" required />
                <input type="text" name="phoneNumber" placeholder="Phone Number" required />
                <button type="submit">Reserve</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Check-in</th>
                        <th>Checkout</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(res => (
                        <tr key={res.id}>
                            <td>{res.name}</td>
                            <td>{res.phone}</td>
                            <td>{res.checkIn}</td>
                            <td>
                                {res.checkOut ? res.checkOut : <button onClick={() => handleCheckout(res.id)}>Click to Checkout</button>}
                            </td>
                            <td><button onClick={() => handleDelete(res.id, res.guestCount, res.checkOut)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantReservation;
