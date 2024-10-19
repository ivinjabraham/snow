import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/button';

const WorkflowPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const handleClick = () => {
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">
      <Button onClick={handleClick} label="Initiate" />
    </div>
  );
};

export default WorkflowPage;
