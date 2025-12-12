// Sample React component with intentional issues for testing the AI Code Reviewer

import React, { useState, useEffect } from 'react';
import * as lodash from 'lodash';

const TestComponent = () => {
    // Issue: var instead of const/let
    var count = 0;

    // Issue: Complex state object
    const [data, setData] = useState({
        name: '',
        email: '',
        age: 0
    });

    // Issue: Missing dependency in useEffect
    useEffect(() => {
        console.log(data.name);
    }, []);

    const items = ['apple', 'banana', 'cherry'];

    const handleClick = (item) => {
        console.log(item);
    };

    return (
        <div>
            <h1>Test Component</h1>

            {/* Issue: Missing alt text */}
            <img src="test.jpg" />

            {/* Issue: Missing key prop */}
            {/* Issue: Inline function */}
            {items.map(item => (
                <div onClick={() => handleClick(item)}>
                    {item}
                </div>
            ))}

            {/* Issue: Button without accessible text */}
            <button>
                <svg width="20" height="20">
                    <circle cx="10" cy="10" r="5" />
                </svg>
            </button>

            {/* Issue: Form input without label */}
            <input type="text" placeholder="Enter name" />
        </div>
    );
};

export default TestComponent;
