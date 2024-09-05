import { useState } from 'react';
import './App.css';

interface ErrorState {
    test1: boolean;
    test2: boolean;
}

interface ErrorRegex {
    test1: string;
    test2: string;
}

const regex: ErrorRegex = {
    test1: "exampleRegex",    // Example regex
    test2: "exampleRegex2", // Example regex
}

function App() {
    const [inputError, setInputError] = useState<ErrorState>({
        test1: false,
        test2: false,
    });

    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
        test1: '',
        test2: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;

        setInputValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));

        // Get the regex string for the current input's id
        const currentRegex = regex[id as keyof ErrorRegex];

        // Create a RegExp object and test the input value
        const isValid = new RegExp(currentRegex).test(value);

        // Update the inputError state accordingly
        setInputError((prevErrors) => ({
            ...prevErrors,
            [id]: !isValid, // Set to true if invalid
        }));

        console.log(`ID: ${id}, Value: ${value}, Valid: ${isValid}`);
    };

    return (
        <>
            <div>
                <input
                    id="test1"
                    type="text"
                    value={inputValues.test1}
                    onChange={handleChange}
                />
                {inputError.test1 && <span style={{ color: 'red' }}>Invalid value for test1</span>}

                <input
                    id="test2"
                    type="text"
                    value={inputValues.test2}
                    onChange={handleChange}
                />
                {inputError.test2 && <span style={{ color: 'red' }}>Invalid value for test2</span>}
            </div>
        </>
    );
}

export default App;
