import { test, expect } from '@playwright/test';

test("le carousel affiche les challenges publics non terminés et permet la navigation en tant qu'utilisateur non connecté", async ({
  page,
}) => {
  await page.goto('http://localhost:7001');

  await expect(
    page.getByText("Créez une bibliothèque d'objets de quartier")
  ).toBeVisible();

  await page.getByRole('button', { name: /next/i }).click();

  await expect(page.getByText('Jardin collectif sauvage')).toBeVisible();

  await page.getByRole('button', { name: /previous/i }).click();

  await expect(
    page.getByText("Créez une bibliothèque d'objets de quartier")
  ).toBeVisible();
});
