import { test, expect } from '@playwright/test'

test.describe('Home Page Tiles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('checklist tile is visible and clickable', async ({ page }) => {
    const checklistTile = page.getByRole('link', { name: /checklist/i })
    await expect(checklistTile).toBeVisible()
    await checklistTile.click()
    await expect(page).toHaveURL('/checklist')
  })

  test('appointments tile is visible and clickable', async ({ page }) => {
    const appointmentsTile = page.getByRole('link', { name: /appointments/i })
    await expect(appointmentsTile).toBeVisible()
    await appointmentsTile.click()
    await expect(page).toHaveURL('/appointments')
  })

  test('care plan tile is visible and clickable', async ({ page }) => {
    const carePlanTile = page.getByRole('link', { name: /care plan/i })
    await expect(carePlanTile).toBeVisible()
    await carePlanTile.click()
    await expect(page).toHaveURL('/care-plan')
  })

  test('care team tile is visible and clickable', async ({ page }) => {
    const careTeamTile = page.getByRole('link', { name: /care team/i })
    await expect(careTeamTile).toBeVisible()
    await careTeamTile.click()
    await expect(page).toHaveURL('/care-team')
  })
})

test.describe('Checklist Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checklist')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /my transition checklist/i })).toBeVisible()
  })

  test('shows stage selector with all stages', async ({ page }) => {
    await expect(page.getByText(/what stage are you at/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /getting started.*11-13/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /building skills.*14-15/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /almost there.*16-17/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /flying solo.*18/i })).toBeVisible()
  })

  test('can select different stages', async ({ page }) => {
    await page.getByRole('button', { name: /getting started.*11-13/i }).click()
    await expect(page.getByText(/getting started stage progress/i)).toBeVisible()

    await page.getByRole('button', { name: /building skills.*14-15/i }).click()
    await expect(page.getByText(/building skills stage progress/i)).toBeVisible()
  })

  test('can check/uncheck tasks', async ({ page }) => {
    // Find a task and click it
    const taskButton = page.getByRole('button', { name: /i've written down what my health condition is called/i })
    await expect(taskButton).toBeVisible()
    await taskButton.click()

    // Should now show as checked
    await expect(taskButton).toHaveClass(/bg-green/)
  })

  test('progress updates when tasks completed', async ({ page }) => {
    // Get initial progress
    const progressText = page.getByText(/\d+ of \d+ tasks completed/)
    await expect(progressText).toBeVisible()

    // Complete a task
    const taskButton = page.getByRole('button', { name: /i've written down what my health condition is called/i })
    await taskButton.click()

    // Progress should update
    await expect(page.getByText(/1 of.*tasks completed/i)).toBeVisible()
  })

  test('has back link to home', async ({ page }) => {
    await page.getByRole('link', { name: /back to home/i }).click()
    await expect(page).toHaveURL('/')
  })
})

test.describe('Appointments Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/appointments')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /my appointments/i })).toBeVisible()
  })

  test('shows empty state when no appointments', async ({ page }) => {
    await expect(page.getByText(/no upcoming appointments/i)).toBeVisible()
  })

  test('can open add appointment form', async ({ page }) => {
    await page.getByRole('button', { name: /add appointment/i }).click()
    await expect(page.getByText(/add new appointment/i)).toBeVisible()
    await expect(page.getByLabel(/what's it for/i)).toBeVisible()
  })

  test('can add an appointment', async ({ page }) => {
    await page.getByRole('button', { name: /add appointment/i }).click()

    await page.getByLabel(/what's it for/i).fill('Transition clinic')
    await page.getByLabel(/where/i).fill('City Hospital')
    await page.getByLabel(/^date/i).fill('2026-03-15')
    await page.getByLabel(/time/i).fill('10:30')

    await page.getByRole('button', { name: /save appointment/i }).click()

    // Should show the new appointment
    await expect(page.getByText('Transition clinic')).toBeVisible()
    await expect(page.getByText('City Hospital')).toBeVisible()
  })

  test('can add questions to appointment', async ({ page }) => {
    // First add an appointment
    await page.getByRole('button', { name: /add appointment/i }).click()
    await page.getByLabel(/what's it for/i).fill('Check-up')
    await page.getByLabel(/^date/i).fill('2026-03-20')
    await page.getByPlaceholder(/question 1/i).fill('When will I move to adult services?')
    await page.getByRole('button', { name: /save appointment/i }).click()

    // Expand the appointment to see questions - use the expand button (▼)
    const expandButton = page.locator('button').filter({ hasText: '▼' })
    await expandButton.click()
    await expect(page.locator('input[value="When will I move to adult services?"]')).toBeVisible()
  })

  test('has back link to home', async ({ page }) => {
    await page.getByRole('link', { name: /back to home/i }).click()
    await expect(page).toHaveURL('/')
  })
})

test.describe('Care Plan Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/care-plan')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /my care plan/i })).toBeVisible()
  })

  test('has print/export button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /print.*export/i })).toBeVisible()
  })

  test('can fill in personal information', async ({ page }) => {
    await page.getByPlaceholder('Your full name').fill('Test User')
    await expect(page.getByPlaceholder('Your full name')).toHaveValue('Test User')
  })

  test('can add conditions', async ({ page }) => {
    await page.getByPlaceholder(/condition 1/i).fill('Diabetes')
    await page.getByRole('button', { name: /add another condition/i }).click()
    await expect(page.getByPlaceholder(/condition 2/i)).toBeVisible()
  })

  test('can add medications', async ({ page }) => {
    await page.getByPlaceholder(/medicine name/i).first().fill('Insulin')
    await page.getByPlaceholder(/dose/i).first().fill('10 units')
    await expect(page.getByPlaceholder(/medicine name/i).first()).toHaveValue('Insulin')
  })

  test('can select appointment preferences', async ({ page }) => {
    const prefButton = page.getByRole('button', { name: /i need extra time to process/i })
    await prefButton.click()
    await expect(prefButton).toHaveClass(/bg-primary/)
  })

  test('can fill emergency contact', async ({ page }) => {
    await page.getByPlaceholder('Contact name').fill('Mum')
    await page.getByPlaceholder(/mum.*dad.*carer/i).fill('Parent')
    await page.getByPlaceholder('Phone number').fill('07123456789')
    await expect(page.getByPlaceholder('Contact name')).toHaveValue('Mum')
  })

  test('has back link to home', async ({ page }) => {
    await page.getByRole('link', { name: /back to home/i }).click()
    await expect(page).toHaveURL('/')
  })
})

