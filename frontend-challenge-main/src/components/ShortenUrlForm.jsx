/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';
import axios from 'axios'

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [url, setUrl] = useState('');
    const [copiedText, setCopiedText] = useState('');

    const onChange = useCallback(
        (e) => {
            // Set the component's new state based on the user's input
            setValue(e.target.value);

            // Remove shorten url below input fields
            setUrl('');
            // Remove information -> url copied
            setCopiedText('')
        },
        [],
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            // Send shorten url request
            axios.post('http://localhost:3030/', {"url" : value}).then(result => {
                const shortenUrl = result.data;
                // Show shorten url below input fields
                setUrl(shortenUrl);
                // Copy to clipboard and inform user
                navigator.clipboard.writeText(shortenUrl);   
                setCopiedText('Copied: ');         
            }).catch(err => {
                // Show error message below input fields
                setUrl(err.response.data);
            });
        },
        [
            value
        ],
    );

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input
                    placeholder="Url to shorten"
                    id="shorten"
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </label>
            <input type="submit" value="Shorten and copy URL" />
            <div>{copiedText}{url}</div>
        </form>
    );
};

export default ShortenUrlForm;
