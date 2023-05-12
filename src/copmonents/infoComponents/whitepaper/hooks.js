import { useEffect, useState, useRef } from 'react';

export function useHeadsObserver() {
  const [activeId, setActiveId] = useState('');
  const [sizeMoreThan539px, setSizeMoreThan539px] = useState(
    window.outerWidth <= 539 ? false : true
  );
  const observer = useRef();

  useEffect(() => {
    const handleObsever = (entries) => {
      entries.forEach((entry) => {
        const { id, offsetTop } = entry.target;
        const parentElement = entry.target.parentNode;
        const parentHeight = parentElement.offsetHeight;
        let scrolActivatorValueTop = parentHeight * 0.15;
        let scrolActivatorValueBottom = parentHeight * 0.15;
        if (id === 'funds-header') {
          scrolActivatorValueTop = 700;
        }
        if (entry?.isIntersecting) {
          window.addEventListener('scroll', () => {
            let scrollPosition = window.scrollY;
            if (
              scrollPosition >= offsetTop - scrolActivatorValueTop &&
              scrollPosition <
                offsetTop + parentHeight - scrolActivatorValueBottom
            ) {
              setActiveId(id);
            }
          });
          window.removeEventListener('scroll', () => {
            console.log('remove Listener');
          });
        }
      });
    };
    window.addEventListener('resize', function () {
      setSizeMoreThan539px(window.outerWidth <= 539 ? false : true);
    });
    observer.current = new IntersectionObserver(handleObsever);

    const elements = document.querySelectorAll(
      sizeMoreThan539px ? 'h2,h3' : 'h2'
    );
    elements.forEach((elem) => observer.current.observe(elem));
    return () => observer.current?.disconnect();
  }, [sizeMoreThan539px]);
  return { activeId };
}
