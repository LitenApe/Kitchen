import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,i as r,n as i,t as a}from"./label-BcmVJ8SV.js";import{n as o,t as s}from"./legend-DOQUA9B8.js";import{a as c,i as l,n as u,t as d}from"./radio-Dnoi2o-y.js";var f,p,m,h,g,_;function v(){return(v=e((()=>{l(),d(),a(),s(),r(),f=t(),{action:p}=__STORYBOOK_MODULE_ACTIONS__,m={title:`Atom/RadioGroup`,component:c,parameters:{docs:{subtitle:`Groups radios which share a name and event handlers`,description:{component:"`RadioGroup` groups related radios in a `fieldset` with the `radiogroup`\nrole. Start it with a `Legend` to name the group, and give each radio its\nown `Field` and `Label`.\n\nProps passed to the group, such as `name`, `onChange` or `required`, are\nshared with every `Radio` inside it rather than set on the `fieldset`. The\n`aria-` props which name, describe or validate the group, such as\n`aria-label`, `aria-labelledby` or `aria-required`, are set on the\n`fieldset` instead, as they belong to the group as a whole. `onBlur` is\nonly called when focus leaves the group, and not when it moves between the\nradios inside it.\n\nErrors belong to the group as a whole. `error` marks the `fieldset` as\ninvalid with `aria-invalid`, and becomes the native validation message of\nevery radio, which keeps the form from being submitted. Show the message\nyourself and point to it with `aria-describedby`, which describes the\n`fieldset` rather than its radios. Inside a field, such as the one\n`RadioField` renders, the group takes the field's error and descriptions.\n\nSelect a radio and then move focus out of the group to see `onChange` and\n`onBlur` in the **Actions** panel."}}},argTypes:{name:{description:`The name shared by every radio in the group.`,type:`string`},onChange:{description:`Called when one of the radios is selected.`},onBlur:{description:`Called when focus leaves the group.`},error:{description:`An error message, which marks the group as invalid and keeps the form from being submitted.`,type:`string`}}},h=e=>(0,f.jsxs)(c,{...e,children:[(0,f.jsx)(o,{children:`Bicycle brand`}),(0,f.jsxs)(n,{children:[(0,f.jsx)(u,{value:`trek`}),(0,f.jsx)(i,{children:`Trek`})]}),(0,f.jsxs)(n,{children:[(0,f.jsx)(u,{value:`specialized`}),(0,f.jsx)(i,{children:`Specialized`})]}),(0,f.jsxs)(n,{children:[(0,f.jsx)(u,{value:`cannondale`}),(0,f.jsx)(i,{children:`Cannondale`})]}),(0,f.jsxs)(n,{children:[(0,f.jsx)(u,{value:`canyon`}),(0,f.jsx)(i,{children:`Canyon`})]})]}),g=h.bind({}),g.storyName=`RadioGroup`,g.args={...g.args,name:`bike-manufacturer`,onChange:p(`value changed`),onBlur:p(`blur event triggered`)},_=[`RadioGroup`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`args => <Component {...args}>
    <Legend>Bicycle brand</Legend>
    <Field>
      <Radio value="trek" />
      <Label>Trek</Label>
    </Field>
    <Field>
      <Radio value="specialized" />
      <Label>Specialized</Label>
    </Field>
    <Field>
      <Radio value="cannondale" />
      <Label>Cannondale</Label>
    </Field>
    <Field>
      <Radio value="canyon" />
      <Label>Canyon</Label>
    </Field>
  </Component>`,...g.parameters?.docs?.source}}}})))()}v();export{g as RadioGroup,_ as __namedExportsOrder,m as default};