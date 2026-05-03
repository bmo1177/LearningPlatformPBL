import { test, expect } from '@playwright/test';

test.describe('Learning Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should allow saving reflections and artifacts', async ({ page }) => {
    // 1. Submit pre-project quiz to get to step 1
    const startProjectBtn = page.locator('button:has-text("Start Project")');
    if (await startProjectBtn.isVisible()) {
      await startProjectBtn.click();
    }
    
    // Fill reflection
    await page.locator('#step-1 textarea[placeholder*="reflection"]').fill('This is a test reflection');
    await page.locator('#step-1 button:has-text("Save Reflection")').click();
    
    // Wait for it to save
    await expect(page.locator('#step-1 button:has-text("Saved")')).toBeVisible();

    // Fill artifact on step 2 (text artifact)
    await page.locator('#step-2 textarea[placeholder*="explanation"]').fill('This is a test artifact');
    await page.locator('#step-2 button:has-text("Save Answer")').click();

    // The button changes to "Update Answer"
    await expect(page.locator('#step-2 button:has-text("Update Answer")')).toBeVisible();
    
    // Progress badge should update to "2/6" since both step 1 (reflection) and step 2 (artifact) have data
    await expect(page.getByTestId('progress-badge')).toHaveText('2/6');
  });

  test('should open AI assistant and show quick actions', async ({ page }) => {
    // Click the sparkle button to open AI assistant
    const aiButton = page.locator('button:has(.lucide-sparkles)').last();
    await aiButton.click();

    // Verify AI tutor panel opens
    await expect(page.locator('h3:has-text("Socratic Tutor")')).toBeVisible();

    // Verify quick action buttons exist
    await expect(page.locator('button:has-text("Tell me about this project")')).toBeVisible();
    await expect(page.locator('button:has-text("Quiz me")')).toBeVisible();
    await expect(page.locator('button:has-text("My goal is...")')).toBeVisible();
  });
});
