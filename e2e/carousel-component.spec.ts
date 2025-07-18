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

  await page.getByRole('button', { name: /next/i }).click();

  await expect(page.getByText('Opération données vertes')).toBeVisible();

  await page.getByRole('button', { name: /previous/i }).click();

  await expect(page.getByText('Jardin collectif sauvage')).toBeVisible();

  await page.getByRole('button', { name: /aller au challenge 3/i }).click();

  await expect(page.getByText('Opération données vertes')).toBeVisible();
});

test("le carousel affiche les challenges publics non terminés + non participés et permet la navigation en tant qu'utilisateur connecté", async ({
  page,
}) => {
  await page.goto('http://localhost:7001');

  await page.pause();
  await page
    .getByRole('navigation', { name: 'Navigation principale' })
    .getByRole('button')
    .click();
  await page.getByRole('menuitem', { name: 'Inscription / Connexion' }).click();
  await page.pause();

  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.getByLabel('Email').fill('elie@example.com');
  await page.pause();

  await page.getByLabel('Mot de passe').fill('Elie123!');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.pause();

  await expect(page.getByText('Jardin collectif sauvage')).toBeVisible();

  await page.getByRole('button', { name: /next/i }).click();

  await expect(page.getByText('Opération données vertes')).toBeVisible();

  await page.getByRole('button', { name: /next/i }).click();

  await expect(page.getByText('Jardin collectif sauvage')).toBeVisible();
});
