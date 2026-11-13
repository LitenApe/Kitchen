import { createElement, createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { mergeRefs } from '../mergeRefs';

describe('mergeRefs with DOM elements', () => {
  test('refs are merged when used with element ref', async () => {
    const testOne = createRef();
    const testTwo = { current: undefined };

    await render(createElement('button', { ref: mergeRefs(testOne, testTwo) }));

    const element = page.getByRole('button').element();
    expect(testOne.current).toBe(element);
    expect(testTwo.current).toBe(element);
  });
});
