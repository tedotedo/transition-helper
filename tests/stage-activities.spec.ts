import { test, expect } from '@playwright/test'

// Steady Stage Tests
test.describe('Steady Stage - Speak Up at Appointments', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await page.goto('/journey/speak-up')
    await expect(page.getByRole('heading', { name: /speak up at appointments/i })).toBeVisible()
    await expect(page.getByText(/steady stage activity/i)).toBeVisible()
  })

  test('displays helpful phrases', async ({ page }) => {
    await page.goto('/journey/speak-up')
    await expect(page.getByText(/I've noticed that.../i)).toBeVisible()
    await expect(page.getByText(/I wanted to ask about.../i)).toBeVisible()
  })

  test('can expand practice questions', async ({ page }) => {
    await page.goto('/journey/speak-up')
    await page.getByRole('button', { name: /how have you been feeling/i }).click()
    await expect(page.getByText(/think about your energy levels/i)).toBeVisible()
  })

  test('can write practice answer', async ({ page }) => {
    await page.goto('/journey/speak-up')
    await page.getByRole('button', { name: /how have you been feeling/i }).click()
    const textarea = page.getByLabel(/your practice answer/i)
    await textarea.fill('I have been feeling tired lately')
    await expect(textarea).toHaveValue('I have been feeling tired lately')
  })

  test('confidence slider works', async ({ page }) => {
    await page.goto('/journey/speak-up')
    await expect(page.getByText(/okay/i).last()).toBeVisible()
  })

  test('can save progress', async ({ page }) => {
    await page.goto('/journey/speak-up')
    await page.getByRole('button', { name: /save my progress/i }).click()
    await expect(page.getByText(/your progress has been saved/i)).toBeVisible()
  })

  test('back link works', async ({ page }) => {
    await page.goto('/journey/speak-up')
    await page.getByRole('link', { name: /back to my journey/i }).click()
    await expect(page).toHaveURL('/journey')
  })
})

test.describe('Steady Stage - Know Your Medicines', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await page.goto('/journey/my-medicines')
    await expect(page.getByRole('heading', { name: /know your medicines/i })).toBeVisible()
    await expect(page.getByText(/steady stage activity/i)).toBeVisible()
  })

  test('shows empty state initially', async ({ page }) => {
    await page.goto('/journey/my-medicines')
    await expect(page.getByText(/no medicines added yet/i)).toBeVisible()
  })

  test('can open add medicine form', async ({ page }) => {
    await page.goto('/journey/my-medicines')
    await page.getByRole('button', { name: /add medicine/i }).click()
    await expect(page.getByText(/add a medicine/i)).toBeVisible()
    await expect(page.getByLabel(/what's it called/i)).toBeVisible()
  })

  test('can add a medicine', async ({ page }) => {
    await page.goto('/journey/my-medicines')
    await page.getByRole('button', { name: /add medicine/i }).first().click()
    await page.getByLabel(/what's it called/i).fill('Paracetamol')
    await page.getByLabel(/what's it for/i).fill('Pain relief')
    await page.getByLabel(/how much do you take/i).fill('2 tablets')
    await page.getByRole('button', { name: /🌅.*morning/i }).click()
    await page.locator('button:has-text("Add Medicine")').filter({ hasText: /^.*add medicine$/i }).last().click()
    await expect(page.getByText('Paracetamol')).toBeVisible()
    await expect(page.getByText('2 tablets')).toBeVisible()
  })

  test('pharmacy section is visible', async ({ page }) => {
    await page.goto('/journey/my-medicines')
    await expect(page.getByText(/my pharmacy/i)).toBeVisible()
    await expect(page.getByLabel(/pharmacy name/i)).toBeVisible()
  })
})

// Go Stage Tests
test.describe('Go Stage - Ask About Move Date', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await page.goto('/journey/move-date')
    await expect(page.getByRole('heading', { name: /ask about your move date/i })).toBeVisible()
    await expect(page.getByText(/go stage activity/i)).toBeVisible()
  })

  test('explains what transition is', async ({ page }) => {
    await page.goto('/journey/move-date')
    await expect(page.getByText(/what is transition/i)).toBeVisible()
    await expect(page.getByText(/moving from children's healthcare/i)).toBeVisible()
  })

  test('can select expected move age', async ({ page }) => {
    await page.goto('/journey/move-date')
    await page.getByLabel(/expected move age/i).selectOption('17')
    await expect(page.getByLabel(/expected move age/i)).toHaveValue('17')
  })

  test('can fill in adult service name', async ({ page }) => {
    await page.goto('/journey/move-date')
    const input = page.getByLabel(/name of adult service/i)
    await input.fill('Adult Diabetes Service')
    await expect(input).toHaveValue('Adult Diabetes Service')
  })

  test('shows suggested questions', async ({ page }) => {
    await page.goto('/journey/move-date')
    await expect(page.getByText(/when am i likely to move/i)).toBeVisible()
    await expect(page.getByText(/will i meet my new team/i)).toBeVisible()
  })

  test('can save plan', async ({ page }) => {
    await page.goto('/journey/move-date')
    await page.getByRole('button', { name: /save my plan/i }).click()
    await expect(page.getByText(/your transition plan has been saved/i)).toBeVisible()
  })
})

test.describe('Go Stage - Look into PIP', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await page.goto('/journey/pip')
    await expect(page.getByRole('heading', { name: /look into pip/i })).toBeVisible()
    await expect(page.getByText(/go stage activity/i)).toBeVisible()
  })

  test('explains what PIP is', async ({ page }) => {
    await page.goto('/journey/pip')
    await expect(page.getByText(/what is pip/i)).toBeVisible()
    await expect(page.getByRole('heading', { name: /what is pip/i })).toBeVisible()
  })

  test('can select DLA status', async ({ page }) => {
    await page.goto('/journey/pip')
    await page.getByLabel(/do you currently get dla/i).selectOption('yes')
    await expect(page.getByLabel(/dla care component/i)).toBeVisible()
  })

  test('shows daily living activities checklist', async ({ page }) => {
    await page.goto('/journey/pip')
    await expect(page.getByText(/daily living activities/i)).toBeVisible()
    await expect(page.getByText(/preparing food/i)).toBeVisible()
    await expect(page.getByText(/eating and drinking/i)).toBeVisible()
  })

  test('shows mobility activities checklist', async ({ page }) => {
    await page.goto('/journey/pip')
    await expect(page.getByText(/mobility activities/i)).toBeVisible()
    await expect(page.getByText(/planning and following journeys/i)).toBeVisible()
  })

  test('has helpful resource links', async ({ page }) => {
    await page.goto('/journey/pip')
    await expect(page.getByRole('link', { name: /gov.uk.*pip/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /citizens advice/i })).toBeVisible()
  })
})

