import { test, expect } from '@playwright/test';

test.describe('My Journey page - stage card selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/journey');
  });

  test('clicking Getting Started card shows Getting Started content', async ({ page }) => {
    // Click the Getting Started card - use the full accessible name
    await page.getByRole('button', { name: /🌱 Age 11–13 Getting Started/i }).click();

    // Verify Getting Started content is shown - check for unique text in the content panel
    await expect(page.getByRole('heading', { name: 'Getting Started', level: 2 })).toBeVisible();
    await expect(page.getByText('Learn about your condition')).toBeVisible();
    await expect(page.getByText('Get to know your team')).toBeVisible();
  });

  test('clicking Building Skills card shows Building Skills content', async ({ page }) => {
    // Click the Building Skills card
    await page.getByRole('button', { name: /💪 Age 14–15 Building Skills/i }).click();

    // Verify Building Skills content is shown - check for unique text
    await expect(page.getByRole('heading', { name: 'Building Skills', level: 2 })).toBeVisible();
    await expect(page.getByText('Speak up at appointments')).toBeVisible();
    await expect(page.getByText('Know your medicines')).toBeVisible();
  });

  test('clicking Almost There card shows Almost There content', async ({ page }) => {
    // Click the Almost There card
    await page.getByRole('button', { name: /🚀 Age 16–17 Almost There/i }).click();

    // Verify Almost There content is shown - check for unique text
    await expect(page.getByRole('heading', { name: 'Almost There', level: 2 })).toBeVisible();
    await expect(page.getByText('Check out the consent guide')).toBeVisible();
    await expect(page.getByText('Build your health summary')).toBeVisible();
  });

  test('clicking Flying Solo card shows adult content', async ({ page }) => {
    // Click the Flying Solo card
    await page.getByRole('button', { name: /🎉 Age 18\+ Flying Solo/i }).click();

    // Verify adult content is shown - check for unique text
    await expect(page.getByRole('heading', { name: 'Flying Solo', level: 2 })).toBeVisible();
    await expect(page.getByText('Meet your new team')).toBeVisible();
    await expect(page.getByText('Check your support')).toBeVisible();
  });

  test('selected card has visual highlight', async ({ page }) => {
    // Click Getting Started card and verify it has selected styling
    const startedCard = page.getByRole('button', { name: /🌱 Age 11–13 Getting Started/i });
    await startedCard.click();

    // The selected card should have the primary border color
    await expect(startedCard).toHaveClass(/border-primary-300/);

    // Other cards should not have the selected styling
    const skillsCard = page.getByRole('button', { name: /💪 Age 14–15 Building Skills/i });
    await expect(skillsCard).not.toHaveClass(/border-primary-300/);
  });

  test('switching between cards updates content panel', async ({ page }) => {
    // Start with Getting Started
    await page.getByRole('button', { name: /🌱 Age 11–13 Getting Started/i }).click();
    await expect(page.getByText('Learn about your condition')).toBeVisible();

    // Switch to Building Skills
    await page.getByRole('button', { name: /💪 Age 14–15 Building Skills/i }).click();
    await expect(page.getByText('Speak up at appointments')).toBeVisible();
    // Getting Started content should no longer be visible
    await expect(page.getByText('Learn about your condition')).not.toBeVisible();

    // Switch to Almost There
    await page.getByRole('button', { name: /🚀 Age 16–17 Almost There/i }).click();
    await expect(page.getByText('Check out the consent guide')).toBeVisible();

    // Switch to Adult
    await page.getByRole('button', { name: /🎉 Age 18\+ Flying Solo/i }).click();
    await expect(page.getByText('Meet your new team')).toBeVisible();
  });
});
