
import React, { useState, useRef } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Typography } from "@material-tailwind/react";

function EditableTextField({ label, text, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const inputRef = useRef(null);

  const handlePencilClick = () => {
    setIsEditing(true);
    // Espera a que el estado se actualice y luego enfoca el input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleInputChange = (e) => {
    setCurrentText(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(currentText);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (onSave) {
        onSave(currentText);
      }
    }
  };

  return (
    <div className="flex flex-row items-center space-x-4 w-full group">
      <Typography color="black"  variant="h6">
        {label}:
      </Typography>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={currentText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="border border-gray-200 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
      ) : (
        <Typography color="black" className="flex-1">
          {currentText}
        </Typography>
      )}
      <PencilIcon
        className="h-5 w-5 text-gray-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={handlePencilClick}
        title="Editar"
      />
    </div>
  );
}

export default EditableTextField;
