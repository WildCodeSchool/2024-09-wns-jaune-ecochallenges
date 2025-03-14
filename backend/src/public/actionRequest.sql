INSERT INTO action (name, description, requires_view, "createdAt", level, icon, time) VALUES
('Gestion Eau', 'Optimisation de la consommation d’eau.', FALSE, NOW(), 1, 'leaf', '1'),
('Recyclage', 'Mise en place du tri sélectif.', FALSE, NOW(), 2, 'leaf', '1'),
('Énergie Verte', 'Utilisation d’énergies renouvelables.', FALSE, NOW(), 3, 'recycling', '2'),
('Réduction Papier', 'Diminution de l’usage du papier.', FALSE, NOW(), 3, 'recycling', '2'),
('Transports Écologiques', 'Encouragement du covoiturage et vélo.', FALSE, NOW(), 2, 'drop', '2'),
('Consommation Responsable', 'Achat de produits éco-responsables.', FALSE, NOW(), 2, 'drop', '12'),
('Économie Circulaire', 'Réutilisation et réparation des objets.', FALSE, NOW(), 1, 'drop', '1'),
('Éclairage LED', 'Remplacement des ampoules par des LED.', FALSE, NOW(), 1, 'leaf', '13'),
('Isolation Bâtiments', 'Amélioration de l’isolation thermique.', FALSE, NOW(), 2, 'leaf', '3'),
('Sensibilisation Écologique', 'Formation et information sur l’écologie.', FALSE, NOW(), 3, 'recycling', '1');