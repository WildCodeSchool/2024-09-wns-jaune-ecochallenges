import { useMutation, useQuery } from '@apollo/client';
import {
  Pencil,
  Save,
  Quote,
  Mail,
  User,
  BarChart2,
  ClipboardList,
} from 'lucide-react';
import { Card } from '@/components/ui';
import { useEffect, useState } from 'react';
import { GET_USER_BY_ID, UPDATE_USER } from '@/lib/graphql/operations';
import { Logout } from '@/components/forms/auth';
import { cn } from '@/lib/utils';

export const UserAccount = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID);
  const [updateUser] = useMutation(UPDATE_USER);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    description: '',
  });

  useEffect(() => {
    if (data?.getCurrentUser) {
      const { firstname, lastname, email, description } = data.getCurrentUser;
      setForm({
        firstname: firstname || '',
        lastname: lastname || '',
        email: email || '',
        description: description || 'Description à venir...',
      });
    }
  }, [data]);

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const userId = data?.getCurrentUser?.id;
    if (!userId) return;

    try {
      setSaving(true);
      await updateUser({
        variables: {
          user: {
            id: userId,
            firstname: form.firstname,
            lastname: form.lastname,
            description: form.description,
          },
        },
      });

      await refetch();
      setIsEditing(false);
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const user = data?.getCurrentUser;
  if (!user) return <p>Aucun utilisateur trouvé</p>;

  return (
    <>
      <h1 className="text-left text-2xl font-bold">Mon profil</h1>

      <div className="relative mx-auto mt-4 mb-1 flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-600 bg-white">
        <img
          src="https://github.com/shadcn.png"
          alt="Avatar utilisateur"
          className="h-28 w-28 rounded-full object-cover"
        />
        <button
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
          className="absolute right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700"
          aria-label={isEditing ? 'Enregistrer' : 'Modifier profil'}
        >
          {isEditing ? <Save size={16} /> : <Pencil size={16} />}
        </button>
      </div>
      <div className="mx-auto mb-1 flex items-center gap-2 text-gray-600">
        <Mail size={18} />
        <span>{form.email}</span>
      </div>
      <Card className="mt-4 p-3">
        {' '}
        {isEditing ? (
          <>
            <input
              type="text"
              value={form.firstname}
              onChange={(e) => handleInputChange('firstname', e.target.value)}
              className="mb-1 w-full border-b border-gray-300 bg-transparent text-lg font-semibold focus:outline-none"
              placeholder="Prénom"
            />
            <input
              type="text"
              value={form.lastname}
              onChange={(e) => handleInputChange('lastname', e.target.value)}
              className="w-full border-b border-gray-300 bg-transparent text-lg font-semibold focus:outline-none"
              placeholder="Nom"
            />
          </>
        ) : (
          <>
            <p className="text-lg font-semibold">
              {user.firstname} {user.lastname}
            </p>
          </>
        )}
      </Card>
      <Card className="mt-4 p-3">
        {' '}
        <h3 className="text-muted-foreground mb-1 flex items-center gap-2 text-lg font-semibold">
          <Quote size={16} />À propos
        </h3>
        {isEditing ? (
          <textarea
            className="w-full resize-none rounded-md border border-gray-300 p-1 text-gray-800"
            value={form.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
          />
        ) : (
          <p className="whitespace-pre-line text-gray-700">
            {user.description}
          </p>
        )}
      </Card>
      <Card className="mt-4 p-3">
        {' '}
        <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold">
          <BarChart2 size={18} />
          Statistiques
        </h3>
        <p>Nombre de défis réalisés : 12</p>
        <p>Points accumulés : 320</p>
      </Card>
      <Card className="mt-4 mb-4 p-3">
        {' '}
        <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold">
          <ClipboardList size={18} />
          Challenges en cours
        </h3>
        <ul className="list-inside list-disc text-sm">
          <li>Challenge zéro déchet</li>
          <li>Challenge alimentation bio</li>
          <li>Challenge économie d’énergie</li>
        </ul>
      </Card>
      <Logout />
    </>
  );
};

export default UserAccount;
