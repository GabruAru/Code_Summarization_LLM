// MarkdownRenderer.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ markdownContent }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
