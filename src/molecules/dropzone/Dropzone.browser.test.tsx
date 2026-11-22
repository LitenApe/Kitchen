import { type SubmitEvent, createRef, useState } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Dropzone } from '.';
import { formatFileSize } from './bones/formatFileSize';

/** A new `File` each time, as every drop or choice gives the file anew. */
function report(): File {
  return new File(['report'], 'report.pdf', { lastModified: 1 });
}

function invoice(): File {
  return new File(['invoice'], 'invoice.pdf', { lastModified: 1 });
}

function removeLabel(file: File): string {
  return `Remove ${file.name}`;
}

/** Keeps the files in state, as the dropzone's user would. */
function WithState({
  onFilesChange,
}: {
  onFilesChange?: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Dropzone
      files={files}
      onFilesChange={(next) => {
        setFiles(next);
        onFilesChange?.(next);
      }}
      removeLabel={removeLabel}
    >
      Drop files here
    </Dropzone>
  );
}

/** Holds the files, as the browser does for a drag from the computer. */
function withFiles(files: File[]): DataTransfer {
  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file));
  return dataTransfer;
}

/** Fires a drag event at the zone, and returns it once it has been handled. */
function drag(type: 'dragover' | 'drop', dataTransfer: DataTransfer) {
  const event = new DragEvent(type, {
    bubbles: true,
    cancelable: true,
    dataTransfer,
  });
  page.getByText('Drop files here').element().dispatchEvent(event);
  return event;
}

function drop(files: File[]) {
  return drag('drop', withFiles(files));
}

/** Gives React the time to render what a native event changed. */
function nextTask() {
  return new Promise((resolve) => setTimeout(resolve));
}

/** Keeps a submit from navigating away from the test page. */
function preventSubmit(event: SubmitEvent) {
  event.preventDefault();
}

