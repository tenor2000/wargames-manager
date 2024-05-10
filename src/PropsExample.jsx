import React, { useState } from 'react';

const Example = (props) => {
    return <h1>{props.data}</h1>;
};

const PropsExample = () => {
    // const [change, setChange] = useState(true);
    const [change, setChange] = useState(false);
    return (
        <div>
            <button onClick={() => setChange(!change)}>
                Click Here!
            </button>
            {change ? (
                <Example data = "Hello World" />
            ) : (
                <Example data = "Goodbye World" />
            )}
        </div>
    );
};

export default PropsExample;