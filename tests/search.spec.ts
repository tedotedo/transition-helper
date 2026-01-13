import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search input is visible and focusable', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
    await searchInput.focus();
    await expect(searchInput).toBeFocused();
  });

  test('typing shows search results dropdown', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('consent');

    // Should show dropdown with results
    const dropdown = page.locator('#search-results');
    await expect(dropdown).toBeVisible();

    // Should show "Consent" related results
    await expect(page.getByText(/consent/i).first()).toBeVisible();
  });

  test('search works with fuzzy matching', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);

    // Test typo tolerance - searching for "pip"
    await searchInput.fill('pip');

    // Should find PIP results (either Money & PIP page or Look into PIP)
    const dropdown = page.locator('#search-results');
    await expect(dropdown).toBeVisible();
    await expect(page.getByText(/pip/i).first()).toBeVisible();
  });

  test('clicking search result navigates to page', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('journey');

    // Click on "My Journey" result
    await page.getByRole('option', { name: /my journey/i }).click();

    // Should navigate to journey page
    await expect(page).toHaveURL('/journey');
  });

  test('keyboard navigation works in search results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('ready');

    // Press arrow down to select first result
    await page.keyboard.press('ArrowDown');

    // First option should be selected
    const firstOption = page.getByRole('option').first();
    await expect(firstOption).toHaveAttribute('aria-selected', 'true');

    // Press Enter to navigate
    await page.keyboard.press('Enter');

    // Should navigate to the result page
    await expect(page).not.toHaveURL('/');
  });

  test('escape closes search dropdown', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('consent');

    // Dropdown should be visible
    const dropdown = page.locator('#search-results');
    await expect(dropdown).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Dropdown should be hidden
    await expect(dropdown).not.toBeVisible();
  });

  test('no results message shows for unknown queries', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('xyznonexistent');

    // Should show no results message - text includes the query
    await expect(page.getByText('No results found for "xyznonexistent"')).toBeVisible();
  });

  test('search finds resources by keywords', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('questionnaire');

    // Should find Ready, Steady, Go questionnaires
    await expect(page.getByText(/ready questionnaire/i)).toBeVisible();
  });
});