describe('Dropzone general behavior', () => {
  test('shows its content, which names its file input', async () => {
    await render(<WithState />);

    await expect.element(page.getByText('Drop files here')).toBeVisible();
    await expect
      .element(page.getByLabelText('Drop files here'))
      .toHaveAttribute('type', 'file');
  });

  test('lists no files at first', async () => {
    await render(<WithState />);

    await expect.element(page.getByRole('list')).not.toBeInTheDocument();
  });

  test('lists the files which are dropped onto it', async () => {
    await render(<WithState />);

    drop([report(), invoice()]);

    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByText('invoice.pdf', { exact: true }))
      .toBeVisible();
  });

  // the size is formatted in the browser's language, which the test leaves
  // to formatFileSize, rather than expecting one of its own
  test("shows each file's size right after its name", async () => {
    await render(<WithState />);

    drop([
      new File([new Uint8Array(1_523_456)], 'report.pdf'),
      new File([new Uint8Array(820)], 'notes.txt'),
    ]);

    const items = page.getByRole('listitem');
    const reportSize = items
      .nth(0)
      .getByText(formatFileSize(1_523_456), { exact: true });
    const notesSize = items
      .nth(1)
      .getByText(formatFileSize(820), { exact: true });
    await expect.element(reportSize).toBeVisible();
    await expect.element(notesSize).toBeVisible();
    expect(reportSize.element().previousElementSibling).toBe(
      page.getByText('report.pdf', { exact: true }).element()
    );
    expect(notesSize.element().previousElementSibling).toBe(
      page.getByText('notes.txt', { exact: true }).element()
    );
  });

  test('lists the files which are chosen through its file input', async () => {
    await render(<WithState />);

    await userEvent.upload(page.getByLabelText('Drop files here'), [
      report(),
      invoice(),
    ]);

    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByText('invoice.pdf', { exact: true }))
      .toBeVisible();
  });

  test('adds the files of every drop to the end of the list', async () => {
    await render(<WithState />);

    drop([report()]);
    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .toBeVisible();
    drop([invoice()]);
    await expect
      .element(page.getByText('invoice.pdf', { exact: true }))
      .toBeVisible();

    const items = page.getByRole('listitem');
    await expect
      .element(items.nth(0).getByText('report.pdf', { exact: true }))
      .toBeVisible();
    await expect
      .element(items.nth(1).getByText('invoice.pdf', { exact: true }))
      .toBeVisible();
  });

  test('adds the files of every choice to the list, rather than replacing it', async () => {
    await render(<WithState />);
    const input = page.getByLabelText('Drop files here');

    await userEvent.upload(input, [report()]);
    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .toBeVisible();
    await userEvent.upload(input, [invoice()]);

    await expect
      .element(page.getByText('invoice.pdf', { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .toBeVisible();
  });

  // a file can't be told apart from another one for certain, so there is no
  // check for duplicates
  test('lists a file as often as it is added', async () => {
    await render(<WithState />);

    drop([report()]);
    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .toBeVisible();
    drop([report()]);

    const listed = page.getByText('report.pdf', { exact: true });
    await expect.element(listed.nth(1)).toBeVisible();
    await expect.element(listed.nth(0)).toBeVisible();
  });

  test('does not call onFilesChange when a drop holds no files', async () => {
    const onFilesChange = vi.fn();
    await render(<WithState onFilesChange={onFilesChange} />);

    drop([]);
    await nextTask();

    expect(onFilesChange).not.toHaveBeenCalled();
  });

  test('removes a single file when its remove button is clicked', async () => {
    await render(<WithState />);
    drop([report(), invoice()]);

    await userEvent.click(
      page.getByRole('button', { name: 'Remove report.pdf' })
    );

    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .not.toBeInTheDocument();
    await expect
      .element(page.getByText('invoice.pdf', { exact: true }))
      .toBeVisible();
  });

  // choosing the same file as before is no change to an input which still
  // holds it, so a removed file could not be chosen again
  test('empties its file input once files are chosen', async () => {
    await render(<WithState />);
    const input = page.getByLabelText('Drop files here');

    await userEvent.upload(input, [report()]);

    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .toBeVisible();
    await expect.element(input).toHaveValue('');
  });

  test('its remove buttons do not submit a surrounding form', async () => {
    const onSubmit = vi.fn(preventSubmit);
    await render(
      <form onSubmit={onSubmit}>
        <WithState />
      </form>
    );
    drop([report()]);

    await userEvent.click(
      page.getByRole('button', { name: 'Remove report.pdf' })
    );

    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .not.toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('Dropzone as a controlled component', () => {
  test('lists the files it is given', async () => {
    const { rerender } = await render(
      <Dropzone
        files={[report()]}
        onFilesChange={vi.fn()}
        removeLabel={removeLabel}
      >
        Drop files here
      </Dropzone>
    );
    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .toBeVisible();

    await rerender(
      <Dropzone
        files={[invoice()]}
        onFilesChange={vi.fn()}
        removeLabel={removeLabel}
      >
        Drop files here
      </Dropzone>
    );

    await expect
      .element(page.getByText('report.pdf', { exact: true }))
      .not.toBeInTheDocument();
    await expect
      .element(page.getByText('invoice.pdf', { exact: true }))
      .toBeVisible();
  });

  test('calls onFilesChange with the new list, which is only shown once files changes', async () => {
    const onFilesChange = vi.fn<(files: File[]) => void>();
    const listed = report();
    await render(
      <Dropzone
        files={[listed]}
        onFilesChange={onFilesChange}
        removeLabel={removeLabel}
      >
        Drop files here
      </Dropzone>
    );
    const dropped = invoice();

    drop([dropped]);
    await nextTask();

    expect(onFilesChange).toHaveBeenCalledTimes(1);
    const [next] = onFilesChange.mock.calls[0];
    expect(next).toHaveLength(2);
    expect(next[0]).toBe(listed);
    expect(next[1]).toBe(dropped);
    await expect
      .element(page.getByText('invoice.pdf', { exact: true }))
      .not.toBeInTheDocument();
  });

  test('calls onFilesChange without the file which is removed', async () => {
    const onFilesChange = vi.fn<(files: File[]) => void>();
    const kept = invoice();
    await render(
      <Dropzone
        files={[report(), kept]}
        onFilesChange={onFilesChange}
        removeLabel={removeLabel}
      >
        Drop files here
      </Dropzone>
    );

    await userEvent.click(
      page.getByRole('button', { name: 'Remove report.pdf' })
    );

    expect(onFilesChange).toHaveBeenCalledTimes(1);
    const [next] = onFilesChange.mock.calls[0];
    expect(next).toHaveLength(1);
    expect(next[0]).toBe(kept);
  });

  test('removes only the entry whose button is clicked, when the same file is listed twice', async () => {
    const onFilesChange = vi.fn<(files: File[]) => void>();
    const listedTwice = report();
    await render(
      <Dropzone
        files={[listedTwice, listedTwice]}
        onFilesChange={onFilesChange}
        removeLabel={removeLabel}
      >
        Drop files here
      </Dropzone>
    );

    await userEvent.click(
      page.getByRole('button', { name: 'Remove report.pdf' }).nth(0)
    );

    expect(onFilesChange).toHaveBeenCalledTimes(1);
    const [next] = onFilesChange.mock.calls[0];
    expect(next).toHaveLength(1);
    expect(next[0]).toBe(listedTwice);
  });
});

describe('Dropzone dragging', () => {
  test('lets files be dropped onto it', async () => {
    await render(<WithState />);

    const event = drag('dragover', withFiles([report()]));

    expect(event.defaultPrevented).toBe(true);
  });

  test('leaves other drags, such as of text, alone', async () => {
    await render(<WithState />);
    const text = new DataTransfer();
    text.setData('text/plain', 'Hello');

    const event = drag('dragover', text);

    expect(event.defaultPrevented).toBe(false);
  });

  test('keeps the browser from opening the files which are dropped', async () => {
    await render(<WithState />);

    const event = drop([report()]);

    expect(event.defaultPrevented).toBe(true);
  });
});

describe('Dropzone props', () => {
  test('passes its other props on to the zone', async () => {
    await render(
      <Dropzone
        files={[]}
        onFilesChange={vi.fn()}
        removeLabel={removeLabel}
        className="zone"
        data-testid="zone"
      >
        Drop files here
      </Dropzone>
    );
    const zone = page.getByTestId('zone');

    await expect.element(zone).toHaveClass('zone');
    await expect.element(zone).toHaveTextContent('Drop files here');
  });

  test('refs are attached to the zone', async () => {
    const ref = createRef<HTMLLabelElement>();
    await render(
      <Dropzone
        files={[]}
        onFilesChange={vi.fn()}
        removeLabel={removeLabel}
        ref={ref}
      >
        Drop files here
      </Dropzone>
    );

    expect(ref.current).toBe(page.getByText('Drop files here').element());
  });

  test('names each remove button with what removeLabel returns for its file', async () => {
    await render(
      <Dropzone
        files={[report(), invoice()]}
        onFilesChange={vi.fn()}
        removeLabel={(file) => `${file.name} entfernen`}
      >
        Drop files here
      </Dropzone>
    );

    await expect
      .element(page.getByRole('button', { name: 'report.pdf entfernen' }))
      .toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'invoice.pdf entfernen' }))
      .toBeVisible();
  });
});
