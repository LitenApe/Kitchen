import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./alert-DHsS64yb.js";var i,a,o,s,c;function l(){return(l=e((()=>{r(),i=t(),a={title:`Atom/Alert`,component:n,parameters:{docs:{subtitle:`Announces important messages to screen readers`,description:{component:`An alert displays a brief, important message which draws the user's
attention without interrupting their task. Alerts which are rendered
dynamically are announced by most screen readers.

\`Alert\` uses \`aria-live\` instead of the \`alert\` role, so you can choose how
urgently each message is announced. It defaults to \`assertive\`, which
interrupts whatever the screen reader is reading. Pass \`aria-live="polite"\`
to wait until the screen reader has finished instead.

Screen readers only announce changes to live regions they already know
about, so a message rendered together with its container could go
unnoticed. \`Alert\` therefore holds its content back for 100 ms after it
mounts, and shows every later change straight away. To announce a message
the moment it arrives, render the \`Alert\` ahead of time and only change its
content.`}}},argTypes:{as:{description:"The element to render. Defaults to `div`."},children:{description:`The message to show and announce.`,type:`string`}}},o=e=>(0,i.jsx)(n,{as:`p`,...e}),s=o.bind({}),s.args={...s.args,children:`Alert message`},c=[`Alert`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => <Component as="p" {...args} />`,...s.parameters?.docs?.source}}}})))()}l();export{s as Alert,c as __namedExportsOrder,a as default};