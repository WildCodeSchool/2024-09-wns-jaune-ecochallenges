import { useMutation, useQuery } from '@apollo/client';
import {
  Pencil,
  Save,
  Quote,
  Mail,
  BarChart2,
  ClipboardList,
} from 'lucide-react';
import { Card } from '@/components/ui';
import { useEffect, useState } from 'react';
import { GET_USER_BY_ID, UPDATE_USER } from '@/lib/graphql/operations';
import { Logout } from '@/components/forms/auth';
import { toast } from 'sonner';

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
    avatarUrl: '',
  });

  useEffect(() => {
    if (data?.getCurrentUser) {
      const { firstname, lastname, email, description, avatarUrl } =
        data.getCurrentUser;

      setForm({
        firstname: firstname || '',
        lastname: lastname || '',
        email: email || '',
        description: description || 'Description à venir...',
        avatarUrl: avatarUrl || '',
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
            avatarUrl: form.avatarUrl,
          },
        },
      });

      await refetch();
      setIsEditing(false);

      toast.success('Profil mis à jour avec succès !');
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err);
      toast.error('Erreur lors de la mise à jour du profil.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const user = data?.getCurrentUser;
  if (!user) return <p>Aucun utilisateur trouvé</p>;

  const challengesCount = data.getCurrentUser.participatedChallenges.length;

  return (
    <>
      <h1 className="text-left text-2xl font-bold">Mon profil</h1>

      <div className="border-primary relative mx-auto mt-4 mb-1 flex h-48 w-48 items-center justify-center rounded-full border-4 bg-white">
        <img
          src={form.avatarUrl || '/public/icons/leaf.png'}
          alt="Avatar utilisateur"
          className="h-44 w-44 rounded-full object-cover"
        />
        <button
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
          className="bg-primary hover:bg-chart-5 absolute right-2 bottom-2 flex h-9 w-9 items-center justify-center rounded-full text-white"
          aria-label={isEditing ? 'Enregistrer' : 'Modifier profil'}
        >
          {isEditing ? <Save size={18} /> : <Pencil size={18} />}
        </button>
      </div>
      <div className="text-foreground mx-auto mb-1 flex items-center gap-2">
        <Mail size={18} />
        <span>{form.email}</span>
      </div>

      <Card className="mt-4 p-3">
        {isEditing ? (
          <>
            <input
              type="text"
              value={form.firstname}
              onChange={(e) => handleInputChange('firstname', e.target.value)}
              className="border-muted-foreground text-foreground mb-1 w-full border-b bg-transparent text-lg font-semibold focus:outline-none"
              placeholder="Prénom"
            />
            <input
              type="text"
              value={form.lastname}
              onChange={(e) => handleInputChange('lastname', e.target.value)}
              className="border-muted-foreground text-foreground mb-1 w-full border-b bg-transparent text-lg font-semibold focus:outline-none"
              placeholder="Nom"
            />
            <input
              type="text"
              value={form.avatarUrl}
              onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
              className="border-muted-foreground text-foreground w-full border-b bg-transparent text-sm italic focus:outline-none"
              placeholder="URL de l'image de profil"
            />
          </>
        ) : (
          <>
            <p className="text-foreground text-lg font-semibold">
              {user.firstname} {user.lastname}
            </p>
          </>
        )}
      </Card>

      <Card className="mt-4 p-3">
        <h3 className="text-foreground mb-1 flex items-center gap-2 text-lg font-semibold">
          <Quote size={16} />À propos
        </h3>
        {isEditing ? (
          <textarea
            className="border-muted-foreground text-foreground w-full resize-none rounded-md border p-1"
            value={form.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
          />
        ) : (
          <p className="text-foreground whitespace-pre-line">
            {user.description}
          </p>
        )}
      </Card>

      <Card className="mt-4 p-3">
        <h3 className="text-foreground mb-1 flex items-center gap-2 text-lg font-semibold">
          <BarChart2 size={18} />
          Statistiques
        </h3>
        <p>Nombre de challenges : {challengesCount}</p>
        <p>Points accumulés : 320</p>
      </Card>

      <Card className="mt-4 mb-4 p-3">
        <h3 className="text-foreground mb-1 flex items-center gap-2 text-lg font-semibold">
          <ClipboardList size={18} />
          Challenges en cours
        </h3>
        {data.getCurrentUser.participatedChallenges.length > 0 ? (
          <ul className="text-foreground list-inside list-disc text-sm">
            {data.getCurrentUser.participatedChallenges.map(
              (challenge: any) => (
                <li key={challenge.id}>{challenge.title}</li>
              )
            )}
          </ul>
        ) : (
          <p>Aucun challenge en cours.</p>
        )}
      </Card>

      <Logout />
    </>
  );
};

export default UserAccount;
