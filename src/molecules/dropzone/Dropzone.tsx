import type {
  ChangeEvent,
  ComponentPropsWithRef,
  DragEvent,
  JSX,
  ReactNode,
} from 'react';

import { Button } from '../../atoms/button';
import { formatFileSize } from './bones/formatFileSize';

/**
 * Every other prop is set on the zone, which is a `label` around the file
 * input, so `htmlFor` and `form`, which would point it at another control,
 * are left out. So are `onDrop` and `onDragOver`, which the zone needs for
 * itself, as the files arrive through `onFilesChange` instead.
 */
export type DropzoneProps = {
  /** The files in the list, in the order they were added. */
  files: readonly File[];
  /**
   * Called with the new list when files are dropped or chosen, which adds
   * them to the end, and when a file is removed. The list only changes once
   * `files` does.
   */
  onFilesChange: (files: File[]) => void;
  /**
   * What the zone shows, which also names its file input, such as "Drop
   * files here, or click to choose them". As the zone is a `label`, it should
   * be text, rather than elements such as paragraphs.
   */
  children: ReactNode;
  /**
   * The content of the button which removes a file from the list, which is
   * also the button's name. Give each button a name of its own, such as
   * `Remove ${file.name}`, so that they can be told apart.
   */
  removeLabel: (file: File) => ReactNode;
} & Omit<
  ComponentPropsWithRef<'label'>,
  'children' | 'htmlFor' | 'form' | 'onDrop' | 'onDragOver'
>;

/**
 * A zone which files can be dropped onto, or clicked to choose files, followed
 * by a list of the files, each with its size and a button which removes it.
 * Every drop or choice adds its files to the list, rather than replacing it.
 */
function Dropzone({
  files,
  onFilesChange,
  children,
  removeLabel,
  ...props
}: DropzoneProps): JSX.Element {
  function add(added: FileList | null) {
    // a drag can hold no files, such as an attachment dragged out of some
    // mail apps, which leaves nothing to add
    if (added !== null && added.length > 0) {
      onFilesChange([...files, ...added]);
    }
  }

  function remove(index: number) {
    onFilesChange(files.filter((_, listed) => listed !== index));
  }

  // the browser only lets something be dropped onto an element which cancels
  // the drag over it, which is done for files alone, so other drags, such as
  // of text, are left alone
  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    if (event.dataTransfer.types.includes('Files')) {
      event.preventDefault();
    }
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    // keeps the browser from opening the files in place of the page, and the
    // file input from taking the files when they are dropped onto it
    event.preventDefault();
    add(event.dataTransfer.files);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    add(input.files);
    // choosing the same files as before is no change, so the input is
    // emptied, so that a file which was removed from the list can be chosen
    // again
    input.value = '';
  }

  // The same file can be listed more than once, so the files are told apart
  // by their place in the list. The items keep no state, so an item which
  // takes the place of a removed one only needs its content to change.
  return (
    <>
      <label {...props} onDragOver={handleDragOver} onDrop={handleDrop}>
        {children}
        <input type="file" multiple onChange={handleChange} />
      </label>
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <span>{file.name}</span>
              <span>{formatFileSize(file.size)}</span>
              <Button onClick={() => remove(index)}>{removeLabel(file)}</Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Dropzone;
