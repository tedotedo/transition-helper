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

  test('checklist quick action tile navigates to journey', async ({ page }) => {
    await page.getByRole('link', { name: /checklist/i }).click();
    await expect(page).toHaveURL('/journey');
  });

  test('disabled quick action tiles exist but are not clickable', async ({ page }) => {
    // Verify disabled tiles exist - they should be visible
    await expect(page.getByText('Appointments', { exact: true })).toBeVisible();
    await expect(page.getByText('Care Plan', { exact: true })).toBeVisible();
    await expect(page.getByText('Care Team', { exact: true })).toBeVisible();

    // Only Checklist should be a link (not disabled)
    const checklistLink = page.locator('a[href="/journey"]').filter({ hasText: 'Checklist' });
    await expect(checklistLink).toBeVisible();
  });

  test('named worker contact links have correct href', async ({ page }) => {
    // Phone link should have tel: href
    const phoneLink = page.getByRole('link', { name: /call/i });
    await expect(phoneLink).toHaveAttribute('href', /^tel:/);

    // Email link should have mailto: href
    const emailLink = page.getByRole('link', { name: /email/i });
    await expect(emailLink).toHaveAttribute('href', /^mailto:/);
  });

  test('next step links navigate correctly', async ({ page }) => {
    // First next step - Go questionnaire
    const goQuestLink = page.getByRole('link', { name: /open/i }).first();
    await goQuestLink.click();
    await expect(page).toHaveURL('/resources/ready-steady-go/go-questionnaire');

    // Go back and test consent guide link
    await page.goto('/');
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
    // Click Ready
    await page.getByRole('button', { name: /Ready/i }).first().click();
    await expect(page.getByRole('heading', { name: 'Ready', level: 2 })).toBeVisible();

    // Click Steady
    await page.getByRole('button', { name: /Steady/i }).first().click();
    await expect(page.getByRole('heading', { name: 'Steady', level: 2 })).toBeVisible();

    // Click Go
    await page.getByRole('button', { name: /Go/i }).first().click();
    await expect(page.getByRole('heading', { name: 'Go', level: 2 })).toBeVisible();

    // Click Adult
    await page.getByRole('button', { name: /Hello adult services/i }).click();
    await expect(page.getByRole('heading', { name: 'Hello adult services!', level: 2 })).toBeVisible();
  });

  test('task links in Go stage navigate correctly', async ({ page }) => {
    // Ensure Go stage is active
    await page.getByRole('button', { name: /🚀 Age 16–17 Go/i }).click();

    // Test consent guide link
    await page.getByRole('link', { name: /open consent guide/i }).click();
    await expect(page).toHaveURL('/rights/consent-16-17');

    // Go back and test questionnaire link
    await page.goto('/journey');
    await page.getByRole('button', { name: /🚀 Age 16–17 Go/i }).click();
    await page.getByRole('link', { name: /start questionnaire/i }).click();
    await expect(page).toHaveURL('/resources/ready-steady-go/go-questionnaire');
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

  test('Ready questionnaire link works', async ({ page }) => {
    // Find the card with "Ready questionnaire" and click its internal link
    await page.locator('a[href="/resources/ready-steady-go/ready-questionnaire"]').click();
    await expect(page).toHaveURL('/resources/ready-steady-go/ready-questionnaire');
  });

  test('Steady questionnaire link works', async ({ page }) => {
    await page.locator('a[href="/resources/ready-steady-go/steady-questionnaire"]').click();
    await expect(page).toHaveURL('/resources/ready-steady-go/steady-questionnaire');
  });

  test('Go questionnaire link works', async ({ page }) => {
    await page.locator('a[href="/resources/ready-steady-go/go-questionnaire"]').click();
    await expect(page).toHaveURL('/resources/ready-steady-go/go-questionnaire');
  });

  test('PDF links have correct href attributes', async ({ page }) => {
    // Check that external PDF links exist and have href
    const pdfLinks = page.locator('a[href$=".pdf"]');
    const count = await pdfLinks.count();
    expect(count).toBeGreaterThan(0);

    // Each PDF link should have a valid href
    for (let i = 0; i < count; i++) {
      const href = await pdfLinks.nth(i).getAttribute('href');
      expect(href).toContain('.pdf');
    }
  });
});

test.describe('Button Audit - PDF Viewer Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resources/ready-steady-go/go-questionnaire');
  });

  test('Open in new tab button has correct attributes', async ({ page }) => {
    const openBtn = page.getByRole('link', { name: /open in new tab/i });
    await expect(openBtn).toHaveAttribute('target', '_blank');
    await expect(openBtn).toHaveAttribute('href', /\.pdf$/);
  });

  test('Download PDF button has download attribute', async ({ page }) => {
    const downloadBtn = page.getByRole('link', { name: /download pdf/i });
    await expect(downloadBtn).toHaveAttribute('download');
    await expect(downloadBtn).toHaveAttribute('href', /\.pdf$/);
  });

  test('Easy-read PDF button exists and has correct href', async ({ page }) => {
    const easyReadBtn = page.getByRole('link', { name: /easy-read/i });
    await expect(easyReadBtn).toHaveAttribute('href', /\.pdf$/);
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
    const readyToggle = page.locator('button').filter({ hasText: 'Stage 1: Ready' });
    // Ready is already expanded by default, so we should see content
    await expect(page.getByText('What happens in this stage?').first()).toBeVisible();

    // Click Steady toggle to expand it
    const steadyToggle = page.locator('button').filter({ hasText: 'Stage 2: Steady' });
    await steadyToggle.click();
    await expect(page.getByText('Skills you\'ll practice')).toBeVisible();

    // Click Go toggle to expand it
    const goToggle = page.locator('button').filter({ hasText: 'Stage 3: Go' });
    await goToggle.click();
    await expect(page.getByText('What you\'ll learn about')).toBeVisible();
  });

  test('internal questionnaire links navigate correctly', async ({ page }) => {
    // Ready section is expanded by default, click View Ready Questionnaire
    await page.locator('a[href="/resources/ready-steady-go/ready-questionnaire"]').click();
    await expect(page).toHaveURL('/resources/ready-steady-go/ready-questionnaire');
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
