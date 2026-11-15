import type { Meta, StoryObj } from '@storybook/react-vite';

import { Descendant, useDescendant } from '.';
import styles from './Descendant.stories.module.css';

/** A paragraph which shows the position it has been given. */
function Position() {
  const { index, ref } = useDescendant<HTMLParagraphElement>();
  return <p ref={ref}>Position of element: {index}</p>;
}

/**
 * `Descendant` lets a set of related elements know their position among each
 * other, and find the element before or after them. It is a building block
 * for keyboard navigation and for moving focus between elements
 * programmatically, for example:
 *
 * - moving between the options of a listbox or combobox with the arrow keys
 * - moving to the security code field as soon as a card's expiry date has
 *   been entered
 * - a PIN with one input per digit, where typing a digit moves to the next
 *   input and Backspace moves back to the previous one
 *
 * Wrap the elements in `Descendant`, call `useDescendant` in each of them and
 * attach the `ref` it returns to the element. The hook then provides:
 *
 * - `index`: the element's position, counted in document order regardless of
 *   how deeply it is nested. It is `-1` during the first render, before the
 *   element has been registered. It is updated when elements are added,
 *   removed or moved, such as when a keyed list is reordered.
 * - `next(loop)` and `prev(loop)`: the next or previous registered element.
 *   They wrap around at the ends, or stay on the current element when `loop`
 *   is `false`.
 *
 * Elements are unregistered automatically when they unmount. In the example
 * below, each paragraph shows the position it has been given, even though the
 * paragraphs are nested at different depths.
 */
const meta = {
  title: 'Atom/Descendant',
  component: Descendant,
  parameters: {
    docs: {
      subtitle: 'Tracks the order of related elements for focus navigation',
    },
  },
  argTypes: {
    children: { control: false },
  },
  render: (args) => (
    <Descendant {...args}>
      <Position />
      <div className={styles.nested}>
        <Position />
      </div>
      <div className={styles.deeper}>
        <div>
          <Position />
        </div>
      </div>
      <div className={styles.deepest}>
        <div>
          <div>
            <Position />
          </div>
        </div>
      </div>
      <Position />
    </Descendant>
  ),
} satisfies Meta<typeof Descendant>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
