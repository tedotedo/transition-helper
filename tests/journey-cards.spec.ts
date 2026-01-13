import { test, expect } from '@playwright/test';

test.describe('My Journey page - stage card selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/journey');
  });

  test('clicking Ready card shows Ready content', async ({ page }) => {
    // Click the Ready card - use the full accessible name
    await page.getByRole('button', { name: /🌱 Age 11–13 Ready/i }).click();

    // Verify Ready content is shown - check for unique text in the content panel
    await expect(page.getByRole('heading', { name: 'Ready', level: 2 })).toBeVisible();
    await expect(page.getByText('Learn about your condition')).toBeVisible();
    await expect(page.getByText('Get to know your team')).toBeVisible();
  });

  test('clicking Steady card shows Steady content', async ({ page }) => {
    // Click the Steady card
    await page.getByRole('button', { name: /💪 Age 14–15 Steady/i }).click();

    // Verify Steady content is shown - check for unique text
    await expect(page.getByRole('heading', { name: 'Steady', level: 2 })).toBeVisible();
    await expect(page.getByText('Speak up at appointments')).toBeVisible();
    await expect(page.getByText('Know your medicines')).toBeVisible();
  });

  test('clicking Go card shows Go content', async ({ page }) => {
    // Click the Go card
    await page.getByRole('button', { name: /🚀 Age 16–17 Go/i }).click();

    // Verify Go content is shown - check for unique text
    await expect(page.getByRole('heading', { name: 'Go', level: 2 })).toBeVisible();
    await expect(page.getByText('Check out the consent guide')).toBeVisible();
    await expect(page.getByText('Fill in the Go questionnaire')).toBeVisible();
  });

  test('clicking Hello adult services card shows adult content', async ({ page }) => {
    // Click the Hello adult services card
    await page.getByRole('button', { name: /🎉 Age 18\+ Hello adult services!/i }).click();

    // Verify adult content is shown - check for unique text
    await expect(page.getByRole('heading', { name: 'Hello adult services!', level: 2 })).toBeVisible();
    await expect(page.getByText('Say hello to your new team')).toBeVisible();
    await expect(page.getByText('Check your support')).toBeVisible();
  });

  test('selected card has visual highlight', async ({ page }) => {
    // Click Ready card and verify it has selected styling
    const readyCard = page.getByRole('button', { name: /🌱 Age 11–13 Ready/i });
    await readyCard.click();

    // The selected card should have the primary border color
    await expect(readyCard).toHaveClass(/border-primary-300/);

    // Other cards should not have the selected styling
    const steadyCard = page.getByRole('button', { name: /💪 Age 14–15 Steady/i });
    await expect(steadyCard).not.toHaveClass(/border-primary-300/);
  });

  test('switching between cards updates content panel', async ({ page }) => {
    // Start with Ready
    await page.getByRole('button', { name: /🌱 Age 11–13 Ready/i }).click();
    await expect(page.getByText('Learn about your condition')).toBeVisible();

    // Switch to Steady
    await page.getByRole('button', { name: /💪 Age 14–15 Steady/i }).click();
    await expect(page.getByText('Speak up at appointments')).toBeVisible();
    // Ready content should no longer be visible
    await expect(page.getByText('Learn about your condition')).not.toBeVisible();

    // Switch to Go
    await page.getByRole('button', { name: /🚀 Age 16–17 Go/i }).click();
    await expect(page.getByText('Check out the consent guide')).toBeVisible();

    // Switch to Adult
    await page.getByRole('button', { name: /🎉 Age 18\+ Hello adult services!/i }).click();
    await expect(page.getByText('Say hello to your new team')).toBeVisible();
  });
});
