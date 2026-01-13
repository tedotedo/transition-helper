import { test, expect } from '@playwright/test'

test.describe('Ready Stage - Learn About Your Condition', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('can navigate to Learn About Condition page from My Journey', async ({ page }) => {
    await page.goto('/journey')

    // Click on Ready stage button (matches "Ready" with age range)
    await page.getByRole('button', { name: /age 11.*ready/i }).click()

    // Click on the activity link
    await page.getByRole('link', { name: /start activity/i }).click()

    // Should be on the Learn About Condition page
    await expect(page).toHaveURL('/journey/learn-about-condition')
    await expect(page.getByRole('heading', { name: /learn about your condition/i })).toBeVisible()
  })

  test('displays explanation of why understanding condition matters', async ({ page }) => {
    await page.goto('/journey/learn-about-condition')

    await expect(page.getByText(/why is this important/i)).toBeVisible()
    await expect(page.getByText(/help your doctors and nurses/i)).toBeVisible()
    await expect(page.getByText(/feel more confident/i)).toBeVisible()
  })

  test('can fill in condition name', async ({ page }) => {
    await page.goto('/journey/learn-about-condition')

    const input = page.getByLabel(/what's your condition called/i)
    await input.fill('Type 1 Diabetes')

    await expect(input).toHaveValue('Type 1 Diabetes')
  })

  test('can describe condition in own words', async ({ page }) => {
    await page.goto('/journey/learn-about-condition')

    const textarea = page.getByLabel(/describe it in your own words/i)
    await textarea.fill('My condition means that my body cannot make insulin')

    await expect(textarea).toHaveValue('My condition means that my body cannot make insulin')
  })

  test('can fill in healthy habits', async ({ page }) => {
    await page.goto('/journey/learn-about-condition')

    // Fill in the three healthy habit inputs
    const inputs = page.locator('input[placeholder*="e.g. I take my medicine"]')
    await inputs.first().fill('I check my blood sugar every day')

    await expect(inputs.first()).toHaveValue('I check my blood sugar every day')
  })

  test('can add questions for doctor', async ({ page }) => {
    await page.goto('/journey/learn-about-condition')

    const input = page.locator('input[placeholder*="Why do I need to take this medicine"]')
    await input.fill('Can I eat sweets sometimes?')

    await expect(input).toHaveValue('Can I eat sweets sometimes?')
  })

  test('can add more questions', async ({ page }) => {
    await page.goto('/journey/learn-about-condition')

    // Initially should have 3 question inputs
    const questionInputs = page.locator('input[placeholder*="e.g."]').filter({ has: page.locator('[placeholder*="medicine"], [placeholder*="sports"], [placeholder*="older"]') })

    // Click add more
    await page.getByRole('button', { name: /add another question/i }).click()

    // Should now have 4 inputs (check by counting placeholders)
    const allInputs = page.locator('section:has-text("Questions I want to ask") input[type="text"]')
    await expect(allInputs).toHaveCount(4)
  })

  test('can save answers to localStorage', async ({ page }) => {
    await page.goto('/journey/learn-about-condition')

    // Fill in some data
    await page.getByLabel(/what's your condition called/i).fill('Asthma')
    await page.getByLabel(/describe it in your own words/i).fill('I sometimes have trouble breathing')

    // Click save
    await page.getByRole('button', { name: /save my answers/i }).click()

    // Should show confirmation
    await expect(page.getByText(/your answers have been saved/i)).toBeVisible()

    // Reload and check data persists
    await page.reload()
    await expect(page.getByLabel(/what's your condition called/i)).toHaveValue('Asthma')
    await expect(page.getByLabel(/describe it in your own words/i)).toHaveValue('I sometimes have trouble breathing')
  })

  test('has print button', async ({ page }) => {
    await page.goto('/journey/learn-about-condition')

    await expect(page.getByRole('button', { name: /print.*share/i })).toBeVisible()
  })

  test('shows back link to My Journey', async ({ page }) => {
    await page.goto('/journey/learn-about-condition')

    const backLink = page.getByRole('link', { name: /back to my journey/i })
    await expect(backLink).toBeVisible()

    await backLink.click()
    await expect(page).toHaveURL('/journey')
  })
})

test.describe('Ready Stage - My Team', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('can navigate to My Team page from My Journey', async ({ page }) => {
    await page.goto('/journey')

    // Click on Ready stage button (matches "Ready" with age range)
    await page.getByRole('button', { name: /age 11.*ready/i }).click()

    // Click on the team link
    await page.getByRole('link', { name: /meet your team/i }).click()

    // Should be on the My Team page
    await expect(page).toHaveURL('/journey/my-team')
    await expect(page.getByRole('heading', { name: /get to know your team/i })).toBeVisible()
  })

  test('displays role explanations', async ({ page }) => {
    await page.goto('/journey/my-team')

    await expect(page.getByText(/who's who in healthcare/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /gp.*general practitioner/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /hospital doctor.*consultant/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /nurse.*specialist nurse/i })).toBeVisible()
  })

  test('clicking role expands explanation', async ({ page }) => {
    await page.goto('/journey/my-team')

    const gpButton = page.getByRole('button', { name: /gp.*general practitioner/i })
    await gpButton.click()

    // Should show expanded content
    await expect(page.getByText(/your gp is like your main doctor/i)).toBeVisible()
    await expect(page.getByText(/giving you prescriptions/i)).toBeVisible()
  })

  test('clicking same role collapses explanation', async ({ page }) => {
    await page.goto('/journey/my-team')

    const gpButton = page.getByRole('button', { name: /gp.*general practitioner/i })

    // Click to expand
    await gpButton.click()
    await expect(page.getByText(/your gp is like your main doctor/i)).toBeVisible()

    // Click again to collapse
    await gpButton.click()
    await expect(page.getByText(/your gp is like your main doctor/i)).not.toBeVisible()
  })

  test('shows empty team message initially', async ({ page }) => {
    await page.goto('/journey/my-team')

    await expect(page.getByText(/your team is empty/i)).toBeVisible()
  })

  test('can open add team member form', async ({ page }) => {
    await page.goto('/journey/my-team')

    await page.getByRole('button', { name: /add team member/i }).click()

    await expect(page.getByText(/add someone to your team/i)).toBeVisible()
    await expect(page.getByLabel(/their name/i)).toBeVisible()
    await expect(page.getByLabel(/what's their job/i)).toBeVisible()
  })

  test('can select avatar', async ({ page }) => {
    await page.goto('/journey/my-team')

    await page.getByRole('button', { name: /add team member/i }).click()

    // Click on a different avatar - small round avatar buttons have w-10 class
    const avatarButton = page.locator('button.w-10').filter({ hasText: '👨‍⚕️' }).first()
    await avatarButton.click()

    // Should have active styling (scale-110 and ring-2)
    await expect(avatarButton).toHaveClass(/scale-110/)
  })

  test('can add a team member', async ({ page }) => {
    await page.goto('/journey/my-team')

    await page.getByRole('button', { name: /add team member/i }).click()

    // Fill in details
    await page.getByLabel(/their name/i).fill('Dr. Sarah Smith')
    await page.getByLabel(/what's their job/i).selectOption('Hospital Doctor / Consultant')
    await page.getByLabel(/what do they help you with/i).fill('My diabetes check-ups')

    // Add to team
    await page.getByRole('button', { name: /add to team/i }).click()

    // Should show confirmation
    await expect(page.getByText(/team member added and saved/i)).toBeVisible()

    // Should show the team member in the team cards section
    await expect(page.getByText('Dr. Sarah Smith')).toBeVisible()
    await expect(page.getByText('My diabetes check-ups')).toBeVisible()
  })

  test('team members persist after reload', async ({ page }) => {
    await page.goto('/journey/my-team')

    // Add a team member
    await page.getByRole('button', { name: /add team member/i }).click()
    await page.getByLabel(/their name/i).fill('Nurse James')
    await page.getByLabel(/what's their job/i).selectOption('Nurse')
    await page.getByRole('button', { name: /add to team/i }).click()

    // Reload
    await page.reload()

    // Should still show team member
    await expect(page.getByText('Nurse James')).toBeVisible()
  })

  test('can remove a team member', async ({ page }) => {
    await page.goto('/journey/my-team')

    // Add a team member
    await page.getByRole('button', { name: /add team member/i }).click()
    await page.getByLabel(/their name/i).fill('Dr. Test')
    await page.getByLabel(/what's their job/i).selectOption('GP')
    await page.getByRole('button', { name: /add to team/i }).click()

    // Wait for team member to appear
    await expect(page.getByText('Dr. Test')).toBeVisible()

    // Hover and click remove
    const card = page.locator('div:has-text("Dr. Test")').filter({ has: page.locator('text=GP') }).first()
    await card.hover()
    await page.getByRole('button', { name: /remove dr. test/i }).click()

    // Should be removed
    await expect(page.getByText('Dr. Test')).not.toBeVisible()
    await expect(page.getByText(/your team is empty/i)).toBeVisible()
  })

  test('can cancel adding team member', async ({ page }) => {
    await page.goto('/journey/my-team')

    await page.getByRole('button', { name: /add team member/i }).click()
    await page.getByLabel(/their name/i).fill('Test Name')

    // Cancel
    await page.getByRole('button', { name: /cancel/i }).click()

    // Form should close
    await expect(page.getByLabel(/their name/i)).not.toBeVisible()
  })

  test('shows back link to My Journey', async ({ page }) => {
    await page.goto('/journey/my-team')

    const backLink = page.getByRole('link', { name: /back to my journey/i })
    await expect(backLink).toBeVisible()

    await backLink.click()
    await expect(page).toHaveURL('/journey')
  })
})
