import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

function FaqItem(props) {
  const [isOpen, setIsOpen] = useState(props.num === 1 ? true : false);
  const [isExpanded, setIsExpanded] = useState(props.num === 1 ? true : false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-b font-play py-5 border-whiteInheritLess w-full bg-gray-200">
      <button className="flex justify-between w-full" onClick={handleToggle}>
        <span className="font-bold leading-6">{props.title}</span>
        <span className={`border-2 h-[18px] w-[18px] border-white opacity-20`}>
          <p className="-mt-1">{isOpen ? '-' : '+'}</p>
        </span>
      </button>
      <div
        className={`max-h-0 transition-all duration-200 ease-in-out ${
          isExpanded ? 'max-h-[500px] py-2' : ''
        }`}
      >
        <Transition
          show={isOpen}
          enter="transition-all duration-200 transform-gpu origin-top delay-50"
          enterFrom="opacity-0 translate-y-[-10%]"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all duration-300 transform-gpu origin-top"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-[-10%]"
        >
          {isOpen && (
            <div className="text-left text-sm leading-[21px]">
              <p>{props.content}</p>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
}

export default FaqItem;
