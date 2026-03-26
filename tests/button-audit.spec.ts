import { test, expect } from '@playwright/test';

test.describe('Button Audit - Navigation Links', () => {
  test('sidebar navigation links work', async ({ page }) => {
    await page.goto('/');

    // Test Home link
    await page.getByRole('link', { name: /Home/i }).click();
    await expect(page).toHaveURL('/');

    // Test My journey link
    await page.getByRole('link', { name: /My journey/i }).click();
    await expect(page).toHaveURL('/journey');

    // Test Know your rights link
    await page.getByRole('link', { name: /Know your rights/i }).click();
    await expect(page).toHaveURL('/rights');

    // Test Money & PIP link
    await page.getByRole('link', { name: /Money & PIP/i }).click();
    await expect(page).toHaveURL('/money');

    // Test Planning tools link
    await page.getByRole('link', { name: /Planning tools/i }).click();
    await expect(page).toHaveURL('/planning');

    // Test Videos & stories link
    await page.getByRole('link', { name: /Videos & stories/i }).click();
    await expect(page).toHaveURL('/videos');

    // Test Resources link
    await page.getByRole('link', { name: /Resources/i }).click();
    await expect(page).toHaveURL('/resources');
  });
});

test.describe('Button Audit - Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('role toggle buttons work', async ({ page }) => {
    // Find and click Young person button
    const youngPersonBtn = page.getByRole('button', { name: /young person/i });
    await youngPersonBtn.click();
    // Check for gradient class that indicates active state
    await expect(youngPersonBtn).toHaveClass(/from-primary-500/);

    // Find and click Parent/Carer button
    const parentBtn = page.getByRole('button', { name: /parent/i });
    await parentBtn.click();
    await expect(parentBtn).toHaveClass(/from-primary-500/);
  });

  test('checklist quick action tile navigates to checklist', async ({ page }) => {
    await page.getByRole('link', { name: /checklist/i }).click();
    await expect(page).toHaveURL('/checklist');
  });

  test('all quick action tiles are functional links', async ({ page }) => {
    // Verify all tiles are visible and are links
    await expect(page.locator('a[href="/checklist"]').filter({ hasText: 'Checklist' })).toBeVisible();
    await expect(page.locator('a[href="/appointments"]').filter({ hasText: 'Appointments' })).toBeVisible();
    await expect(page.locator('a[href="/care-plan"]').filter({ hasText: 'Care Plan' })).toBeVisible();
    await expect(page.locator('a[href="/care-team"]').filter({ hasText: 'Care Team' })).toBeVisible();
  });

  test('named worker card shows empty state and can add contact', async ({ page }) => {
    // Should show empty state initially
    await expect(page.getByText('Add your named worker')).toBeVisible();

    // Click add contact
    await page.getByRole('button', { name: /add contact/i }).click();

    // Fill in the form
    await page.getByLabel(/^name/i).fill('Sarah Johnson');
    await page.getByLabel(/phone/i).fill('0123456789');
    await page.getByLabel(/email/i).fill('sarah@nhs.uk');
    await page.getByRole('button', { name: /save/i }).click();

    // Should now show the contact with call/email links
    await expect(page.getByText('Sarah Johnson')).toBeVisible();
    const phoneLink = page.getByRole('link', { name: /call/i });
    await expect(phoneLink).toHaveAttribute('href', /^tel:/);
    const emailLink = page.getByRole('link', { name: /email/i });
    await expect(emailLink).toHaveAttribute('href', /^mailto:/);
  });

  test('next step links are present', async ({ page }) => {
    // First next step - Go questionnaire (now external link to RSG website)
    const goQuestLink = page.getByRole('link', { name: /open/i }).first();
    await expect(goQuestLink).toHaveAttribute('href', /readysteadygo\.net/);
    await expect(goQuestLink).toHaveAttribute('target', '_blank');

    // Consent guide link
    const consentLink = page.getByRole('link', { name: /open/i }).nth(1);
    await consentLink.click();
    await expect(page).toHaveURL('/rights/consent-16-17');
  });

  test('resource card "Learn about adult services" navigates to rights', async ({ page }) => {
    await page.getByRole('link', { name: /learn about adult services/i }).click();
    await expect(page).toHaveURL('/rights');
  });
});

