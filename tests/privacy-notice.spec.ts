import { test, expect } from '@playwright/test';

test.describe('Privacy notice accuracy', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('transition-intro-shown', 'true');
      localStorage.setItem('transition-has-visited', 'true');
    });
    await page.goto('/privacy');
  });

  test('says nothing you enter is sent to a server automatically', async ({ page }) => {
    await expect(page.getByText('The app does not send anything you enter to us, or to any server, automatically.')).toBeVisible();
    await expect(page.getByText(/We do not have any servers/i)).toHaveCount(0);
    await expect(page.getByText(/never sent to any server/i)).toHaveCount(0);
  });

  test('describes the feedback route and warns against patient-identifiable details', async ({ page }) => {
    await expect(page.getByText(/Netlify, to Resend/)).toBeVisible();
    await expect(page.getByText(/do not put patient-identifiable information in feedback/i)).toBeVisible();
  });

  test('names the services that see ordinary visitor information', async ({ page }) => {
    const box = page.locator('div', { has: page.getByRole('heading', { name: /Other companies that see ordinary visitor information/ }) }).last();
    for (const name of ['Netlify', 'Google Fonts', 'YouTube (Google)', 'Resend']) {
      await expect(box.getByText(name, { exact: true }).first()).toBeVisible();
    }
    await expect(box.getByText(/IP address/)).toBeVisible();
  });

  test('has no leftover "No third-party cookies" or "no cookie banners" claims', async ({ page }) => {
    await expect(page.getByText(/No third-party cookies/)).toHaveCount(0);
    await expect(page.getByText(/cookie banners/)).toHaveCount(0);
  });
});

test('the app really does load Google Fonts, so the notice must keep naming them', async ({ page }) => {
  const hosts = new Set<string>();
  page.on('request', (r) => hosts.add(new URL(r.url()).host));
  await page.addInitScript(() => {
    localStorage.setItem('transition-intro-shown', 'true');
    localStorage.setItem('transition-has-visited', 'true');
  });
  await page.goto('/privacy');
  await page.waitForTimeout(500);
  expect([...hosts].some((h) => h.includes('fonts.googleapis.com') || h.includes('fonts.gstatic.com'))).toBe(true);
});
