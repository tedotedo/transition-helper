import { test, expect } from '@playwright/test';

test.describe('Rights Hub Topic Pills', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/rights');
  });

  test('topic pills are visible and clickable', async ({ page }) => {
    await expect(page.getByRole('button', { name: /consent and capacity/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /privacy.*sharing/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /decision.*after 18/i })).toBeVisible();
  });

  test('clicking Consent and capacity shows content', async ({ page }) => {
    await page.getByRole('button', { name: /consent and capacity/i }).click();

    // Should show consent content - use headings/specific text
    await expect(page.getByText('What is consent?')).toBeVisible();
    await expect(page.getByRole('heading', { name: /gillick competence/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /fraser guidelines/i })).toBeVisible();
    await expect(page.getByText(/how is capacity assessed/i)).toBeVisible();
  });

  test('clicking Privacy shows content', async ({ page }) => {
    await page.getByRole('button', { name: /privacy.*sharing/i }).click();

    // Should show privacy content
    await expect(page.getByText(/your right to confidentiality/i)).toBeVisible();
    await expect(page.getByText(/when information might be shared/i)).toBeVisible();
    await expect(page.getByText(/accessing your medical records/i)).toBeVisible();
    await expect(page.getByText(/controlling who sees your information/i)).toBeVisible();
  });

  test('clicking Decision-making after 18 shows content', async ({ page }) => {
    await page.getByRole('button', { name: /decision.*after 18/i }).click();

    // Should show decision-making content - use headings
    await expect(page.getByText(/what changes at 18/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /mental capacity act/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /lasting power of attorney/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /supported decision-making/i })).toBeVisible();
  });

  test('clicking same topic pill toggles content off', async ({ page }) => {
    const consentPill = page.getByRole('button', { name: /consent and capacity/i });

    // Click to show
    await consentPill.click();
    await expect(page.getByText('What is consent?')).toBeVisible();

    // Click again to hide
    await consentPill.click();
    await expect(page.getByText('What is consent?')).not.toBeVisible();
  });

  test('clicking different topic pill switches content', async ({ page }) => {
    // Click consent
    await page.getByRole('button', { name: /consent and capacity/i }).click();
    await expect(page.getByText('What is consent?')).toBeVisible();

    // Click privacy - should hide consent and show privacy
    await page.getByRole('button', { name: /privacy.*sharing/i }).click();
    await expect(page.getByText('What is consent?')).not.toBeVisible();
    await expect(page.getByText(/your right to confidentiality/i)).toBeVisible();
  });

  test('active topic pill has highlighted styling', async ({ page }) => {
    const consentPill = page.getByRole('button', { name: /consent and capacity/i });

    // Before clicking - should not have active ring
    await expect(consentPill).not.toHaveClass(/ring-2/);

    // After clicking - should have active styling
    await consentPill.click();
    await expect(consentPill).toHaveClass(/ring-2/);
  });

  test('consent content explains Gillick competence', async ({ page }) => {
    await page.getByRole('button', { name: /consent and capacity/i }).click();

    // Check for key educational content - use heading
    await expect(page.getByRole('heading', { name: /gillick competence/i })).toBeVisible();
    await expect(page.getByText('someone under 16')).toBeVisible();
    await expect(page.getByText(/court case/i)).toBeVisible();
  });

  test('privacy content explains safeguarding', async ({ page }) => {
    await page.getByRole('button', { name: /privacy.*sharing/i }).click();

    // Check for safeguarding content
    await expect(page.getByText(/safeguarding/i)).toBeVisible();
    await expect(page.getByText('You\'re at risk of serious harm')).toBeVisible();
  });

  test('decision-making content links to Money & PIP page', async ({ page }) => {
    await page.getByRole('button', { name: /decision.*after 18/i }).click();

    // Should have link to Money & PIP page - use exact name
    const moneyLink = page.getByRole('link', { name: 'Money & PIP page' });
    await expect(moneyLink).toBeVisible();
    await expect(moneyLink).toHaveAttribute('href', '/money');
  });
});
