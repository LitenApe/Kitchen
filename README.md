# Kitchen

Kitchen is a "one-stop shop" for _cooking_ utensils used to create delicious web applications. Additionally, we provide you with all the spices and condiments needed to flavour your food, bringing it up to Michelin-star levels of deliciousness. All jokes aside, though, Kitchen is a styleless component library which can be forked and expanded to speed up the development of a component library. Component libraries are slowly becoming a necessity for professional work. They speed up development, reduce the overall number of bugs and provide consistency between applications. Additionally, they help developers create good markup and, in our case, also help provide accessible elements for most users out there.

The project is still in alpha and currently serves as a playground where I try to optimize the code into what I believe to be a maintainable codebase, one which can be understood and worked on by people of all skill levels. All the components are written without JSX at the moment, which is intentional on my part. On the one hand, it was a way to test how much easier or harder it is to work with React without JSX. On the other hand, it made it easier to work with polymorphic components in the initial phase of the project.

Another important thing to note is that the project is yet to be configured for **production**. In its current state, the project only works as a development sandbox. This is because I am still unsure how I want the components to be used. Should they all be individual packages? Should it be one large library which is added and upgraded as a whole? As with all things, how the library is bundled and distributed will affect how easy it is to put to use within professional codebases.

## Project Status

The project is abandoned, as I regret creating dependencies on third-party libraries such as framer-motion. Additionally, I consumed my contexts thoughtlessly, which resulted in a few problems where props get duplicated or lost when attempting to combine them from various sources.

Components such as `Field` and `RadioGroup` share their props with the components inside them through React context, and each component merges the shared props with its own. A component can only read from the closest provider of a context, so when two providers of the same context are nested, the outer one is hidden from everything inside the inner one.

`RadioField` shows the problem clearly. Its props are passed to a `BaseField`, which shares them through a `Field`. Every radio is also wrapped in a `Field` of its own, so that it can be linked to its label, which means the radios only see those inner fields. As a result, props such as `onChange` and `disabled` never reach the radios, and an `error` is displayed without the radios being marked as invalid or described by the message. `InputField`, which has no inner field, passes the same props on as expected.

Fixing this properly means rethinking how props flow between the components rather than patching them one by one. I might restart the project after I figure out what my end goal is with a personal styleless component library.

## Project Structure

The project is structured following the **atomic design system** to slowly build up fully functional and usable components. While it does not follow the mindset of atomic design systems completely, it makes use of its principles to slowly build up the components' complexity, effectively reducing the amount of logic needed in any single component. The components are supported by **utils**, which live outside of them and attempt to make the code more readable whenever applicable. They also help reduce **id** and **key** collisions through **hooks** such as **useId**.

Each component directory consists of at least three files: the component itself, a story for documenting and developing said component, and tests for the component. All complementary components and logic which the **main** component needs to function are separated into a directory named **bones** to keep the root tidy. Bones are component-specific functionality tailored to one particular use case. They make no attempt at generalising their problem, which means that other components with a similar, but not identical, use case will have their own version tailored to their own use case.

Below you will find an illustration of how the project will be structured as it grows.

Kitchen/  
├─ atoms/  
│ ├─ component/  
│ │ ├─ bones  
│ │ ├─ Component  
│ │ ├─ Component Story  
│ │ ├─ Component Test  
│ │ ├─ index  
├─ molecules/  
├─ organisms/  
├─ utils/  
│ ├─ hooks/  
│ ├─ functions/  
│ ├─ types/

## Roadmap

As mentioned in the introduction, the project is still in alpha, which means that there are still a few things that need to be done before the project can be distributed and used. Below you will find, in no particular order, the tasks which need to be finished before the components are usable.

### Early alpha

- [x] Individual form components
  - [x] Input
  - [x] Checkbox
  - [x] Radio
  - [x] Radio Group
  - [x] Select
  - [x] Label
  - [x] Fieldset
  - [x] Legend
  - [x] Field
  - [x] Button
- [x] Layout components
  - [x] Accordion
  - [x] Backdrop
  - [x] Alert
- [x] Utility components
  - [x] DangerousHTML
  - [x] Descendants
  - [x] ErrorBoundary
  - [x] BaseInput

### Alpha

- [x] FormFields
  - [x] InputField
  - [x] CheckboxField
  - [x] RadioField
  - [x] SelectField
- [x] Layout components
  - [x] AccordionGroup
- [x] Utility components
  - [x] BaseField
- [ ] Other tasks
  - [ ] Add tests for InputField
  - [ ] Add tests for RadioField
  - [ ] Add tests for SelectField

### Beta

- [ ] Individual form components
  - [ ] Combobox
- [ ] FormFields
  - [ ] ComboboxField
- [ ] Layout components
  - [ ] Dialog
  - [ ] VisuallyHidden
- [ ] Utility components
  - [ ] Dropzone
- [ ] Other tasks
  - [ ] Rewrite the codebase to use JSX
  - [ ] Add documentation to components
  - [ ] Mono or _monolith_ code distribution
  - [ ] GitHub Actions for tagging
  - [ ] GitHub Actions for releases
  - [ ] GitHub Actions for publishing

## Questions

Create an issue with your questions and I'll try to answer them to the best of my ability. I don't take requests for missing components, as the project is still in its infancy and the essentials still need to be developed.

## Available Scripts

**Storybook** is built with **Vite**, and tests run with **Vitest**. Node.js 22.12 or newer is required (24 recommended).

### start

`start` starts **Storybook**, which serves as a place for documentation and component development.

```bash
npm run start
```

### test

`test` executes all tests and enters watch mode. Please read the **Vitest** documentation for more information about running tests and their options. Tests run in watch mode by default, so a flag is required to disable watch mode if it is undesirable.

The tests are split into two **Vitest** projects to keep overhead to a minimum:

- **node** runs every test by default and is meant for logic which does not need a DOM.
- **browser** runs tests named `*.browser.test.tsx` or `*.browser.spec.ts` in a real Chromium browser through **Playwright**. Components are rendered with `vitest-browser-react`, and are queried and interacted with through `page` and `userEvent` from `vitest/browser`.

Chromium has to be installed once before the browser tests can run.

```bash
npx playwright install chromium
```

```bash
npm run test

# without watch mode
npm run test -- --run

# only one of the projects
npm run test -- --project node
npm run test -- --project browser

# watch the browser tests run in a visible browser window
npm run test -- --project browser --browser.headless=false
```

#### Visual regression tests

`src/visual.browser.test.tsx` renders every story and compares it against a reference screenshot in `src/__screenshots__`, so new stories are covered automatically. A missing reference is created on the first run, and the test fails until it has been reviewed. When a visual change is intended, update the references and review them before committing.

```bash
npm run test -- --run src/visual.browser.test.tsx --update
```

Screenshots differ between operating systems, so references are stored per platform. References currently only exist for Windows, which is why the CI skips these tests.

### typecheck

`typecheck` runs the TypeScript compiler without emitting any files. Vite and Vitest strip types without checking them, so this is the only place where type errors are reported.

```bash
npm run typecheck
```

### build-storybook

`build-storybook` builds **Storybook**, as the name implies, producing distribution files you can use if you want to host the documentation somewhere.

```bash
npm run build-storybook
```

### lint

```bash
npm run lint
```

### format

```bash
npm run format
```
