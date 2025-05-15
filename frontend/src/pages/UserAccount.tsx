import { useMutation, useQuery } from '@apollo/client';
import { Pencil, Save } from 'lucide-react';
import { Pill } from '@/components/Pill';
import { Card } from '@/components/ui';
import { useEffect, useState } from 'react';
import { GetUserByIdDocument, UpdateUserDocument } from '@/graphql/generated';

export const UserAccount = () => {
  const userId = 'cee5b95e-c5ee-4d1e-99c6-72e6911009f4';

  const { data, loading, error, refetch } = useQuery(GetUserByIdDocument, {
    variables: { id: userId },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const [updateUser] = useMutation(UpdateUserDocument);

  useEffect(() => {
    if (data?.getUserById) {
      setFirstName(data.getUserById.firstname || '');
      setLastName(data.getUserById.lastname || '');
      setEmail(data.getUserById.email || '');
      setDescription(data.getUserById.description || 'Description à venir...');
    }
  }, [data]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateUser({
        variables: {
          id: userId,
          data: {
            firstname: firstName,
            lastname: lastName,
            email: email,
            description: description,
          },
        },
      });

      await refetch().then(({ data }) => {
        console.log('Données rechargées :', data);
      });

      setIsEditing(false);
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  const user = data?.getUserById;
  if (!user) return <p>Aucun utilisateur trouvé</p>;

  return (
    <Card className="p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Avatar + nom/email */}
        <Card className="relative min-h-48 overflow-hidden rounded-xl p-4 sm:p-6">
          <div className="absolute inset-0 bg-[url('/images/fond-feuilles.jpg')] bg-cover bg-center opacity-30"></div>
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/public/icons/leaf.png"
                alt="Avatar utilisateur"
                className="bg-background h-20 w-20 rounded-full border-4 border-white object-cover"
              />
              <div className="text-left">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mb-1 border-b border-gray-300 bg-transparent text-xl font-bold focus:outline-none"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-b border-gray-300 bg-transparent text-gray-600 focus:outline-none"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">
                      {user.firstname} {user.lastname}
                    </h2>
                    <p className="text-gray-600">{user.email}</p>
                  </>
                )}
              </div>
            </div>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="hover:text-primary text-foreground"
              >
                {saving ? '...' : <Save size={18} />}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="hover:text-primary text-foreground"
              >
                <Pencil size={18} />
              </button>
            )}
          </div>
        </Card>

        {/* Description */}
        <Card className="border-accent relative p-4">
          <section>
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-lg font-semibold">À propos</h3>
              {isEditing ? (
                <button
                  className="hover:text-primary text-gray-500"
                  onClick={handleSave}
                >
                  <Save size={18} />
                </button>
              ) : (
                <button
                  className="hover:text-primary text-gray-500"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil size={18} />
                </button>
              )}
            </div>
            {isEditing ? (
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            ) : (
              <p className="whitespace-pre-line text-gray-700">{description}</p>
            )}
          </section>
        </Card>

        {/* Défis en cours */}
        <Card className="border-accent relative p-4">
          <section>
            <h3 className="mb-2 text-lg font-semibold">Défis en cours</h3>
            <div className="flex flex-wrap gap-2">
              {user.currentChallenges.length === 0 ? (
                <p className="text-gray-500">Aucun défi en cours</p>
              ) : (
                user.currentChallenges.map((challenge: any) => (
                  <Pill key={challenge.id} className="bg-accent border-primary">
                    {challenge.label}
                  </Pill>
                ))
              )}
            </div>
          </section>
        </Card>
      </div>
    </Card>
  );
};

export default UserAccount;
