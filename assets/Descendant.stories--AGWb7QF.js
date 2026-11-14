import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";function r(e){return e.sort((e,t)=>{let n=e.compareDocumentPosition(t);if(n&Node.DOCUMENT_POSITION_DISCONNECTED)throw Error(`Cannot sort the given nodes`);return n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY?-1:n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS?1:0})}function i(e,t,n=!0){let r=e+1;return r<t?r:n?0:e}function a(e,t,n=!0){let r=e-1;return r>=0?r:n?t-1:e}function o(){let e=(0,c.use)(l);if(e===null)throw Error(`Component must be wrapped by Descendant`);return e}function s(){let{elements:e,register:t,unregister:n}=o(),[r,s]=(0,c.useState)(null),l=(0,c.useCallback)(e=>{if(e!==null)return t(e),s(e),()=>n(e)},[t,n]),u=r===null?-1:e.indexOf(r);return{index:u,ref:l,next:(t=!0)=>e[i(u,e.length,t)],prev:(t=!0)=>e[a(u,e.length,t)]}}var c,l;function u(){return(u=e((()=>{c=t(),l=(0,c.createContext)(null)})))()}function d(){let[e,t]=(0,f.useState)([]),n=(0,f.useCallback)(e=>{t(t=>t.includes(e)?t:r([...t,e]))},[]),i=(0,f.useCallback)(e=>{t(t=>t.filter(t=>t!==e))},[]);return(0,f.useMemo)(()=>({elements:e,register:n,unregister:i}),[e,n,i])}var f;function p(){return(p=e((()=>{f=t()})))()}function m({children:e}){let t=d();return(0,h.jsx)(l,{value:t,children:e})}var h;function g(){return(g=e((()=>{u(),p(),h=n()})))()}function _(){return(_=e((()=>{g(),u()})))()}var v,y,b,x;function S(){return(S=e((()=>{v=`_nested_184vs_2`,y=`_deeper_184vs_6`,b=`_deepest_184vs_10`,x={nested:v,deeper:y,deepest:b}})))()}function C(){let{index:e,ref:t}=s();return(0,w.jsxs)(`p`,{ref:t,children:[`Position of element: `,e]})}var w,T,E,D,O;function k(){return(k=e((()=>{_(),S(),w=n(),T={title:`Atom/Descendant`,component:m,parameters:{docs:{subtitle:`Tracks the order of related elements for focus navigation`,description:{component:`\`Descendant\` lets a set of related elements know their position among each
other, and find the element before or after them. It is a building block
for keyboard navigation and for moving focus between elements
programmatically, for example:

- moving between the options of a listbox or combobox with the arrow keys
- moving to the security code field as soon as a card's expiry date has
  been entered
- a PIN with one input per digit, where typing a digit moves to the next
  input and Backspace moves back to the previous one

Wrap the elements in \`Descendant\`, call \`useDescendant\` in each of them and
attach the \`ref\` it returns to the element. The hook then provides:

- \`index\`: the element's position, counted in document order regardless of
  how deeply it is nested
- \`next(loop)\` and \`prev(loop)\`: the next or previous registered element.
  They wrap around at the ends, or stay on the current element when \`loop\`
  is \`false\`.

Elements are unregistered automatically when they unmount. In the example
below, each paragraph shows the position it has been given, even though the
paragraphs are nested at different depths.`}}}},E=e=>(0,w.jsxs)(m,{...e,children:[(0,w.jsx)(C,{}),(0,w.jsx)(`div`,{className:x.nested,children:(0,w.jsx)(C,{})}),(0,w.jsx)(`div`,{className:x.deeper,children:(0,w.jsx)(`div`,{children:(0,w.jsx)(C,{})})}),(0,w.jsx)(`div`,{className:x.deepest,children:(0,w.jsx)(`div`,{children:(0,w.jsx)(`div`,{children:(0,w.jsx)(C,{})})})}),(0,w.jsx)(C,{})]}),D=E.bind({}),D.args={...D.args},O=[`Descendant`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`args => <Component {...args}>
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
  </Component>`,...D.parameters?.docs?.source}}}})))()}k();export{D as Descendant,O as __namedExportsOrder,T as default};