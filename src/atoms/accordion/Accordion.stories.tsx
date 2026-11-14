import { action } from 'storybook/actions';
import { Meta, StoryFn } from '@storybook/react-vite';
import {
  Accordion as Component,
  AccordionHeader as Heading,
  AccordionPanel as Panel,
} from '.';

/**
 * An accordion is a heading paired with a section of content which users can
 * show or hide. The heading works as a control that reveals or hides its
 * content. Accordions are commonly used to reduce the need to scroll when
 * presenting multiple sections on a single page.
 *
 * `Accordion` holds the open state and shares it with its `AccordionHeader`
 * and `AccordionPanel`, which take care of the accessibility attributes that
 * link the two together. It can be used in two ways:
 *
 * - **Uncontrolled**: the accordion manages its own state. Use `initial` to
 *   choose whether it starts open.
 * - **Controlled**: pass both `open` and `onClick`. A click only calls
 *   `onClick` with the requested state, and it is up to you to update `open`.
 *   Passing `onClick` without `open` logs a warning and ignores the click.
 *
 * The example below is controlled. Clicking the heading logs the requested
 * state in the **Actions** panel, and `open` can be changed from **Controls**.
 */
export default {
  title: 'Atom/Accordion',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'A heading which shows or hides a section of content',
    },
  },
  argTypes: {
    initial: {
      description: 'Whether the accordion starts open when it is uncontrolled.',
      type: 'boolean',
    },
    open: {
      description:
        'Whether the content is visible. Makes the accordion controlled together with `onClick`.',
      type: 'boolean',
    },
    onClick: {
      description:
        'Called with the click event and the requested open state when the heading is clicked.',
      type: 'function',
    },
  },
} satisfies Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Component {...args}>{children}</Component>
);

export const Accordion = Template.bind({});
Accordion.args = {
  ...Accordion.args,
  open: true,
  onClick: action('toggle'),
  children: (
    <>
      <Heading>Accordion Heading</Heading>
      <Panel>
        <h4>What is Lorem Ipsum?</h4>
        <p>
          Lorem ipsum occaecat sunt esse ut aliquip in magna irure dolor
          deserunt pariatur sint exercitation anim ex ut occaecat enim mollit ad
          non dolore sit ut minim fugiat voluptate incididunt deserunt mollit
          mollit exercitation qui occaecat laborum cillum proident ut fugiat qui
          irure elit laborum in excepteur nisi amet officia culpa ut in pariatur
          velit veniam nisi consequat aliqua anim ex aliqua deserunt irure anim
          incididunt amet et occaecat in esse aliqua consectetur elit qui ea
          amet enim amet pariatur sed ex sit minim laborum eiusmod tempor id
          anim laboris irure incididunt esse in laboris mollit pariatur enim
          esse dolore adipisicing cillum ullamco proident excepteur aute est
          sint in anim dolore sint elit nisi eiusmod proident eu ex mollit
          cupidatat reprehenderit ullamco consequat eu tempor amet est sunt
        </p>

        <h4>Why do we use it?</h4>
        <p>
          Lorem ipsum nostrud consectetur minim tempor occaecat do proident
          exercitation fugiat aute irure velit excepteur ut aliqua velit dolor
          adipisicing nostrud deserunt veniam aliqua aliqua amet nostrud dolor
          ad reprehenderit adipisicing incididunt irure irure est dolore laboris
          irure aliqua quis ut laborum qui eiusmod eiusmod magna in sunt
          consequat consequat esse labore aliqua velit eu dolore et nulla magna
          dolore enim ea dolore deserunt consequat sunt laboris reprehenderit
          nostrud elit id exercitation mollit sunt dolore dolor duis commodo
          exercitation cillum excepteur culpa anim esse nisi ut ut sunt amet
          dolore commodo commodo esse aliquip enim enim laboris adipisicing
          exercitation id nisi pariatur magna cupidatat ullamco non sit est
          exercitation tempor amet adipisicing ex quis nulla consequat voluptate
          enim qui velit ut id occaecat velit ut tempor veniam nulla
        </p>
      </Panel>
    </>
  ),
};

/**
 * `AccordionHeader` is the button which shows or hides the content. It points
 * to its panel through `aria-controls` and reports whether the panel is open
 * through `aria-expanded`. It renders only a button, so wrap it in a heading
 * of the appropriate level (`h2` to `h6`) when using it on a page.
 *
 * Setting `disabled` or `aria-disabled` makes it ignore clicks, while keeping
 * it focusable so keyboard and screen reader users can still discover it.
 *
 * This example is uncontrolled, so clicking it toggles `aria-expanded`.
 */
export const AccordionHeader = Template.bind({});
AccordionHeader.storyName = 'AccordionHeader';
AccordionHeader.args = {
  children: <Heading>Accordion Heading</Heading>,
  // an explicit `undefined` stops Storybook from injecting an action for
  // `onClick`, which would make the accordion controlled and ignore clicks
  onClick: undefined,
};

/**
 * `AccordionPanel` is a `section` which holds the content. It is labelled by
 * its header, and hidden from assistive technologies with `aria-hidden` while
 * the accordion is closed. The content is only rendered while the accordion
 * is open.
 *
 * Change `open` from **Controls** to show or hide the content.
 */
export const AccordionPanel = Template.bind({});
AccordionPanel.storyName = 'AccordionPanel';
AccordionPanel.args = {
  open: true,
  children: (
    <Panel>
      <h4>What is Lorem Ipsum?</h4>
      <p>
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry's standard
        dummy text ever since the 1500s, when an unknown printer took a galley
        of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more
        recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </p>

      <h4>Why do we use it?</h4>
      <p>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </p>
    </Panel>
  ),
};
