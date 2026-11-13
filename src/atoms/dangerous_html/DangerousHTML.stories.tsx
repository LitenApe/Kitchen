import { Meta, StoryFn } from '@storybook/react-vite';
import { DangerousHTML as Component } from '.';

/**
 * `DangerousHTML` renders a string of HTML, such as content from a CMS or
 * converted markdown, inside an element of your choice.
 *
 * **Only pass HTML which you trust or have sanitised.** The string is
 * inserted as-is through React's `dangerouslySetInnerHTML`, so untrusted
 * input can be used to run scripts on the page (cross-site scripting).
 */
export default {
  title: 'Atom/DangerousHTML',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'Renders a string of HTML',
    },
  },
  argTypes: {
    content: {
      description:
        'The HTML string to render inside the element. Must be trusted or sanitised.',
    },
    as: {
      description: 'The element to render the HTML into. Defaults to `div`.',
    },
  },
} as Meta;

const Template: StoryFn = (args) => <Component content="" {...args} />;

export const DangerousHTML = Template.bind({});
DangerousHTML.storyName = 'DangerousHTML';
DangerousHTML.args = {
  ...DangerousHTML.args,
  content:
    "<h1>What is lorem ipsum?</h1><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
};