test.describe('Care Team Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/care-team')
    await page.evaluate(() => localStorage.clear())
  })

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /my care team/i })).toBeVisible()
  })

  test('shows empty state when no team members', async ({ page }) => {
    await expect(page.getByText(/your care team is empty/i)).toBeVisible()
  })

  test('has link to learn about roles', async ({ page }) => {
    await expect(page.getByRole('link', { name: /learn more/i })).toBeVisible()
  })

  test('can open add team member form', async ({ page }) => {
    await page.getByRole('button', { name: /add team member/i }).click()
    await expect(page.getByText(/add team member/i).last()).toBeVisible()
    await expect(page.getByLabel(/^name/i)).toBeVisible()
  })

  test('can add a team member', async ({ page }) => {
    await page.getByRole('button', { name: /add team member/i }).click()

    await page.getByLabel(/^name/i).fill('Dr. Smith')
    await page.getByLabel(/^role$/i).selectOption('Hospital Doctor / Consultant')
    await page.getByLabel(/where they work/i).fill('City Hospital')
    await page.getByLabel(/what they help/i).fill('My diabetes appointments')

    await page.getByRole('button', { name: /add to team/i }).click()

    // Should show the new team member
    await expect(page.getByText('Dr. Smith')).toBeVisible()
    await expect(page.getByText('Hospital Doctor / Consultant')).toBeVisible()
  })

  test('can delete a team member', async ({ page }) => {
    // First add a team member
    await page.getByRole('button', { name: /add team member/i }).click()
    await page.getByLabel(/^name/i).fill('Nurse Jones')
    await page.getByRole('button', { name: /add to team/i }).click()

    await expect(page.getByText('Nurse Jones')).toBeVisible()

    // Delete the team member
    await page.getByRole('button', { name: /×/i }).click()
    await expect(page.getByText('Nurse Jones')).not.toBeVisible()
  })

  test('has back link to home', async ({ page }) => {
    await page.getByRole('link', { name: /back to home/i }).click()
    await expect(page).toHaveURL('/')
  })
})

test.describe('Home Page Badge Updates', () => {
  test('checklist badge updates after completing tasks', async ({ page }) => {
    await page.goto('/checklist')
    await page.evaluate(() => localStorage.clear())

    // Complete some tasks
    await page.getByRole('button', { name: /i can describe my full health history/i }).click()
    await page.getByRole('button', { name: /i know how to book a gp or hospital appointment/i }).click()

    // Go back to home
    await page.goto('/')

    // Badge should show updated count
    const checklistTile = page.locator('a[href="/checklist"]')
    await expect(checklistTile.getByText(/2\/7/)).toBeVisible()
  })

  test('appointments badge updates after adding appointment', async ({ page }) => {
    await page.goto('/appointments')
    await page.evaluate(() => localStorage.clear())

    // Add an appointment
    await page.getByRole('button', { name: /add appointment/i }).click()
    await page.getByLabel(/what's it for/i).fill('Test appointment')
    await page.getByLabel(/^date/i).fill('2026-12-15')
    await page.getByRole('button', { name: /save appointment/i }).click()

    // Go back to home
    await page.goto('/')

    // Badge should show 1
    const appointmentsTile = page.locator('a[href="/appointments"]')
    await expect(appointmentsTile.getByText('1')).toBeVisible()
  })

  test('care team badge updates after adding team member', async ({ page }) => {
    await page.goto('/care-team')
    await page.evaluate(() => localStorage.clear())

    // Add a team member
    await page.getByRole('button', { name: /add team member/i }).click()
    await page.getByLabel(/^name/i).fill('Dr. Test')
    await page.getByRole('button', { name: /add to team/i }).click()

    // Go back to home
    await page.goto('/')

    // Badge should show 1
    const careTeamTile = page.locator('a[href="/care-team"]')
    await expect(careTeamTile.getByText('1')).toBeVisible()
  })
})
