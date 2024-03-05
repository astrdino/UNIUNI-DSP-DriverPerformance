import React from 'react';
import { FaCopy } from 'react-icons/fa';

const CopyIcon = ({ textToCopy }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <button onClick={copyToClipboard} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      <FaCopy />
    </button>
  );
};

export default CopyIcon;
