import { useHeadsObserver } from './hooks';
import { useEffect, useState } from 'react';

function TableOfContent({ setIsOpen }) {
  const [headings, setHeadings] = useState([]);
  const { activeId } = useHeadsObserver();
  const [activeHeader, setActiveHeader] = useState(activeId);
  const [sizeMoreThan539px, setSizeMoreThan539px] = useState(
    window.visualViewport.width <= 539 ? false : true
  );

  useEffect(() => {
    setActiveHeader(activeId.length ? activeId : 'system-overview');
  }, [activeId]);

  const getClassName = (level) => {
    switch (level) {
      case 2:
        return 'head2 font-play text-base px-6';
      case 3:
        return 'head3 font-play text-sm px-8';
      case 4:
        return 'head4';
      default:
        return null;
    }
  };

  window.addEventListener('resize', function () {
    setSizeMoreThan539px(window.visualViewport.width <= 539 ? false : true);
  });
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(sizeMoreThan539px ? 'h2,h3' : 'h2')
    ).map((elem) => {
      return {
        id: elem.id,
        text: elem.innerText,
        level: Number(elem.nodeName.charAt(1)),
      };
    });
    setHeadings(elements);
  }, [sizeMoreThan539px]);

  return (
    <div className="border-l h-fit border-whiteDarkest">
      <nav className="pc540:py-16 h-fit sticky top-8 overflow-y-auto scrollbar-hide">
        <ul className="flex flex-col pc540:gap-1">
          {headings.map((heading) => {
            return (
              <li
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (setIsOpen) setIsOpen(false);
                  setActiveHeader(heading.id);
                  let element = document
                    .querySelector(`#${heading.id}`)
                    .getBoundingClientRect().top;
                  window.scrollBy(0, element - 80);
                }}
                key={heading.id}
                className={`relative cursor-pointer opacity-70 hover:opacity-100 pc540:opacity-100 ${getClassName(
                  heading.level
                )}`}
              >
                <span
                  className={`absolute left-0 h-full w-1 pc540:bg-cyan ${
                    activeHeader === heading.id ? 'block' : 'hidden'
                  }`}
                />
                <a
                  className={` ${
                    activeHeader === heading.id
                      ? 'pc540:opacity-100'
                      : 'pc540:opacity-30 hover:opacity-90 touch-auto'
                  } transition-opacity`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default TableOfContent;