test.describe('Button Audit - My Journey Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/journey');
  });

  test('all stage buttons change content', async ({ page }) => {
    // Click Getting Started
    await page.getByRole('button', { name: /Getting Started/i }).first().click();
    await expect(page.getByRole('heading', { name: 'Getting Started', level: 2 })).toBeVisible();

    // Click Building Skills
    await page.getByRole('button', { name: /Building Skills/i }).first().click();
    await expect(page.getByRole('heading', { name: 'Building Skills', level: 2 })).toBeVisible();

    // Click Almost There
    await page.getByRole('button', { name: /Almost There/i }).first().click();
    await expect(page.getByRole('heading', { name: 'Almost There', level: 2 })).toBeVisible();

    // Click Flying Solo
    await page.getByRole('button', { name: /Flying Solo/i }).click();
    await expect(page.getByRole('heading', { name: 'Flying Solo', level: 2 })).toBeVisible();
  });

  test('task links in Go stage navigate correctly', async ({ page }) => {
    // Ensure Almost There stage is active
    await page.getByRole('button', { name: /🚀 Age 16–17 Almost There/i }).click();

    // Test consent guide link
    await page.getByRole('link', { name: /open consent guide/i }).click();
    await expect(page).toHaveURL('/rights/consent-16-17');

    // Go back and test questionnaire link (now external to RSG website)
    await page.goto('/journey');
    await page.getByRole('button', { name: /🚀 Age 16–17 Almost There/i }).click();
    const rsgLink = page.getByRole('link', { name: /open on rsg website/i });
    await expect(rsgLink).toHaveAttribute('href', /readysteadygo\.net/);
    await expect(rsgLink).toHaveAttribute('target', '_blank');
  });
});

test.describe('Button Audit - Rights Hub Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/rights');
  });

  test('Age 16-17 card navigates to consent guide', async ({ page }) => {
    // The card contains "Age 16–17" text (with en-dash) and links to consent guide
    await page.locator('a[href="/rights/consent-16-17"]').click();
    await expect(page).toHaveURL('/rights/consent-16-17');
  });

  test('disabled age cards show coming soon', async ({ page }) => {
    // Under 16 card should show coming soon - use exact text match
    await expect(page.getByText('Under 16', { exact: true })).toBeVisible();
    await expect(page.getByText('Age 18+', { exact: true })).toBeVisible();
    // Both disabled cards show "Coming soon"
    const comingSoonText = page.getByText('Coming soon');
    await expect(comingSoonText.first()).toBeVisible();
  });

  test('topic pills exist but have no handlers - NO_HANDLER elements', async ({ page }) => {
    // These buttons should exist but clicking them does nothing
    const consentPill = page.locator('button').filter({ hasText: 'Consent and capacity' });
    const privacyPill = page.locator('button').filter({ hasText: 'Privacy & sharing info' });
    const decisionPill = page.locator('button').filter({ hasText: 'Decision-making after 18' });

    // Verify they exist
    await expect(consentPill).toBeVisible();
    await expect(privacyPill).toBeVisible();
    await expect(decisionPill).toBeVisible();

    // Note: These have NO_HANDLER - clicking does nothing
    // This is documented in BUTTON_AUDIT.md
  });
});

test.describe('Button Audit - Resources Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resources');
  });

  test('all questionnaire links point to RSG website', async ({ page }) => {
    // All PDF links should be external to readysteadygo.net
    const pdfLinks = page.locator('a[href*="readysteadygo.net"][href$=".pdf"]');
    const count = await pdfLinks.count();
    expect(count).toBeGreaterThan(0);

    // Each link should open in a new tab
    for (let i = 0; i < count; i++) {
      await expect(pdfLinks.nth(i)).toHaveAttribute('target', '_blank');
    }
  });

  test('PDF links have correct href attributes', async ({ page }) => {
    const pdfLinks = page.locator('a[href$=".pdf"]');
    const count = await pdfLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await pdfLinks.nth(i).getAttribute('href');
      expect(href).toContain('.pdf');
      expect(href).toContain('readysteadygo.net');
    }
  });
});

