import React from 'react';
import Analytics from './Analytics';
import FileUpload from './FileUpload';
import PromptBox from './PromptBox';
import './DashBoard.css';

const DashBoard = () => {
    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="dashboard-section">
                <Analytics />
                <FileUpload />
                <PromptBox />
            </div>
        </div>
    );
};

export default DashBoard;
