import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Analytics.css';

const socket = io.connect("http://localhost:5000");

const Analytics = () => {
    const [analytics, setAnalytics] = useState({ sent: 0, pending: 0, failed: 0 });

    useEffect(() => {
        socket.on('statusUpdate', (data) => {
            setAnalytics(data);
        });
    }, []);

    return (
        <div className="analytics-container">
            <h3>Analytics</h3>
            <div className="analytics-stats">
                <p>Sent: {analytics.sent}</p>
                <p>Pending: {analytics.pending}</p>
                <p>Failed: {analytics.failed}</p>
            </div>
        </div>
    );
};

export default Analytics;
