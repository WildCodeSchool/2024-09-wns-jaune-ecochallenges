import { test, expect } from '@playwright/test';

test('navigate to login page and login', async ({ page }) => {
  await page.goto('http://localhost:7001');
  await page.pause();
  await page
    .getByRole('navigation', { name: 'Navigation principale' })
    .getByRole('button')
    .click();
  await page.getByRole('menuitem', { name: 'Inscription / Connexion' }).click();
  await page.pause();

  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.getByLabel('Email').fill('disko@disko.com');
  await page.pause();

  await page.getByLabel('Mot de passe').fill('Timomo22!');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.pause();
  await page.getByRole('button', { name: 'Photo de profil' }).click();
  await expect(page.getByText('Mon profil')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Se déconnecter' })
  ).toBeVisible();
});
