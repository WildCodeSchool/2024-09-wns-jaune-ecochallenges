import { test, expect } from '@playwright/test';

test('signs up, logs in, lands on home, opens logout dialog, confirms logout', async ({
  page,
}) => {
  await page.goto('http://localhost:7001');

  await page
    .getByRole('navigation', { name: 'Navigation principale' })
    .getByRole('button')
    .click();
  await page.getByRole('menuitem', { name: 'Inscription / Connexion' }).click();

  const email = `e2e_${Date.now()}@test.dev`;

  const signup = page.locator('form:has(button:has-text("S\'inscrire"))');
  await signup.getByLabel('Prénom', { exact: true }).fill('John');
  await signup.getByLabel('Nom', { exact: true }).fill('Doe');
  await signup.getByLabel('Email', { exact: true }).fill(email);
  await signup.getByLabel('Mot de passe', { exact: true }).fill('Password123!');
  await signup
    .getByLabel('Confirmez le mot de passe', { exact: true })
    .fill('Password123!');
  await signup.getByRole('button', { name: "S'inscrire" }).click();

  await expect(page).toHaveURL('http://localhost:7001/user');
  await page
    .getByRole('button', { name: 'Se connecter' })
    .click()
    .catch(() => {});

  const login = page.locator(`form:has(button:has-text("Se connecter"))`);
  await login.getByLabel('Email', { exact: true }).fill(email);
  await login.getByLabel('Mot de passe', { exact: true }).fill('Password123!');

  await Promise.all([
    page.waitForURL('http://localhost:7001/'),
    login.getByRole('button', { name: 'Se connecter' }).click(),
  ]);

  await page
    .getByRole('navigation', { name: 'Navigation principale' })
    .getByRole('button')
    .click();
  await page.getByRole('menuitem', { name: 'Se déconnecter' }).click();
  await expect(page).toHaveURL('http://localhost:7001/');

  const dialog = page.locator('[role="dialog"], [role="alertdialog"]').first();
  await expect(
    dialog.getByText('Êtes-vous sûr de vouloir vous déconnecter ?')
  ).toBeVisible();
  await dialog.getByRole('button', { name: 'Se déconnecter' }).click();
  await expect(page).toHaveURL('http://localhost:7001/user');
});
