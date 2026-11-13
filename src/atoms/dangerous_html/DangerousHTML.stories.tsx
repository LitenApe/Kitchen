import { Meta, StoryFn } from '@storybook/react-vite';
import { DangerousHTML as Component } from '.';

export default {
  title: 'Atom/DangerousHTML',
  component: Component,
  argTypes: {
    content: {
      name: 'content',
      description:
        'HTML text string to be converted and injected into the DOM as HMTL',
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
