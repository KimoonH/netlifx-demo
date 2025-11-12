import React from "react";
import { Alert, Button } from "react-bootstrap";
import { getErrorMessage, getContextualErrorMessage } from "../../utils/errorHandler";
import "./ErrorMessage.css";

const ErrorMessage = ({ error, context, onRetry }) => {
  const errorInfo = context
    ? getContextualErrorMessage(error, context)
    : getErrorMessage(error);

  return (
    <div className="error-message-container">
      <Alert variant="danger" className="error-alert">
        <div className="error-content">
          <div className="error-icon">{errorInfo.icon}</div>
          <div className="error-text">
            <Alert.Heading className="error-title">{errorInfo.title}</Alert.Heading>
            <p className="error-description">{errorInfo.message}</p>
            {onRetry && (
              <Button
                variant="outline-light"
                size="sm"
                onClick={onRetry}
                className="retry-button"
              >
                🔄 다시 시도
              </Button>
            )}
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
