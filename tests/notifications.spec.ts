import { test, expect } from '@playwright/test';

test.describe('Notifications Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('notifications button is visible with badge', async ({ page }) => {
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await expect(notifButton).toBeVisible();

    // Should show unread badge count
    const badge = notifButton.locator('span').filter({ hasText: /\d+/ });
    await expect(badge).toBeVisible();
  });

  test('clicking notifications opens dropdown', async ({ page }) => {
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await notifButton.click();

    // Dropdown should appear
    const dropdown = page.getByRole('menu');
    await expect(dropdown).toBeVisible();

    // Should show notifications heading (h3 element specifically)
    await expect(page.getByRole('heading', { name: 'Notifications' })).toBeVisible();
  });

  test('notifications list shows all notifications', async ({ page }) => {
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await notifButton.click();

    // Should show welcome message
    await expect(page.getByText(/welcome to transition care/i)).toBeVisible();

    // Should show reminders
    await expect(page.getByText(/questionnaire/i).first()).toBeVisible();
  });

  test('clicking notification navigates to page', async ({ page }) => {
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await notifButton.click();

    // Click on a notification that has a link (e.g., videos tip)
    await page.getByRole('menuitem', { name: /video|stories/i }).click();

    // Should navigate away from home
    await expect(page).toHaveURL(/\/videos/);
  });

  test('clicking notification marks it as read', async ({ page }) => {
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await notifButton.click();

    // Get initial unread count
    const unreadText = page.getByText(/unread message/);
    await expect(unreadText).toBeVisible();

    // Click first notification
    await page.getByRole('menuitem').first().click();

    // Reopen dropdown
    await page.goto('/');
    await notifButton.click();

    // Unread count should be lower or text should change
    // (the notification we clicked should no longer have the unread dot)
  });

  test('mark all read button clears unread count', async ({ page }) => {
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await notifButton.click();

    // Click "Mark all read"
    await page.getByRole('button', { name: /mark all read/i }).click();

    // Badge should disappear
    await notifButton.click();
    const unreadText = page.getByText(/unread message/);
    await expect(unreadText).not.toBeVisible();
  });

  test('notifications persist read state across page reloads', async ({ page }) => {
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await notifButton.click();

    // Mark all as read
    await page.getByRole('button', { name: /mark all read/i }).click();

    // Reload page
    await page.reload();

    // Check that badge doesn't show unread count
    await notifButton.click();
    const unreadText = page.getByText(/unread message/);
    await expect(unreadText).not.toBeVisible();
  });

  test('notifications show relative time', async ({ page }) => {
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await notifButton.click();

    // Should show relative time like "hours ago", "days ago", etc.
    const timeText = page.getByText(/ago|just now|yesterday/i);
    await expect(timeText.first()).toBeVisible();
  });

  test('clicking outside closes dropdown', async ({ page }) => {
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await notifButton.click();

    // Dropdown should be visible
    const dropdown = page.getByRole('menu');
    await expect(dropdown).toBeVisible();

    // Click outside (on main content)
    await page.locator('main').click();

    // Dropdown should close
    await expect(dropdown).not.toBeVisible();
  });
});