test.describe('Button Audit - Money & PIP Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/money');
  });

  test('section toggles expand and collapse', async ({ page }) => {
    // Benefits section toggle - click on the button containing "Benefits"
    const benefitsToggle = page.locator('button').filter({ hasText: 'Benefits & Financial Support' });
    await benefitsToggle.click();
    await expect(page.getByText('What is Personal Independence Payment')).toBeVisible();

    // Click again to collapse
    await benefitsToggle.click();
    await expect(page.getByText('What is Personal Independence Payment')).not.toBeVisible();

    // Legal capacity section toggle
    const legalToggle = page.locator('button').filter({ hasText: 'Legal Capacity & Decision-Making' });
    await legalToggle.click();
    await expect(page.getByText('What Changes at Age 18?')).toBeVisible();

    // Education section toggle
    const educationToggle = page.locator('button').filter({ hasText: 'Education & Training Support' });
    await educationToggle.click();
    await expect(page.getByText('What is an Education, Health and Care Plan')).toBeVisible();
  });

  test('external links have correct href attributes', async ({ page }) => {
    // Expand benefits section to see links
    const benefitsToggle = page.locator('button').filter({ hasText: 'Benefits & Financial Support' });
    await benefitsToggle.click();

    // Check GOV.UK link
    const govLink = page.locator('a[href*="gov.uk/pip"]');
    await expect(govLink).toBeVisible();

    // Check Citizens Advice link
    const caLink = page.locator('a[href*="citizensadvice"]');
    await expect(caLink).toBeVisible();
  });
});

test.describe('Button Audit - Planning Tools Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/planning');
  });

  test('stage toggles expand and collapse', async ({ page }) => {
    // Ready stage is expanded by default, click to collapse and re-expand
    const readyToggle = page.locator('button').filter({ hasText: 'Stage 1: Getting Started' });
    // Ready is already expanded by default, so we should see content
    await expect(page.getByText('What happens in this stage?').first()).toBeVisible();

    // Click Steady toggle to expand it
    const steadyToggle = page.locator('button').filter({ hasText: 'Stage 2: Building Skills' });
    await steadyToggle.click();
    await expect(page.getByText('Skills you\'ll practice')).toBeVisible();

    // Click Go toggle to expand it
    const goToggle = page.locator('button').filter({ hasText: 'Stage 3: Almost There' });
    await goToggle.click();
    await expect(page.getByText('What you\'ll learn about')).toBeVisible();
  });

  test('questionnaire links point to RSG website', async ({ page }) => {
    // Ready section is expanded by default, check questionnaire link is external
    const rsgLink = page.locator('a').filter({ hasText: /Open Ready Questionnaire on RSG website/ });
    await expect(rsgLink).toHaveAttribute('href', /readysteadygo\.net/);
    await expect(rsgLink).toHaveAttribute('target', '_blank');
  });

  test('external PDF links have correct href', async ({ page }) => {
    // Ready stage is expanded by default, check for PDF links
    const pdfLinks = page.locator('a[href*="readysteadygo.net"][href$=".pdf"]');
    const count = await pdfLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('readysteadygo.net external link exists', async ({ page }) => {
    const externalLink = page.locator('a[href="https://www.readysteadygo.net"]');
    await expect(externalLink).toBeVisible();
  });
});

test.describe('Button Audit - Videos & Stories Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/videos');
  });

  test('video play buttons open video player', async ({ page }) => {
    // Video play buttons are icon-only buttons with SVG inside
    // Find a button within the video card area
    const playButton = page.locator('.aspect-video button').first();
    await playButton.click();

    // Should show YouTube iframe after clicking
    await expect(page.locator('iframe[src*="youtube"]')).toBeVisible();
  });

  test('View My Journey link navigates correctly', async ({ page }) => {
    // Find the specific "View My Journey" link in the call-to-action section
    await page.locator('a[href="/journey"]').filter({ hasText: 'View My Journey' }).click();
    await expect(page).toHaveURL('/journey');
  });

  test('Planning Tools link exists', async ({ page }) => {
    // Use exact match to find the specific Planning Tools button in the CTA section
    const planningLink = page.getByRole('link', { name: 'Planning Tools', exact: true });
    await expect(planningLink).toBeVisible();
  });
});

test.describe('Button Audit - Header Elements (NO_HANDLER)', () => {
  test('search input exists but has no functionality', async ({ page }) => {
    await page.goto('/');

    // Search input exists
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();

    // Type something - but it won't do anything (NO_HANDLER)
    await searchInput.fill('consent');
    // No search results or navigation occurs - this is a NO_HANDLER element
  });

  test('notifications button exists but has no handler', async ({ page }) => {
    await page.goto('/');

    // Notifications button exists
    const notifButton = page.getByRole('button', { name: /notifications/i });
    await expect(notifButton).toBeVisible();

    // Click it - nothing happens (NO_HANDLER)
    await notifButton.click();
    // No modal, dropdown, or navigation - this is a NO_HANDLER element
  });
});
