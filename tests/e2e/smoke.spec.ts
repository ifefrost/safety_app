import { test, expect } from "@playwright/test";

test("smoke: dashboard loads", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByText("Safety App")).toBeVisible();
});
