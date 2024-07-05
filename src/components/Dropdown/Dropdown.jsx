import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ isOpen, setIsOpen, options, children, width, doFunc, positionStyle }) => {
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
            doFunc && doFunc()
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className={` inline-block text-left z-50 ${positionStyle}`}>
            <button
                className={`transition-transform ${isOpen ? 'rotate-90 bg-[#323b42]' : ''} inline-flex justify-center w-full p-2 text-sm font-medium rounded-full focus:outline-none`}
                onClick={toggleDropdown}
            >
                {children}
            </button>
            <div
                className={`origin-top-right overflow-hidden absolute right-0 z-50 mt-2 ${width || "w-56"} rounded-md bg-[#253137] shadow-md shadow-[#000000a1] ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                {options.map((option, index) => (
                    <div
                        key={index}
                        className="px-4 py-3 text-sm text-[#d2d7db] hover:bg-[#192229] cursor-pointer"
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
