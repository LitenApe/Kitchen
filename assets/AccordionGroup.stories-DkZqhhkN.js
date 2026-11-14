import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{c as r,i,l as a,n as o,o as s,t as c}from"./accordion-ClRVsWYd.js";import{n as l,t as u}from"./callAll-B2Fk8Ha0.js";function d(e){return(0,f.isValidElement)(e)&&e.type===s}var f;function p(){return(p=e((()=>{f=t(),c()})))()}function m({initial:e=-1,open:t,onClick:n,children:r}){let[i,o]=a({name:`AccordionGroup`,value:t,defaultValue:e,onChange:n&&((e,t,r)=>n(t,r,e===r))});return(0,g.jsx)(g.Fragment,{children:h.Children.map(r,(e,t)=>d(e)?(0,h.cloneElement)(e,{open:i===t,onClick:u((e,n)=>o(n?t:-1,e,t),e.props.onClick)}):(console.warn(`AccordionGroup only accepts Accordion elements as children, so another child was left out.`),null))})}var h,g;function _(){return(_=e((()=>{h=t(),l(),r(),p(),g=n()})))()}function v(){return(v=e((()=>{_()})))()}var y,b,x,S,C;function w(){return(w=e((()=>{v(),c(),y=n(),b={title:`Molecule/AccordionGroup`,component:m,parameters:{docs:{subtitle:`A set of accordions where only one is open at a time`,description:{component:"`AccordionGroup` coordinates a set of `Accordion` components so that only\none of them is open at a time. Opening an accordion closes the one which\nwas open, and clicking the open accordion closes it.\n\nLike `Accordion`, it can be used in two ways:\n\n- **Uncontrolled**: the group keeps track of which accordion is open. Use\n  `initial` to choose which one starts open, by its index.\n- **Controlled**: pass both `open` and `onClick`. A click only calls\n  `onClick` with the event, the accordion's index and its requested state,\n  and it is up to you to update `open`. Passing `onClick` without `open`\n  logs a warning and ignores the click.\n\nOnly `Accordion` elements are allowed as direct children. Anything else is\nleft out, with a warning in the console.\n\nThe example below is uncontrolled and starts with the second accordion open."}}},argTypes:{open:{description:"The index of the open accordion, or `-1` for none. Makes the group controlled together with `onClick`.",type:`number`},onClick:{description:`Called with the click event, the accordion's index and its requested open state when a heading is clicked.`},initial:{description:"The index of the accordion which starts open when the group is uncontrolled. Defaults to `-1`, where all of them are closed.",type:`number`}}},x=e=>(0,y.jsxs)(m,{...e,children:[(0,y.jsxs)(s,{children:[(0,y.jsx)(i,{children:`Content 1`}),(0,y.jsx)(o,{children:`Lorem ipsum nisi enim laboris velit aliquip anim in sed in sed veniam enim enim enim mollit exercitation est ut ut nulla culpa in duis excepteur dolore ut quis deserunt minim magna laboris aliqua pariatur ut aute adipisicing consequat sint sed anim et adipisicing aliquip sunt consequat fugiat consectetur eu ut elit cupidatat cupidatat voluptate nisi deserunt aliquip officia consequat minim eu ut quis consequat id sunt ea sunt aute consequat ullamco sed velit enim nulla minim enim eiusmod enim pariatur exercitation reprehenderit duis pariatur occaecat dolore nisi aliqua voluptate duis reprehenderit sit eiusmod sed commodo exercitation amet culpa mollit et dolore est est adipisicing esse laboris in pariatur culpa minim velit pariatur elit nisi aliqua ullamco occaecat sunt dolore non aute exercitation amet officia do commodo excepteur`})]}),(0,y.jsxs)(s,{children:[(0,y.jsx)(i,{children:`Content 2`}),(0,y.jsx)(o,{children:`Lorem ipsum in ad occaecat labore adipisicing aliqua mollit excepteur dolore excepteur adipisicing non consequat duis est culpa sit nisi consectetur occaecat laborum aliqua enim in non do laborum qui ut exercitation anim id in enim culpa excepteur ut qui dolor laborum in minim sed qui enim excepteur nisi in consectetur consequat est proident nisi nostrud in dolore ut nulla cillum esse adipisicing non in tempor aliquip anim in incididunt qui dolore ullamco consectetur officia sit dolor id consectetur dolore eiusmod ut elit exercitation fugiat minim nulla est laborum exercitation fugiat mollit sunt ut pariatur est nisi commodo deserunt nostrud qui sed consectetur exercitation ut commodo fugiat in commodo velit nulla ad ut occaecat sit consectetur irure elit amet duis in consequat et fugiat magna tempor dolor fugiat`})]}),(0,y.jsxs)(s,{children:[(0,y.jsx)(i,{children:`Content 3`}),(0,y.jsx)(o,{children:`aute consectetur pariatur esse commodo laborum ea esse amet in sunt ut ut amet in eiusmod aute laborum enim dolore voluptate occaecat voluptate deserunt aute aliqua culpa sunt fugiat anim voluptate consectetur quis magna est et voluptate ullamco tempor do non nulla non dolor dolore consectetur est anim ut duis culpa occaecat ut ullamco cupidatat consectetur quis laborum labore in ut eiusmod fugiat enim exercitation irure velit ea anim ex esse ut aute nisi anim aute excepteur culpa enim consequat qui est dolor veniam laborum irure ut cupidatat sunt amet mollit culpa minim do mollit duis commodo in cillum ullamco ut eiusmod mollit cillum eu elit do et ut mollit in deserunt nostrud et eu sed ea nisi eu adipisicing id culpa in incididunt dolore dolor non culpa`})]})]}),S=x.bind({}),S.storyName=`AccordionGroup`,S.args={...S.args,initial:1,onClick:void 0},C=[`AccordionGroup`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`args => <Component {...args}>
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
  </Component>`,...S.parameters?.docs?.source}}}})))()}w();export{S as AccordionGroup,C as __namedExportsOrder,b as default};