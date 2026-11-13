import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,i as r,n as i,t as a}from"./label-OZN2ntTl.js";import{i as o,n as s,o as c,t as l}from"./select-8X13hULH.js";var u,d,f,p,m,h,g;function _(){return(_=e((()=>{l(),r(),a(),u=t(),d={title:`Atom/Select`,component:c,parameters:{docs:{subtitle:`Lets users pick from a list of options`,description:{component:"A select lets users pick an option, or several with `multiple`, from a\nlist. Add the choices with `Option`, and group related ones under a\nheading with `OptionGroup`.\n\nInside a `Field`, `Select` is linked to its `Label`. Setting `error` marks\nit as invalid with `aria-invalid`, and uses the error as the browser's\nnative validation message."}}},argTypes:{multiple:{description:`Lets users pick more than one option.`,type:`boolean`},error:{description:`An error message. Marks the select as invalid and becomes its native validation message.`,type:`string`}}},f=({children:e,...t})=>(0,u.jsxs)(n,{children:[(0,u.jsx)(i,{children:`Choose a camera manufacturer`}),(0,u.jsx)(c,{...t,children:e})]}),p=f.bind({}),p.args={...p.args,children:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s,{label:`China`,children:(0,u.jsx)(o,{value:`dji`,children:`DJI`})}),(0,u.jsx)(s,{label:`Denmark`,children:(0,u.jsx)(o,{value:`phase-one`,children:`Phase One`})}),(0,u.jsxs)(s,{label:`Japanese`,children:[(0,u.jsx)(o,{value:`fujifilm`,children:`Fujifilm`}),(0,u.jsx)(o,{value:`canon`,children:`Canon`}),(0,u.jsx)(o,{value:`nikon`,children:`Nikon`})]}),(0,u.jsx)(s,{label:`German`,children:(0,u.jsx)(o,{value:`leica`,children:`Leica`})})]})},m=f.bind({}),m.args={...m.args,children:(0,u.jsx)(o,{children:`An option`})},h=f.bind({}),h.storyName=`OptionGroup`,h.args={...h.args,children:(0,u.jsx)(s,{label:`Option Group`})},g=[`Select`,`Option`,`OptionGroup`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`({
  children,
  ...args
}) => <Field>
    <Label>Choose a camera manufacturer</Label>
    <Component {...args}>{children}</Component>
  </Field>`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`({
  children,
  ...args
}) => <Field>
    <Label>Choose a camera manufacturer</Label>
    <Component {...args}>{children}</Component>
  </Field>`,...m.parameters?.docs?.source},description:{story:"`Option` is a single choice in a `Select`. Its `value` is what the select\nreports when the option is chosen, and its content is the text shown to the\nuser.",...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`({
  children,
  ...args
}) => <Field>
    <Label>Choose a camera manufacturer</Label>
    <Component {...args}>{children}</Component>
  </Field>`,...h.parameters?.docs?.source},description:{story:"`OptionGroup` groups related options under a heading, which is set through\n`label` and cannot be selected itself. This example shows an empty group,\nand the `Select` story above shows groups with options in them.",...h.parameters?.docs?.description}}}})))()}_();export{m as Option,h as OptionGroup,p as Select,g as __namedExportsOrder,d as default};