import {
  composeStories,
  composeStory,
  setProjectAnnotations,
} from '@storybook/react-vite';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import preview from '../.storybook/preview';

/**
 * Visual regression tests. Every story is rendered and compared against a
 * reference screenshot stored in `__screenshots__`. New stories are picked up
 * automatically; review new or changed references before committing them.
 */

type StoriesModule = Parameters<typeof composeStories>[0];
type ComposedStory = ReturnType<typeof composeStory>;

// the glob can't infer each module's stories, so they are checked at runtime
function isComposedStory(
  entry: [string, unknown]
): entry is [string, ComposedStory] {
  const story = entry[1];
  return typeof story === 'function' && 'id' in story;
}

setProjectAnnotations(preview);

// gives deferred content, such as the Alert's delayed message, time to settle
const SETTLE_DELAY_MS = 200;

const modules = import.meta.glob<StoriesModule>('./**/*.stories.tsx', {
  eager: true,
});

describe.each(
  Object.values(modules).map((module) => [module.default.title, module])
)('%s', (_, module) => {
  const stories = Object.entries(composeStories(module)).filter(
    isComposedStory
  );

  test.each(stories)('%s', async (_, Story) => {
    const screen = await render(<Story />);
    await new Promise((resolve) => setTimeout(resolve, SETTLE_DELAY_MS));

    // stories without in-flow content (e.g. a fixed overlay) have no size,
    // so fall back to a screenshot of the whole page
    const hasSize = screen.container.getBoundingClientRect().height > 0;
    if (hasSize) {
      await expect.element(screen.locator).toMatchScreenshot(Story.id);
    } else {
      await expect(page).toMatchScreenshot(Story.id);
    }
  });
});
