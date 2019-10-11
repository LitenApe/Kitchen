import React, { ReactElement, } from "react";

import { storiesOf, } from "@storybook/react";
import { action, } from "@storybook/addon-actions";
import { text, boolean, } from "@storybook/addon-knobs";

import { Checkbox, } from "../../../src";

const stories = storiesOf("Atoms/Checkbox", module);

stories.add(
  "Default",
  (): ReactElement => (
    <Checkbox
      label={text("Label", "label")}
      checked={boolean("Checked", false)}
      value={text("Value", "component value")}
      disabled={boolean("Disabled", false)}
      reversed={boolean("Reverse order", false)}
      onChange={action("State changed attempt")}
    />
  )
);