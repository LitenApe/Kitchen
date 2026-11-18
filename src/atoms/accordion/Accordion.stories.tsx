import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Accordion, AccordionHeader, AccordionPanel } from '.';

/**
 * An accordion is a heading paired with a section of content which users can
 * show or hide. The heading works as a control that reveals or hides its
 * content. Accordions are commonly used to reduce the need to scroll when
 * presenting multiple sections on a single page.
 *
 * `Accordion` shares its state with its `AccordionHeader` and
 * `AccordionPanel`, which take care of the accessibility attributes that link
 * the two together. It renders a `div` around them, which receives every
 * other prop, including `onClick`.
 *
 * `Accordion` is controlled: it shows its panel while `open` is set, and a
 * click on its header only calls `onOpenChange` with the opposite state and
 * the click event. Update `open` from there to open or close the accordion,
 * or leave it as it is to refuse the change. That leaves it to you how a set
 * of accordions behaves, such as keeping only one of them open at a time:
 *
 * ```tsx
 * const [openIndex, setOpenIndex] = useState(-1);
 *
 * sections.map((section, index) => (
 *   <Accordion
 *     key={section.id}
 *     open={openIndex === index}
 *     onOpenChange={(open) => setOpenIndex(open ? index : -1)}
 *   >
 *     …
 *   </Accordion>
 * ));
 * ```
 *
 * If an open accordion cannot be closed, such as one which always has to stay
 * open, set `aria-disabled` on its header, so that screen readers know.
 *
 * In the first example, clicking the heading logs the requested state in the
 * **Actions** panel, and `open` can be changed from **Controls**.
 */
const meta = {
  title: 'Atom/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      subtitle: 'A heading which shows or hides a section of content',
    },
  },
  argTypes: {
    children: {
      description:
        'An `AccordionHeader` and the `AccordionPanel` it shows or hides. Either can be wrapped in other elements, such as a heading around the header.',
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
    onOpenChange: {
      table: {
        type: {
          summary:
            '(open: boolean, event: MouseEvent<HTMLButtonElement>) => void',
        },
      },
    },
  },
  args: {
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    children: (
      <>
        <AccordionHeader>Accordion Heading</AccordionHeader>
        <AccordionPanel>
          <h4>What is Lorem Ipsum?</h4>
          <p>
            Lorem ipsum occaecat sunt esse ut aliquip in magna irure dolor
            deserunt pariatur sint exercitation anim ex ut occaecat enim mollit
            ad non dolore sit ut minim fugiat voluptate incididunt deserunt
            mollit mollit exercitation qui occaecat laborum cillum proident ut
            fugiat qui irure elit laborum in excepteur nisi amet officia culpa
            ut in pariatur velit veniam nisi consequat aliqua anim ex aliqua
            deserunt irure anim incididunt amet et occaecat in esse aliqua
            consectetur elit qui ea amet enim amet pariatur sed ex sit minim
            laborum eiusmod tempor id anim laboris irure incididunt esse in
            laboris mollit pariatur enim esse dolore adipisicing cillum ullamco
            proident excepteur aute est sint in anim dolore sint elit nisi
            eiusmod proident eu ex mollit cupidatat reprehenderit ullamco
            consequat eu tempor amet est sunt
          </p>

          <h4>Why do we use it?</h4>
          <p>
            Lorem ipsum nostrud consectetur minim tempor occaecat do proident
            exercitation fugiat aute irure velit excepteur ut aliqua velit dolor
            adipisicing nostrud deserunt veniam aliqua aliqua amet nostrud dolor
            ad reprehenderit adipisicing incididunt irure irure est dolore
            laboris irure aliqua quis ut laborum qui eiusmod eiusmod magna in
            sunt consequat consequat esse labore aliqua velit eu dolore et nulla
            magna dolore enim ea dolore deserunt consequat sunt laboris
            reprehenderit nostrud elit id exercitation mollit sunt dolore dolor
            duis commodo exercitation cillum excepteur culpa anim esse nisi ut
            ut sunt amet dolore commodo commodo esse aliquip enim enim laboris
            adipisicing exercitation id nisi pariatur magna cupidatat ullamco
            non sit est exercitation tempor amet adipisicing ex quis nulla
            consequat voluptate enim qui velit ut id occaecat velit ut tempor
            veniam nulla
          </p>
        </AccordionPanel>
      </>
    ),
  },
};

/**
 * `AccordionHeader` is the button which asks for its accordion to be opened
 * or closed. It points to its panel through `aria-controls` and reports
 * whether the panel is open through `aria-expanded`. It renders only a button,
 * so wrap it in a heading of the appropriate level (`h2` to `h6`) when using
 * it on a page. Unlike a plain `button`, it does not submit a surrounding
 * form.
 *
 * Setting `disabled` or `aria-disabled` makes it ignore clicks, while keeping
 * it focusable so keyboard and screen reader users can still discover it.
 *
 * Change `open` from **Controls** to see `aria-expanded` follow it. Clicking
 * the header logs the requested state in the **Actions** panel.
 */
export const Header: Story = {
  args: {
    open: false,
    children: <AccordionHeader>Accordion Heading</AccordionHeader>,
  },
};

/**
 * `AccordionPanel` is a `section` which holds the content, and is labelled by
 * its header. While the accordion is closed, the panel is hidden with the
 * `hidden` attribute, even if it is given a `display` of its own. Its content
 * is rendered even while the accordion is closed, so it keeps its state, such
 * as what was typed into it. Like any hidden content, the browser's
 * find-in-page can't find it while it is closed.
 *
 * Change `open` from **Controls** to show or hide the content.
 */
export const Panel: Story = {
  args: {
    open: true,
    children: (
      <AccordionPanel>
        <h4>What is Lorem Ipsum?</h4>
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
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
      </AccordionPanel>
    ),
  },
};
