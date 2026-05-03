import { test, expect } from '@playwright/test';

test.describe('Success Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display success screen and cleanup options when all steps are unlocked', async ({ page }) => {
    // Unlock all steps to reach the success screen
    // We can simulate this by directly setting the localStorage state
    await page.evaluate(() => {
      const state = {
        state: {
          currentStep: 6, // Step length is 6 in course-ir.json
          artifacts: {},
          reflections: {},
          guidanceMode: 'guided'
        },
        version: 0
      };
      localStorage.setItem('ir-course-progress', JSON.stringify(state));
    });
    
    await page.reload();

    // Now we should see the Success Screen
    await expect(page.locator('text=Generate Final Dossier')).toBeVisible();

    // Verify Resource Cleanup section
    await expect(page.locator('text=Resource Cleanup')).toBeVisible();
    
    // Verify cleanup options
    await expect(page.locator('text=Keep All Resources')).toBeVisible();
    await expect(page.locator('text=Delete Vectors Only')).toBeVisible();
    await expect(page.locator('text=Delete Everything')).toBeVisible();

    // Verify download report button
    await expect(page.locator('button:has-text("Download Technical Report")')).toBeVisible();
  });
});
