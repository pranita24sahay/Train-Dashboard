import React from 'react';

const thStyle = {
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd'
};

const tdStyle = {
    padding: '8px 12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left'
};

const rowStyleEven = {
    backgroundColor: '#f9f9f9'
};

const rowStyleOdd = {
    backgroundColor: '#fff'
};

const WaitingTrains = ({ getUnallocatedArrivedTrains }) => (
    <div>
        <h2>Waiting Trains</h2>
        {getUnallocatedArrivedTrains.length > 0 ? (
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                <tr style={{backgroundColor: '#f5f5f5'}}>
                    <th style={thStyle}>Train Number</th>
                    <th style={thStyle}>Priority</th>
                    <th style={thStyle}>Arrival Time</th>
                </tr>
                </thead>
                <tbody>
                {getUnallocatedArrivedTrains.map((train, index) => (
                    <tr key={index} style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}>
                        <td style={tdStyle}>{train.trainNumber}</td>
                        <td style={tdStyle}>{train.priority}</td>
                        <td style={tdStyle}>{train.arrivalTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        ) : (
            <p style={{color: '#777', fontStyle: 'italic'}}>No waiting trains at the moment</p>
        )}
    </div>
);

export default WaitingTrains;
