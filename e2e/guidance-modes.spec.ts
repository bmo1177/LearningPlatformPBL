import { test, expect } from '@playwright/test';

test.describe('Guidance Modes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage before each test to reset state
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('Step-by-Step mode should show both hints and code snippets', async ({ page }) => {
    // Should be default
    const stepByStepBtn = page.locator('button:has-text("Step-by-Step")');
    await expect(stepByStepBtn).toBeVisible();
    
    // Look for hints and code blocks. Step 1 has a hint and maybe code snippets
    await expect(page.locator('text=Engineering Insight').first()).toBeVisible();
    await expect(page.locator('text=Production Templates').first()).toBeVisible();
  });

  test('Some Guidance mode should show hints but hide code snippets', async ({ page }) => {
    const someGuidanceBtn = page.locator('button:has-text("Some Guidance")');
    await someGuidanceBtn.click();
    
    // Hints should still be visible
    await expect(page.locator('text=Engineering Insight').first()).toBeVisible();
    
    // Code templates should be hidden
    await expect(page.locator('text=Production Templates')).toHaveCount(0);
  });

  test('On Your Own mode should hide both hints and code snippets', async ({ page }) => {
    const independentBtn = page.locator('button:has-text("On Your Own")');
    await independentBtn.click();
    
    // Hints should be hidden
    await expect(page.locator('text=Engineering Insight')).toHaveCount(0);
    
    // Code templates should be hidden
    await expect(page.locator('text=Production Templates')).toHaveCount(0);
  });
});
