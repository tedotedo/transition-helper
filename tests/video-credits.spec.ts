import { test, expect } from '@playwright/test';
import { successStories } from '../src/data/success-stories';

test.describe('Videos & Stories - credits', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('transition-intro-shown', 'true');
      localStorage.setItem('transition-has-visited', 'true');
    });
    await page.goto('/videos');
  });

  test('says videos are by their creators and shown via YouTube', async ({ page }) => {
    await expect(page.getByTestId('video-credit-note')).toContainText('Videos are by their creators and shown via YouTube');
    await expect(page.getByTestId('video-credit-note').getByRole('link', { name: /privacy page/i })).toHaveAttribute('href', '/privacy');
  });

  test('every video has a credit with channel, title and link to the original', async ({ page }) => {
    const credits = page.getByTestId('video-credit');
    await expect(credits).toHaveCount(successStories.length);
    for (const [i, story] of successStories.entries()) {
      const credit = credits.nth(i);
      await expect(credit).toContainText(story.creator);
      await expect(credit).toContainText(story.title.replace(/\s+/g, ' '));
      await expect(credit.getByRole('link', { name: story.creator })).toHaveAttribute('href', story.creatorUrl);
      const watch = credit.getByRole('link', { name: /Watch on YouTube/ });
      await expect(watch).toHaveAttribute('href', `https://www.youtube.com/watch?v=${story.youtubeId}`);
      await expect(watch).toHaveAttribute('rel', /noopener/);
    }
  });

  test('embeds use the privacy-enhanced youtube-nocookie domain', async ({ page }) => {
    await page.getByRole('button', { name: /^Play video:/ }).first().click();
    const src = await page.locator('iframe').first().getAttribute('src');
    expect(src).toContain('https://www.youtube-nocookie.com/embed/');
    expect(src).not.toContain('www.youtube.com/embed');
  });
});

test('privacy page mentions YouTube', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('transition-intro-shown', 'true');
    localStorage.setItem('transition-has-visited', 'true');
  });
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { name: /YouTube videos/ })).toBeVisible();
  await expect(page.getByText('youtube-nocookie.com').first()).toBeVisible();
});

test('videos page makes no consent or safeguarding claim', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('transition-intro-shown', 'true');
    localStorage.setItem('transition-has-visited', 'true');
  });
  await page.goto('/videos');
  await expect(page.getByTestId('video-credit-note')).toBeVisible();
  await expect(page.getByText(/safeguarding/i)).toHaveCount(0);
  await expect(page.getByText(/created with consent/i)).toHaveCount(0);
  await expect(page.getByText(/names may have been changed/i)).toHaveCount(0);
});

test('videos page, search and notification use neutral wording', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('transition-intro-shown', 'true');
    localStorage.setItem('transition-has-visited', 'true');
  });
  await page.goto('/videos');
  await expect(page.getByRole('heading', { name: /Videos about moving to adult health care/, level: 1 })).toBeVisible();
  await expect(page.getByText(/real stories|real young people/i)).toHaveCount(0);
  const { searchIndex } = await import('../src/data/search-index');
  const entry = searchIndex.find((e) => e.id === 'videos');
  expect(entry?.description).toBe('Videos about moving to adult health care, shown via YouTube');
});
