import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{i as r,n as i,o as a,s as o,t as s}from"./accordion-cEMSkmxx.js";import{n as c}from"./isDefined-BsJ_g28Y.js";import{n as l,t as u}from"./callAll-Dxn3Xfgc.js";function d(e=0){let[t,n]=(0,f.useState)(e);function r(){n(e=>e+1)}function i(){n(e=>e-1)}return[t,n,{increment:r,decrement:i}]}var f;function p(){return(p=e((()=>{f=t()})))()}function m(e){let{children:t,initial:n=-1,open:r,onClick:i}=e,[o,s]=d(n);function l(e){return function(t,n){!c(r)&&c(i)?console.warn(`${m.name}'s "open" is undefined while the component is in controlled mode. The click event recently received will be ignored. To fix the problem, either remove the "onClick" handler or add open to control which ${a.name} that should stay open.`):c(i)?i(t,e,n):s(()=>n?e:-1)}}return(0,h.useEffect)(()=>{c(r)&&s(()=>r)},[r,s]),(0,h.createElement)(h.Fragment,null,h.Children.map(t,(e,t)=>e.type===a?(0,h.cloneElement)(e,{...e.props,open:o===t,onClick:u(l(t),e.props.onClick)}):(console.warn(`Encountered a child of type ${e.type}! Only ${a.name} is allowed as direct descendant of ${a.name} The child will therefore be ignored!`),null)))}var h;function g(){return(g=e((()=>{h=t(),o(),l(),p()})))()}function _(){return(_=e((()=>{g()})))()}var v,y,b,x,S;function C(){return(C=e((()=>{_(),s(),v=n(),y={title:`Molecule/AccordionGroup`,component:m,parameters:{docs:{subtitle:`A set of accordions where only one is open at a time`,description:{component:"`AccordionGroup` coordinates a set of `Accordion` components so that only\none of them is open at a time. Opening an accordion closes the one which\nwas open, and clicking the open accordion closes it.\n\nLike `Accordion`, it can be used in two ways:\n\n- **Uncontrolled**: the group keeps track of which accordion is open. Use\n  `initial` to choose which one starts open, by its index.\n- **Controlled**: pass both `open` and `onClick`. A click only calls\n  `onClick` with the event, the accordion's index and its requested state,\n  and it is up to you to update `open`. Passing `onClick` without `open`\n  logs a warning and ignores the click.\n\nOnly `Accordion` elements are allowed as direct children. Anything else is\nleft out, with a warning in the console.\n\nThe example below is uncontrolled and starts with the second accordion open."}}},argTypes:{open:{description:"The index of the open accordion, or `-1` for none. Makes the group controlled together with `onClick`.",type:`number`},onClick:{description:`Called with the click event, the accordion's index and its requested open state when a heading is clicked.`},initial:{description:"The index of the accordion which starts open when the group is uncontrolled. Defaults to `-1`, where all of them are closed.",type:`number`}}},b=e=>(0,v.jsxs)(m,{...e,children:[(0,v.jsxs)(a,{children:[(0,v.jsx)(r,{children:`Content 1`}),(0,v.jsx)(i,{children:`Lorem ipsum nisi enim laboris velit aliquip anim in sed in sed veniam enim enim enim mollit exercitation est ut ut nulla culpa in duis excepteur dolore ut quis deserunt minim magna laboris aliqua pariatur ut aute adipisicing consequat sint sed anim et adipisicing aliquip sunt consequat fugiat consectetur eu ut elit cupidatat cupidatat voluptate nisi deserunt aliquip officia consequat minim eu ut quis consequat id sunt ea sunt aute consequat ullamco sed velit enim nulla minim enim eiusmod enim pariatur exercitation reprehenderit duis pariatur occaecat dolore nisi aliqua voluptate duis reprehenderit sit eiusmod sed commodo exercitation amet culpa mollit et dolore est est adipisicing esse laboris in pariatur culpa minim velit pariatur elit nisi aliqua ullamco occaecat sunt dolore non aute exercitation amet officia do commodo excepteur`})]}),(0,v.jsxs)(a,{children:[(0,v.jsx)(r,{children:`Content 2`}),(0,v.jsx)(i,{children:`Lorem ipsum in ad occaecat labore adipisicing aliqua mollit excepteur dolore excepteur adipisicing non consequat duis est culpa sit nisi consectetur occaecat laborum aliqua enim in non do laborum qui ut exercitation anim id in enim culpa excepteur ut qui dolor laborum in minim sed qui enim excepteur nisi in consectetur consequat est proident nisi nostrud in dolore ut nulla cillum esse adipisicing non in tempor aliquip anim in incididunt qui dolore ullamco consectetur officia sit dolor id consectetur dolore eiusmod ut elit exercitation fugiat minim nulla est laborum exercitation fugiat mollit sunt ut pariatur est nisi commodo deserunt nostrud qui sed consectetur exercitation ut commodo fugiat in commodo velit nulla ad ut occaecat sit consectetur irure elit amet duis in consequat et fugiat magna tempor dolor fugiat`})]}),(0,v.jsxs)(a,{children:[(0,v.jsx)(r,{children:`Content 3`}),(0,v.jsx)(i,{children:`aute consectetur pariatur esse commodo laborum ea esse amet in sunt ut ut amet in eiusmod aute laborum enim dolore voluptate occaecat voluptate deserunt aute aliqua culpa sunt fugiat anim voluptate consectetur quis magna est et voluptate ullamco tempor do non nulla non dolor dolore consectetur est anim ut duis culpa occaecat ut ullamco cupidatat consectetur quis laborum labore in ut eiusmod fugiat enim exercitation irure velit ea anim ex esse ut aute nisi anim aute excepteur culpa enim consequat qui est dolor veniam laborum irure ut cupidatat sunt amet mollit culpa minim do mollit duis commodo in cillum ullamco ut eiusmod mollit cillum eu elit do et ut mollit in deserunt nostrud et eu sed ea nisi eu adipisicing id culpa in incididunt dolore dolor non culpa`})]})]}),x=b.bind({}),x.storyName=`AccordionGroup`,x.args={...x.args,initial:1,onClick:void 0},S=[`AccordionGroup`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`args => <Component {...args}>
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
  </Component>`,...x.parameters?.docs?.source}}}})))()}C();export{x as AccordionGroup,S as __namedExportsOrder,y as default};