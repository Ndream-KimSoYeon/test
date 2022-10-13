import React from 'react';

type Nil = undefined | null;

const convertPxToRem = (value: string | number) => {
  if (typeof value === 'string' && value.slice(-2, value.length) === 'px') {
    const onlyNumber = +value.slice(0, value.length - 2);
    return `${onlyNumber / 16}rem`;
  }

  return typeof value === 'number' && `${value / 16}rem`;
};

const shouldNotForwardProp = (...args: string[]) => ({
  shouldForwardProp: (propName: string) => !args.includes(propName)
});

const scrollIntoView = (
  ref: React.RefObject<HTMLElement>,
  block?: 'start' | 'center' | 'end' | 'nearest'
) =>
  ref.current?.scrollIntoView({
    behavior: 'smooth',
    block: block || 'start'
  });

const scrollTo = (
  ref: React.RefObject<HTMLElement>,
  scrollPosition = 0,
  isLeftDireciton = false
) =>
  ref.current?.scrollTo(
    isLeftDireciton
      ? {
          left: scrollPosition,
          behavior: 'smooth'
        }
      : {
          top: scrollPosition,
          behavior: 'smooth'
        }
  );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const assertNever = (param: never): never => {
  throw new Error('Unexpected value. Should have been never');
};

const isNil = <T>(param: T | Nil): param is T =>
  param !== undefined && param !== null;

const helpers = Object.freeze({
  convertPxToRem,
  shouldNotForwardProp,
  scrollIntoView,
  scrollTo,
  assertNever,
  isNil
});

export default helpers;
