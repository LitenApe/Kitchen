import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r}from"./isDefined-BsJ_g28Y.js";var i,a;function o(){return(o=e((()=>{i=t(),a=class extends i.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){r(this.props.logger)&&this.props.logger(e,t)}render(){let{children:e,fallback:t}=this.props;return this.state.hasError?(0,i.createElement)(t):e}}})))()}function s(){return(s=e((()=>{o()})))()}function c(){throw Error(`Error thrown to trigger fallback`)}var l,u,d,f,p;function m(){return(m=e((()=>{s(),l=n(),u={title:`Atom/ErrorBoundary`,component:a,parameters:{docs:{subtitle:`Shows a fallback when its children fail to render`,description:{component:`An error boundary catches errors thrown while its children render, and
shows a fallback instead, so a single failing component does not take down
the whole page.

After an error, \`fallback\` is rendered in place of the children until the
boundary is remounted. \`logger\` is called with the error and React's error
info, which includes the component stack, for example to report the error
to a tracking service.

Like any React error boundary, it does not catch errors thrown in event
handlers or asynchronous code. The example below renders a child which
always throws, so the fallback is shown.`}}},argTypes:{fallback:{description:`A component to render instead of the children after an error.`},logger:{description:`Called with the error and React's error info when an error is caught.`}}},d=({children:e,...t})=>(0,l.jsx)(a,{fallback:()=>(0,l.jsx)(`p`,{children:`Fallback component rendered`}),...t,children:(0,l.jsx)(c,{})}),f=d.bind({}),f.storyName=`ErrorBoundary`,f.args={...f.args},p=[`ErrorBoundary`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`({
  children,
  ...rest
}) => <Component fallback={() => <p>Fallback component rendered</p>} {...rest}>
    <ErrorThrower />
  </Component>`,...f.parameters?.docs?.source}}}})))()}m();export{f as ErrorBoundary,p as __namedExportsOrder,u as default};