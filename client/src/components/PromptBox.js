import React, { useState } from 'react';
import './PromptBox.css';

const PromptBox = () => {
    const [prompt, setPrompt] = useState("");

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    return (
        <div className="prompt-box-container">
            <textarea
                placeholder="Enter your prompt with placeholders like {Company Name}"
                value={prompt}
                onChange={handlePromptChange}
            />
            <button>Set Prompt</button>
        </div>
    );
};

export default PromptBox;
