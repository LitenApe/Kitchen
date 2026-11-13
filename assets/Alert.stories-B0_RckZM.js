import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./alert-CGC_jWp2.js";var i,a,o,s,c;function l(){return(l=e((()=>{r(),i=t(),a={title:`Atom/Alert`,component:n,parameters:{docs:{subtitle:`Announces important messages to screen readers`,description:{component:`An alert displays a brief, important message which draws the user's
attention without interrupting their task. Alerts which are rendered
dynamically are announced by most screen readers.

\`Alert\` uses \`aria-live\` instead of the \`alert\` role, so you can choose how
urgently each message is announced. It defaults to \`assertive\`, which
interrupts whatever the screen reader is reading. Pass \`aria-live="polite"\`
to wait until the screen reader has finished instead.

The content is inserted shortly after the element has mounted. Screen
readers only announce changes to live regions which already exist, so a
message rendered at the same time as its container would go unnoticed. The
message is announced again whenever its content changes.`}}},argTypes:{as:{description:"The element to render. Defaults to `div`."},children:{description:`The message to show and announce.`,type:`string`}}},o=e=>(0,i.jsx)(n,{as:`p`,...e}),s=o.bind({}),s.args={...s.args,children:`Alert message`},c=[`Alert`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => <Component as="p" {...args} />`,...s.parameters?.docs?.source}}}})))()}l();export{s as Alert,c as __namedExportsOrder,a as default};