// Adult Stage Tests
test.describe('Adult Stage - Hello New Team', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await page.goto('/journey/new-team')
    await expect(page.getByRole('heading', { name: /say hello to your new team/i })).toBeVisible()
    await expect(page.getByText(/adult stage activity/i)).toBeVisible()
  })

  test('shows how adult care is different', async ({ page }) => {
    await page.goto('/journey/new-team')
    await expect(page.getByText(/how adult care is different/i)).toBeVisible()
    await expect(page.getByText(/more responsibility/i)).toBeVisible()
    await expect(page.getByText(/direct communication/i)).toBeVisible()
  })

  test('can enter contact information', async ({ page }) => {
    await page.goto('/journey/new-team')
    await page.getByLabel(/main contact number/i).fill('020 1234 5678')
    await expect(page.getByLabel(/main contact number/i)).toHaveValue('020 1234 5678')
  })

  test('can add team member', async ({ page }) => {
    await page.goto('/journey/new-team')
    await page.getByRole('button', { name: /add team member/i }).click()
    await page.getByLabel(/^name$/i).fill('Dr. Jones')
    await page.getByLabel(/^role$/i).selectOption('Consultant / Specialist doctor')
    await page.getByRole('button', { name: /add to team/i }).click()
    await expect(page.getByText('Dr. Jones')).toBeVisible()
  })

  test('can save everything', async ({ page }) => {
    await page.goto('/journey/new-team')
    await page.getByRole('button', { name: /save everything/i }).click()
    await expect(page.getByText(/your information has been saved/i)).toBeVisible()
  })
})

test.describe('Adult Stage - Check Your Support', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await page.goto('/journey/check-support')
    await expect(page.getByRole('heading', { name: /check your support/i })).toBeVisible()
    await expect(page.getByText(/adult stage activity/i)).toBeVisible()
  })

  test('shows situation options', async ({ page }) => {
    await page.goto('/journey/check-support')
    await expect(page.getByText(/your current situation/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /at college/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /💼.*working/i })).toBeVisible()
  })

  test('selecting college shows education support section', async ({ page }) => {
    await page.goto('/journey/check-support')
    await page.getByRole('button', { name: /at college/i }).click()
    await expect(page.getByText(/education support/i)).toBeVisible()
  })

  test('shows benefits checklist', async ({ page }) => {
    await page.goto('/journey/check-support')
    await expect(page.getByText(/benefits and financial support/i)).toBeVisible()
    await expect(page.getByText(/pip.*personal independence payment/i)).toBeVisible()
    await expect(page.getByText(/universal credit/i)).toBeVisible()
  })

  test('can save support info', async ({ page }) => {
    await page.goto('/journey/check-support')
    await page.getByRole('button', { name: /save support info/i }).click()
    await expect(page.getByText(/your support information has been saved/i)).toBeVisible()
  })
})

// Navigation from My Journey page
test.describe('My Journey - Stage Links', () => {
  test('Steady stage shows links to activities', async ({ page }) => {
    await page.goto('/journey')
    await page.getByRole('button', { name: /age 14.*steady/i }).click()
    await expect(page.getByRole('link', { name: /practice speaking up/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /track my medicines/i })).toBeVisible()
  })

  test('Go stage shows links to activities', async ({ page }) => {
    await page.goto('/journey')
    await page.getByRole('button', { name: /age 16.*go/i }).click()
    await expect(page.getByRole('link', { name: /plan my move/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /learn about pip/i })).toBeVisible()
  })

  test('Adult stage shows links to activities', async ({ page }) => {
    await page.goto('/journey')
    await page.getByRole('button', { name: /age 18.*hello adult/i }).click()
    await expect(page.getByRole('link', { name: /meet my new team/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /review my support/i })).toBeVisible()
  })
})
