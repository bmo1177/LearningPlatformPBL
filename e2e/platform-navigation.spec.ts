import { test, expect } from '@playwright/test';

test.describe('Platform Navigation', () => {
  test('should load the main learning platform page', async ({ page }) => {
    await page.goto('/');
    
    // Verify the main heading exists
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Information Retrieval Engine/i }).first()).toBeVisible();
  });

  test('should verify the guidance mode selector is visible', async ({ page }) => {
    await page.goto('/');
    
    // Check if the 3 guidance mode buttons exist
    await expect(page.locator('button:has-text("Step-by-Step")')).toBeVisible();
    await expect(page.locator('button:has-text("Some Guidance")')).toBeVisible();
    await expect(page.locator('button:has-text("On Your Own")')).toBeVisible();
  });

  test('should have a sidebar with project summary', async ({ page }) => {
    await page.goto('/');
    
    // Check for "Project Summary" or something in the sidebar
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
    
    // The "N completed" badge or community CTA should be in the sidebar
    await expect(page.locator('text=Need help?')).toBeVisible();
  });
});
