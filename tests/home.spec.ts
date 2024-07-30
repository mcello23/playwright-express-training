import { expect, test } from '@playwright/test';

test('web must be online', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L');
});
