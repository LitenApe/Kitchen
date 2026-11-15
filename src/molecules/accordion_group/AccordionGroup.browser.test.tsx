import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import {
  Accordion,
  AccordionHeader,
  AccordionPanel,
} from '../../atoms/accordion';
import AccordionGroup from './AccordionGroup';

describe('AccordionGroup general behavior', () => {
  test('renders without crashing', async () => {
    await render(<AccordionGroup>{[]}</AccordionGroup>);
  });

  test('all accordions are closed by default', async () => {
    await render(
      <AccordionGroup>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Third</AccordionHeader>
          <AccordionPanel>Third content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );
    const firstContent = page.getByText('First content');
    const secondContent = page.getByText('Second content');
    const thirdContent = page.getByText('Third content');

    expect(page.getByRole('button').all()).toHaveLength(3);
    await expect.element(firstContent).not.toBeVisible();
    await expect.element(secondContent).not.toBeVisible();
    await expect.element(thirdContent).not.toBeVisible();
  });

  test('initial open accordion is open when specified', async () => {
    await render(
      <AccordionGroup initial={1}>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Third</AccordionHeader>
          <AccordionPanel>Third content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );
    const firstContent = page.getByText('First content');
    const secondContent = page.getByText('Second content');
    const thirdContent = page.getByText('Third content');

    await expect.element(secondContent).toBeVisible();
    await expect.element(firstContent).not.toBeVisible();
    await expect.element(thirdContent).not.toBeVisible();
  });

  test('only one accordion is open at the time', async () => {
    await render(
      <AccordionGroup>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Third</AccordionHeader>
          <AccordionPanel>Third content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );
    const firstContent = page.getByText('First content');
    const secondContent = page.getByText('Second content');
    const thirdContent = page.getByText('Third content');

    await expect.element(firstContent).not.toBeVisible();
    await expect.element(secondContent).not.toBeVisible();
    await expect.element(thirdContent).not.toBeVisible();

    // the content which changes is checked first, so the checks after it
    // run once the group has updated
    await userEvent.click(page.getByRole('button', { name: 'Third' }));
    await expect.element(thirdContent).toBeVisible();
    await expect.element(firstContent).not.toBeVisible();
    await expect.element(secondContent).not.toBeVisible();

    await userEvent.click(page.getByRole('button', { name: 'First' }));
    await expect.element(firstContent).toBeVisible();
    await expect.element(secondContent).not.toBeVisible();
    await expect.element(thirdContent).not.toBeVisible();

    await userEvent.click(page.getByRole('button', { name: 'Second' }));
    await expect.element(secondContent).toBeVisible();
    await expect.element(firstContent).not.toBeVisible();
    await expect.element(thirdContent).not.toBeVisible();

    await userEvent.click(page.getByRole('button', { name: 'Second' }));
    await expect.element(secondContent).not.toBeVisible();
    await expect.element(firstContent).not.toBeVisible();
    await expect.element(thirdContent).not.toBeVisible();
  });

  test('onClick is called with index of clicked button and requested new state', async () => {
    const mock = vi.fn();
    const { rerender } = await render(
      <AccordionGroup onClick={mock} open={-1}>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Third</AccordionHeader>
          <AccordionPanel>Third content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );
    const secondHeader = page.getByRole('button', { name: 'Second' });
    const secondContent = page.getByText('Second content');

    expect(mock).not.toHaveBeenCalled();

    await userEvent.click(secondHeader);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'click' }),
      1,
      true
    );
    // the accordion only opens once "open" changes
    await expect.element(secondContent).not.toBeVisible();

    await rerender(
      <AccordionGroup onClick={mock} open={1}>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Third</AccordionHeader>
          <AccordionPanel>Third content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );
    await expect.element(secondContent).toBeVisible();

    await userEvent.click(secondHeader);
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'click' }),
      1,
      false
    );
  });

  test('onClick is suppressed when onClick handler is supplied but open is not', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const mock = vi.fn();
    await render(
      <AccordionGroup onClick={mock}>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Third</AccordionHeader>
          <AccordionPanel>Third content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );

    expect(mock).not.toHaveBeenCalled();
    await userEvent.click(page.getByRole('button', { name: 'Second' }));
    expect(mock).not.toHaveBeenCalled();
    await expect.element(page.getByText('Second content')).not.toBeVisible();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('AccordionGroup received a change handler')
    );

    warn.mockRestore();
  });

  test('invalid childrens are ignored', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await render(
      <AccordionGroup>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <p>Not an accordion</p>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Third</AccordionHeader>
          <AccordionPanel>Third content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );

    await expect
      .element(page.getByText('Not an accordion'))
      .not.toBeInTheDocument();
    expect(page.getByRole('button').all()).toHaveLength(3);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('only accepts Accordion elements')
    );

    warn.mockRestore();
  });

  test('children which render nothing are skipped without a warning', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await render(
      <AccordionGroup>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        {false}
        {true}
        {null}
        {undefined}
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );

    expect(page.getByRole('button').all()).toHaveLength(2);
    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });

  test('accordions keep their index when one before them is not rendered', async () => {
    const { rerender } = await render(
      <AccordionGroup initial={2}>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        {false}
        <Accordion>
          <AccordionHeader>Third</AccordionHeader>
          <AccordionPanel>Third content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );
    const thirdContent = page.getByText('Third content');
    await expect.element(thirdContent).toBeVisible();

    await rerender(
      <AccordionGroup initial={2}>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Third</AccordionHeader>
          <AccordionPanel>Third content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );

    await expect.element(thirdContent).toBeVisible();
    await expect.element(page.getByText('Second content')).not.toBeVisible();
  });

  test('follows "open" when controlled', async () => {
    const { rerender } = await render(
      <AccordionGroup open={0} onClick={vi.fn()}>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );
    const firstContent = page.getByText('First content');
    const secondContent = page.getByText('Second content');
    await expect.element(firstContent).toBeVisible();
    await expect.element(secondContent).not.toBeVisible();

    await rerender(
      <AccordionGroup open={1} onClick={vi.fn()}>
        <Accordion>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );

    await expect.element(secondContent).toBeVisible();
    await expect.element(firstContent).not.toBeVisible();
  });

  test("an accordion's own onClick is invoked as well", async () => {
    const mock = vi.fn();
    await render(
      <AccordionGroup>
        <Accordion onClick={mock}>
          <AccordionHeader>First</AccordionHeader>
          <AccordionPanel>First content</AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionHeader>Second</AccordionHeader>
          <AccordionPanel>Second content</AccordionPanel>
        </Accordion>
      </AccordionGroup>
    );

    await userEvent.click(page.getByRole('button', { name: 'First' }));

    expect(mock).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ type: 'click' }),
      true
    );
    await expect.element(page.getByText('First content')).toBeVisible();
  });
});
