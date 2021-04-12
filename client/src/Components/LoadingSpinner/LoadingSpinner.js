import React from 'react';
import 'Components/LoadingSpinner/LoadingSpinner.css';

const Loading = () => {
  return <div className="load-spinner">{Array(10).fill(<div></div>)}</div>;
};

export default Loading;
