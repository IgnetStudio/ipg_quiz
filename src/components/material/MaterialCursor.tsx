// packages

import React, { useEffect, useRef, useState } from 'react';

// code

export const MaterialCursor = () => {
  const cursorDotOutline = useRef<any>();
  const cursorDot = useRef<any>();
  const requestRef = useRef<any>();
  const previousTimeRef = useRef();
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  let cursorVisible = useRef(false);
  let cursorEnlarged = useRef(false);

  // mouse events handlers
  const onMouseMove = (event) => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
    positionDot(event);
  };
  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };
  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };
  const onMouseDown = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };
  const onMouseUp = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };
  const onResize = (event) => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  // hooks setup
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize);
    requestRef.current = requestAnimationFrame(animateDotOutline);
    linkHoverHandler();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let { x, y } = mousePosition;
  const winDimensions = { width, height };
  let endX = winDimensions.width / 2;
  let endY = winDimensions.height / 2;

  // cursor position
  function positionDot(e: MouseEvent) {
    cursorVisible.current = true;
    toggleCursorVisibility();
    // dot position
    endX = e.pageX;
    endY = e.pageY;
    cursorDot.current.style.top = endY + 'px';
    cursorDot.current.style.left = endX + 'px';
  }

  // cursor show/hide
  function toggleCursorVisibility() {
    if (cursorVisible.current) {
      cursorDot.current.style.opacity = 1;
      cursorDotOutline.current.style.opacity = 1;
    } else {
      cursorDot.current.style.opacity = 0;
      cursorDotOutline.current.style.opacity = 0;
    }
  }

  // cursor size
  function toggleCursorSize() {
    if (cursorEnlarged.current) {
      cursorDot.current.style.transform = 'translate(-50%, -50%) scale(0.7)';
      cursorDotOutline.current.style.transform = 'translate(-50%, -50%) scale(5)';
    } else {
      cursorDot.current.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorDotOutline.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }

  // apply mouse events on links
  function linkHoverHandler() {
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('mouseover', () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
      });
      el.addEventListener('mouseout', () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
      });
    });
  }

  // cursor with trail effect animation
  const animateDotOutline = (time) => {
    if (previousTimeRef.current !== undefined) {
      x += (endX - x) / 8;
      y += (endY - y) / 8;
      cursorDotOutline.current.style.top = y + 'px';
      cursorDotOutline.current.style.left = x + 'px';
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  return (
    <>
      <div ref={cursorDotOutline} id="cursor-dot-outline" />
      <div ref={cursorDot} id="cursor-dot" />
    </>
  );
};
