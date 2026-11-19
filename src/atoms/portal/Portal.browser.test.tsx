import { createContext, use, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Portal } from '.';

/** Portals into a section, which it keeps in state once it has mounted. */
function IntoSection() {
  const [section, setSection] = useState<HTMLElement | null>(null);

  return (
    <>
      <Portal container={section}>
        <p>Portaled</p>
      </Portal>
      <section ref={setSection} aria-label="Container" />
    </>
  );
}

describe('Portal general behavior', () => {
  test('renders its children at the end of the page, and nothing in its own place', async () => {
    await render(
      <div data-testid="place">
        <Portal>
          <p>Portaled</p>
        </Portal>
      </div>
    );
    const portaled = page.getByText('Portaled');

    await expect.element(portaled).toBeVisible();
    expect(portaled.element().parentElement).toBe(document.body);
    await expect.element(page.getByTestId('place')).toBeEmptyDOMElement();
  });

  test('renders its children into the given container once it has mounted', async () => {
    await render(<IntoSection />);

    await expect.element(page.getByText('Portaled')).toBeVisible();
    await expect
      .element(page.getByRole('region', { name: 'Container' }))
      .toHaveTextContent('Portaled');
  });

  test('renders nothing while its container is null', async () => {
    await render(
      <Portal container={null}>
        <p>Portaled</p>
      </Portal>
    );

    await expect.element(page.getByText('Portaled')).not.toBeInTheDocument();
  });

  // a component which forwards its props passes them on as undefined
  test('renders at the end of the page when its container is undefined', async () => {
    await render(
      <Portal container={undefined}>
        <p>Portaled</p>
      </Portal>
    );
    const portaled = page.getByText('Portaled');

    await expect.element(portaled).toBeVisible();
    expect(portaled.element().parentElement).toBe(document.body);
  });

  test('removes its children when it unmounts', async () => {
    const { rerender } = await render(
      <Portal>
        <p>Portaled</p>
      </Portal>
    );
    await expect.element(page.getByText('Portaled')).toBeVisible();

    await rerender(<></>);

    await expect.element(page.getByText('Portaled')).not.toBeInTheDocument();
  });

  test('keeps the context of the component which renders it', async () => {
    const Theme = createContext('light');
    function ShowTheme() {
      return <p>{`${use(Theme)} theme`}</p>;
    }

    await render(
      <Theme value="dark">
        <Portal>
          <ShowTheme />
        </Portal>
      </Theme>
    );

    await expect.element(page.getByText('dark theme')).toBeVisible();
  });

  // React events follow the components, while the elements sit elsewhere
  test('passes React events on to the components around it', async () => {
    const onClick = vi.fn();
    await render(
      <div onClick={onClick}>
        <Portal>
          <button>Inside the portal</button>
        </Portal>
      </div>
    );

    await userEvent.click(
      page.getByRole('button', { name: 'Inside the portal' })
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Portal on the server', () => {
  // portals can't be rendered on the server
  test('renders nothing on the server', () => {
    const html = renderToString(
      <main>
        <Portal>
          <p>Portaled</p>
        </Portal>
      </main>
    );

    expect(html).toBe('<main></main>');
  });

  test('renders its children once the page has hydrated, matching the server while hydrating', async () => {
    const app = (
      <main>
        <Portal>
          <p>Portaled</p>
        </Portal>
      </main>
    );
    const container = document.createElement('div');
    container.innerHTML = renderToString(app);
    document.body.append(container);
    const errors: unknown[] = [];

    const root = hydrateRoot(container, app, {
      onRecoverableError: (error) => errors.push(error),
    });
    onTestFinished(() => {
      root.unmount();
      container.remove();
    });

    await expect.element(page.getByText('Portaled')).toBeVisible();
    expect(errors).toEqual([]);
  });
});
