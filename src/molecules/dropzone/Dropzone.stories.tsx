import { type JSX, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Dropzone, type DropzoneProps } from '.';
import styles from './Dropzone.stories.module.css';

/** A dropzone which keeps its files in state, starting with the given ones. */
function WithState({
  files: initialFiles,
  onFilesChange,
  ...args
}: DropzoneProps): JSX.Element {
  const [files, setFiles] = useState(initialFiles);

  return (
    <div className={styles.example}>
      <Dropzone
        {...args}
        className={styles.zone}
        files={files}
        onFilesChange={(next) => {
          setFiles(next);
          onFilesChange(next);
        }}
      />
    </div>
  );
}

/**
 * A dropzone lets users add files by dragging them from their computer onto
 * it, or by clicking it to choose them, and lists the files which were added,
 * each with its size and a button which removes it from the list.
 *
 * `Dropzone` renders the zone as a `label` around an `input` of type `file`,
 * followed by the list. Its children are the content of the zone, which also
 * names the input, so they should be text, rather than elements such as
 * paragraphs. Clicking the zone opens the browser's file picker, which
 * keyboard users reach by tabbing to the input. Every other prop, such as
 * `className`, is set on the zone.
 *
 * Every drop or choice adds its files to the end of the list, rather than
 * replacing it. Only files can be dropped, so dragging something else over
 * the zone, such as text, does nothing.
 *
 * A file which is added twice is listed twice, as the dropzone does not check
 * for duplicates. The browser only tells a file's name, size, type and when
 * it was last modified, which two different files can have in common, so a
 * file can't be told apart from another one for certain.
 *
 * Each file's name is followed by its size, in the browser's language and in
 * the largest unit which keeps it at 1 or more, rounded to one decimal, such
 * as "1.5 MB". A kilobyte is 1000 bytes, which is what kB, MB and the other
 * units mean exactly. Some systems count 1024 instead, such as for a limit on
 * how large an upload may be, so check a file against a limit through its
 * `size` in bytes, rather than through the size which is shown.
 *
 * The dropzone is controlled, so it keeps no state of its own. It lists the
 * `files` it is given, and calls `onFilesChange` with the new list when files
 * are added or removed. Keep the files in state, and upload them from there,
 * such as with `fetch` and `FormData`. The input is only there to choose
 * files, and is emptied after each choice, so that a file which was removed
 * can be chosen again. It therefore never holds the listed files, and has no
 * `name` to submit them with a form.
 *
 * Each remove button shows what `removeLabel` returns for its file, which is
 * also the button's name. Give each button a name of its own, such as
 * `Remove ${file.name}`, so that screen reader users can tell them apart. The
 * buttons do not submit a surrounding form.
 *
 * The example below hides the input from sight, and shows its focus on the
 * zone instead. Drop files onto the zone, or click it, to see `onFilesChange`
 * in the **Actions** panel.
 */
const meta = {
  title: 'Molecule/Dropzone',
  component: Dropzone,
  parameters: {
    docs: {
      subtitle: 'Lets users drop files and lists them for upload',
    },
  },
  argTypes: {
    files: {
      description: 'The files in the list, in the order they were added.',
      control: false,
      table: { type: { summary: 'readonly File[]' } },
    },
    onFilesChange: {
      description:
        'Called with the new list when files are dropped or chosen, which adds them to the end, and when a file is removed. The list only changes once `files` does.',
      table: { type: { summary: '(files: File[]) => void' } },
    },
    children: {
      description:
        'What the zone shows, which also names its file input. As the zone is a `label`, it should be text.',
      type: 'string',
      table: { type: { summary: 'ReactNode' } },
    },
    removeLabel: {
      description:
        "The content of the button which removes a file, which is also the button's name, such as `Remove ${file.name}`.",
      control: false,
      table: { type: { summary: '(file: File) => ReactNode' } },
    },
  },
  args: {
    children: 'Drop files here, or click to choose them',
    files: [],
    onFilesChange: fn(),
    removeLabel: (file) => `Remove ${file.name}`,
  },
  render: (args) => <WithState {...args} />,
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFiles: Story = {
  args: {
    // empty files, sized like real ones
    files: [
      new File([new Uint8Array(1_523_456)], 'report.pdf', { lastModified: 1 }),
      new File([new Uint8Array(48_200)], 'invoice.pdf', { lastModified: 1 }),
      new File([new Uint8Array(820)], 'notes.txt', { lastModified: 1 }),
    ],
  },
};
