import { test, expect, type Page } from '@playwright/test';

const KEY = 'transition-age-band';

// Skip the welcome overlay and treat the visitor as a returning one
async function returning(page: Page, extra: Record<string, string> = {}) {
  await page.addInitScript((items) => {
    // Only seed once, so a reload keeps whatever the app has stored since
    if (sessionStorage.getItem('seeded')) return;
    sessionStorage.setItem('seeded', '1');
    localStorage.setItem('transition-intro-shown', 'true');
    localStorage.setItem('transition-has-visited', 'true');
    for (const [k, v] of Object.entries(items)) localStorage.setItem(k, v);
  }, extra);
}

const stored = (page: Page) => page.evaluate((k) => localStorage.getItem(k), KEY);

test.describe('Age-based stage default', () => {
  test('asks a returning user for their age group, and storing it hides the prompt', async ({ page }) => {
    await returning(page);
    await page.goto('/');
    const prompt = page.getByRole('region', { name: /how old are you/i });
    await expect(prompt).toBeVisible();
    await prompt.getByRole('button', { name: /14-15/ }).click();
    await expect(prompt).toBeHidden();
    expect(await stored(page)).toBe('14-15');
  });

  test('maps each age group to its stage on the checklist', async ({ page }) => {
    const cases: [string, string][] = [
      ['under-11', 'Getting Started'],
      ['11-13', 'Getting Started'],
      ['14-15', 'Building Skills'],
      ['16-17', 'Almost There'],
      ['18+', 'Flying Solo'],
    ];
    for (const [band, stage] of cases) {
      await page.addInitScript(([k, v]) => {
        localStorage.setItem('transition-intro-shown', 'true');
        localStorage.setItem('transition-has-visited', 'true');
        localStorage.setItem(k, v);
      }, [KEY, band]);
      await page.goto('/checklist');
      await expect(page.getByText(`${stage} Stage Progress`)).toBeVisible();
    }
  });

  test('the journey page opens on the stage for the stored age', async ({ page }) => {
    await returning(page, { [KEY]: '14-15' });
    await page.goto('/journey');
    await expect(page.getByRole('heading', { name: 'Building Skills', level: 2 })).toBeVisible();
    await expect(page.getByText('Speak up at appointments')).toBeVisible();
  });

  test('skipping keeps Almost There as the fallback', async ({ page }) => {
    await returning(page);
    await page.goto('/');
    await page.getByRole('button', { name: /skip for now/i }).click();
    expect(await stored(page)).toBe('skipped');
    await expect(page.getByRole('button', { name: /skip for now/i })).toBeHidden();
    await page.goto('/checklist');
    await expect(page.getByText('Almost There Stage Progress')).toBeVisible();
  });

  test('the user can still tap another stage, and it is kept', async ({ page }) => {
    await returning(page, { [KEY]: '14-15' });
    await page.goto('/journey');
    await page.getByRole('button', { name: /Age 18\+ Flying Solo/i }).click();
    await expect(page.getByRole('heading', { name: 'Flying Solo', level: 2 })).toBeVisible();

    await page.goto('/checklist');
    await expect(page.getByText('Building Skills Stage Progress')).toBeVisible();
    await page.getByRole('button', { name: /Getting Started Age 11-13/i }).first().click();
    await expect(page.getByText('Getting Started Stage Progress')).toBeVisible();
    await page.reload();
    await expect(page.getByText('Getting Started Stage Progress')).toBeVisible();
  });

  test('marks the stage that matches the age', async ({ page }) => {
    await returning(page, { [KEY]: '16-17' });
    await page.goto('/journey');
    await expect(page.getByText('Your stage', { exact: true })).toBeVisible();
  });

  test('changing the age group from the menu changes the default stage', async ({ page }) => {
    await returning(page, { [KEY]: '14-15' });
    await page.goto('/checklist');
    await expect(page.getByText('Building Skills Stage Progress')).toBeVisible();
    // Tap a different stage first; changing age should then take over
    await page.getByRole('button', { name: /Getting Started Age 11-13/i }).first().click();

    await page.getByRole('button', { name: /my age group/i }).first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: /18\+/ }).click();
    expect(await stored(page)).toBe('18+');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(page.getByText('Flying Solo Stage Progress')).toBeVisible();
  });

  test('the age can be cleared from the menu', async ({ page }) => {
    await returning(page, { [KEY]: '18+' });
    await page.goto('/checklist');
    await page.getByRole('button', { name: /my age group/i }).first().click();
    await page.getByRole('button', { name: /don't use my age/i }).click();
    expect(await stored(page)).toBe('skipped');
    await expect(page.getByText('Almost There Stage Progress')).toBeVisible();
  });

  test('the first-visit welcome question stores the age', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('transition-intro-shown', 'true'));
    await page.goto('/');
    await page.getByRole('button', { name: /I'm a young person Moving/ }).click();
    await page.getByRole('button', { name: /14-15/ }).first().click();
    expect(await stored(page)).toBe('14-15');
  });

  test('an old saved stage still works when there is no age', async ({ page }) => {
    await returning(page, { 'transition-care-checklist': JSON.stringify({ completedItems: [], currentStage: 'steady' }) });
    await page.goto('/checklist');
    await expect(page.getByText('Building Skills Stage Progress')).toBeVisible();
  });

  test('uses the simple wording in Simple language mode', async ({ page }) => {
    await returning(page, { 'transition-easy-read': 'true' });
    await page.goto('/');
    await expect(page.getByText('Pick an age group. It stays on this device only.')).toBeVisible();
  });

  test('works on a phone: age group is in the More menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await returning(page, { [KEY]: '14-15' });
    await page.goto('/checklist');
    await page.getByRole('button', { name: /more/i }).last().click();
    await page.getByRole('button', { name: /my age group/i }).last().click();
    await page.getByRole('dialog').getByRole('button', { name: /16-17/ }).click();
    expect(await stored(page)).toBe('16-17');
  });
});
