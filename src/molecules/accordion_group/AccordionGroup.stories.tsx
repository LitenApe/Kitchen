import { Meta, StoryFn } from '@storybook/react-vite';
import { AccordionGroup as Component } from '.';
import {
  Accordion,
  AccordionHeader,
  AccordionPanel,
} from '../../atoms/accordion';

export default {
  title: 'Molecule/AccordionGroup',
  component: Component,
  argTypes: {
    open: {
      name: 'open',
      description: 'controls which accordion that should be open',
      type: 'number',
    },
    onClick: {
      name: 'onClick',
      description: 'click handler to react on accordion toggle events',
    },
    initial: {
      name: 'initial',
      description: 'sets initial accordion to be open',
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Component {...args}>
    <Accordion>
      <AccordionHeader>Content 1</AccordionHeader>
      <AccordionPanel>
        Lorem ipsum nisi enim laboris velit aliquip anim in sed in sed veniam
        enim enim enim mollit exercitation est ut ut nulla culpa in duis
        excepteur dolore ut quis deserunt minim magna laboris aliqua pariatur ut
        aute adipisicing consequat sint sed anim et adipisicing aliquip sunt
        consequat fugiat consectetur eu ut elit cupidatat cupidatat voluptate
        nisi deserunt aliquip officia consequat minim eu ut quis consequat id
        sunt ea sunt aute consequat ullamco sed velit enim nulla minim enim
        eiusmod enim pariatur exercitation reprehenderit duis pariatur occaecat
        dolore nisi aliqua voluptate duis reprehenderit sit eiusmod sed commodo
        exercitation amet culpa mollit et dolore est est adipisicing esse
        laboris in pariatur culpa minim velit pariatur elit nisi aliqua ullamco
        occaecat sunt dolore non aute exercitation amet officia do commodo
        excepteur
      </AccordionPanel>
    </Accordion>
    <Accordion>
      <AccordionHeader>Content 2</AccordionHeader>
      <AccordionPanel>
        Lorem ipsum in ad occaecat labore adipisicing aliqua mollit excepteur
        dolore excepteur adipisicing non consequat duis est culpa sit nisi
        consectetur occaecat laborum aliqua enim in non do laborum qui ut
        exercitation anim id in enim culpa excepteur ut qui dolor laborum in
        minim sed qui enim excepteur nisi in consectetur consequat est proident
        nisi nostrud in dolore ut nulla cillum esse adipisicing non in tempor
        aliquip anim in incididunt qui dolore ullamco consectetur officia sit
        dolor id consectetur dolore eiusmod ut elit exercitation fugiat minim
        nulla est laborum exercitation fugiat mollit sunt ut pariatur est nisi
        commodo deserunt nostrud qui sed consectetur exercitation ut commodo
        fugiat in commodo velit nulla ad ut occaecat sit consectetur irure elit
        amet duis in consequat et fugiat magna tempor dolor fugiat
      </AccordionPanel>
    </Accordion>
    <Accordion>
      <AccordionHeader>Content 3</AccordionHeader>
      <AccordionPanel>
        aute consectetur pariatur esse commodo laborum ea esse amet in sunt ut
        ut amet in eiusmod aute laborum enim dolore voluptate occaecat voluptate
        deserunt aute aliqua culpa sunt fugiat anim voluptate consectetur quis
        magna est et voluptate ullamco tempor do non nulla non dolor dolore
        consectetur est anim ut duis culpa occaecat ut ullamco cupidatat
        consectetur quis laborum labore in ut eiusmod fugiat enim exercitation
        irure velit ea anim ex esse ut aute nisi anim aute excepteur culpa enim
        consequat qui est dolor veniam laborum irure ut cupidatat sunt amet
        mollit culpa minim do mollit duis commodo in cillum ullamco ut eiusmod
        mollit cillum eu elit do et ut mollit in deserunt nostrud et eu sed ea
        nisi eu adipisicing id culpa in incididunt dolore dolor non culpa
      </AccordionPanel>
    </Accordion>
  </Component>
);

export const AccordionGroup = Template.bind({});
AccordionGroup.storyName = 'AccordionGroup';
AccordionGroup.args = {
  ...AccordionGroup.args,
  initial: 1,
};
