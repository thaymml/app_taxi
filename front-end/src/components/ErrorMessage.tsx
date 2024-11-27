import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div style={{ color: 'red', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '5px' }}>
    <strong>Erro:</strong> {message}
  </div>
);

export default ErrorMessage;