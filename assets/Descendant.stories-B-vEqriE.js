import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{i as r,n as i}from"./isUndefined-BwI_D8py.js";function a(e){(0,o.useEffect)(()=>e,[])}var o;function s(){return(s=e((()=>{o=t()})))()}function c(){let e=(0,l.useContext)(u),t=(0,l.useRef)(null);if(r(e))throw Error(`Component must be wrapped by Descendant`);a(()=>{e.unregister(t.current)});let n=(0,l.useCallback)(n=>{e.register(n.current),t.current=n.current},[e,t]),i=e.manager.getIndex(t.current);return{index:i,register:n,next:(0,l.useCallback)((t=!0)=>e.manager.next(i,t),[e,i]),prev:(0,l.useCallback)((t=!0)=>e.manager.prev(i,t),[e,i])}}var l,u;function d(){return(d=e((()=>{l=t(),s(),u=(0,l.createContext)(null)})))()}function f(e){return e.sort((e,t)=>{let n=e.compareDocumentPosition(t);if(n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY)return-1;if(n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)throw Error(`Cannot sort the given nodes`);return 0})}function p(e,t,n=!0){let r=e+1;return r<t?r:n?0:e}function m(e,t,n=!0){let r=e-1;return r>=0?r:n?t-1:e}var h;function g(){return(g=e((()=>{h=class{descendant=new Map;register(e){r(e)||(this.descendant.set(e,-1),f(Array.from(this.descendant.keys())).forEach((e,t)=>this.descendant.set(e,t)))}unregister(e){r(e)||this.descendant.delete(e)}getIndex(e){if(r(e))return-1;let t=this.descendant.get(e);return i(t)?-1:t}values(){return Array.from(this.descendant).sort((e,t)=>e[1]-t[1])}item(e){if(!(this.descendant.size<e))return this.values()[e][0]}next(e,t=!0){let n=p(e,this.descendant.size,t);return this.item(n)}prev(e,t=!0){let n=m(e,this.descendant.size,t);return this.item(n)}}})))()}function _(e){let t=(0,v.useRef)(new h),[n,r]=(0,v.useState)(0),i=(0,v.useCallback)(e=>{t.current.register(e),r(e=>e+1)},[t,r]),a=(0,v.useCallback)(e=>{t.current.unregister(e),r(e=>e-1)},[t,r]);return(0,v.createElement)(u.Provider,{value:{register:i,unregister:a,descendants:n,manager:t.current}},e.children)}var v;function y(){return(y=e((()=>{v=t(),d(),g()})))()}function b(){return(b=e((()=>{y(),d()})))()}function x(e){(0,S.useEffect)(e,[])}var S;function C(){return(C=e((()=>{S=t()})))()}function w({pos:e}){let t=(0,T.createRef)(),{index:n,register:r}=c();return x(()=>{r(t)}),(0,E.jsxs)(`p`,{ref:t,"data-id":e,children:[`Position of element: `,n]})}var T,E,D,O,k,A;function j(){return(j=e((()=>{T=t(),b(),C(),E=n(),D={title:`Atom/Descendant`,component:_,parameters:{docs:{subtitle:`Tracks the order of related elements for focus navigation`,description:{component:`\`Descendant\` lets a set of related elements know their position among each
other, and find the element before or after them. It is a building block
for keyboard navigation and for moving focus between elements
programmatically, for example:

- moving between the options of a listbox or combobox with the arrow keys
- moving to the security code field as soon as a card's expiry date has
  been entered
- a PIN with one input per digit, where typing a digit moves to the next
  input and Backspace moves back to the previous one

Wrap the elements in \`Descendant\` and call \`useDescendant\` in each of them.
Once an element has mounted, register its ref with \`register\`, and the
hook provides:

- \`index\`: the element's position, counted in document order regardless of
  how deeply it is nested
- \`next(loop)\` and \`prev(loop)\`: the next or previous registered element.
  They wrap around at the ends, or stay on the current element when \`loop\`
  is \`false\`.

Elements are unregistered automatically when they unmount. In the example
below, each paragraph shows the position it has been given, even though the
paragraphs are nested at different depths.`}}}},O=e=>(0,E.jsxs)(_,{...e,children:[(0,E.jsx)(w,{pos:0}),(0,E.jsx)(`div`,{style:{padding:5},children:(0,E.jsx)(w,{pos:1})}),(0,E.jsx)(`div`,{style:{padding:10},children:(0,E.jsx)(`div`,{children:(0,E.jsx)(w,{pos:2})})}),(0,E.jsx)(`div`,{style:{padding:20},children:(0,E.jsx)(`div`,{children:(0,E.jsx)(`div`,{children:(0,E.jsx)(w,{pos:3})})})}),(0,E.jsx)(w,{pos:4})]}),k=O.bind({}),k.args={...k.args},A=[`Descendant`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`args => <Component {...args}>
    <TestComponent pos={0} />
    <div style={{
    padding: 5
  }}>
      <TestComponent pos={1} />
    </div>
    <div style={{
    padding: 10
  }}>
      <div>
        <TestComponent pos={2} />
      </div>
    </div>
    <div style={{
    padding: 20
  }}>
      <div>
        <div>
          <TestComponent pos={3} />
        </div>
      </div>
    </div>
    <TestComponent pos={4} />
  </Component>`,...k.parameters?.docs?.source}}}})))()}j();export{k as Descendant,A as __namedExportsOrder,D as default};