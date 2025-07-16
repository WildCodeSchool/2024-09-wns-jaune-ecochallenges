import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormControl,
  FormField,
  FormItem,
  Input,
} from '@/components/ui';
import { UserCard } from '@/components/UserCard';
import {
  GetUsersAsUserQuery,
  useGetUsersAsUserQuery,
} from '@/lib/graphql/generated/graphql-types';
import {
  CircleCheck,
  CirclePlus,
  CircleX,
  Plus,
  Search,
  Trash,
} from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const Step3Members = () => {
  const { data, loading, error } = useGetUsersAsUserQuery();

  const form = useFormContext();
  const selectedMembersIds: string[] = form.watch('members') || [];
  const invites: string[] = form.watch('invites') || [];

  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [isInviteMemberDialogOpen, setIsInviteMemberDialogOpen] =
    useState(false);

  if (loading)
    return (
      <p role="status" aria-busy="true">
        Chargement des participants ...
      </p>
    );

  if (error)
    return (
      <p role="alert">
        Erreur lors du chargement des participants : {error.message}
      </p>
    );

  const selectedMembers =
    data?.getUsersAsUser.filter((user) =>
      selectedMembersIds.includes(user.id)
    ) || [];

  const availableMembers =
    data?.getUsersAsUser.filter(
      (user) =>
        !selectedMembersIds.includes(user.id) &&
        `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
          search.toLowerCase()
        )
    ) || [];

  const handleMemberClick = (
    member: GetUsersAsUserQuery['getUsersAsUser'][number],
    isSelected: boolean
  ) => {
    const newValue = isSelected
      ? selectedMembersIds.filter((id: string) => id !== member.id)
      : [...selectedMembersIds, member.id];
    form.setValue('members', newValue, { shouldValidate: true });
  };

  const clearSelectedMembers = () => {
    form.setValue('members', [], { shouldValidate: true });
  };

  const clearInvites = () => {
    form.setValue('invites', [], { shouldValidate: true });
    toast.success('Invitations supprimées avec succès');
  };

  const handleInviteMember = async () => {
    try {
      z.string().email().parse(email);
    } catch (error) {
      toast.error('Adresse email invalide');
      return;
    }

    if (invites.includes(email)) {
      toast.error('Une invitation a déjà été envoyée à cette adresse email');
      return;
    }

    const alreadySelectedMember = selectedMembers.find(
      (member) => member.email === email
    );
    if (alreadySelectedMember) {
      toast.error(
        `Cette adresse appartient déjà à un participant : ${alreadySelectedMember.firstname} ${alreadySelectedMember.lastname}`
      );
      return;
    }

    const availableExistingMember = availableMembers.find(
      (member) => member.email === email
    );
    if (availableExistingMember) {
      handleMemberClick(availableExistingMember, false);
      toast.success(
        `L'utilisateur ${availableExistingMember.firstname} ${availableExistingMember.lastname} a été ajouté avec succès à partir de son adresse email`
      );
      return;
    }

    form.setValue('invites', [...invites, email], { shouldValidate: true });
    toast.success('Invitation ajoutée avec succès');

    setEmail('');
    setIsInviteMemberDialogOpen(false);
  };

  return (
    <>
      <div className="relative mx-auto flex max-w-screen-lg flex-col gap-3 p-5">
        <span className="text-muted-foreground absolute top-1/2 left-8 -translate-y-1/2">
          <Search className="h-4 w-4" />
        </span>
        <Input
          type="text"
          placeholder="Rechercher..."
          className="w-full py-2 pr-4 pl-10"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <FormField
        control={form.control}
        name="members"
        render={() => (
          <Accordion
            type="multiple"
            defaultValue={['invites', 'selected', 'available']}
          >
            <AccordionItem value="invites" disabled={invites.length === 0}>
              <div className="relative">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 uppercase">
                    {invites.length > 0 ? (
                      <>
                        <CircleCheck aria-hidden="true" />
                        <span>Invitations en attente :</span>
                        <span
                          className="font-bold"
                          aria-label="Nombre d'invitations en attente"
                        >
                          {invites.length}
                        </span>
                      </>
                    ) : (
                      <>
                        <CircleX aria-hidden="true" />
                        <span>Aucune invitation en attente</span>
                      </>
                    )}
                  </div>
                </AccordionTrigger>

                <div className="absolute top-3 right-8 flex items-center gap-3">
                  <Dialog
                    open={isInviteMemberDialogOpen}
                    onOpenChange={setIsInviteMemberDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="default" size="sm" className="mx-auto">
                        <Plus aria-hidden="true" />
                        Inviter
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Inviter un nouveau participant
                        </DialogTitle>
                        <DialogDescription>
                          Entrez l'adresse email du participant que vous
                          souhaitez inviter.
                        </DialogDescription>
                      </DialogHeader>

                      <Input
                        type="email"
                        placeholder="Adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyUp={(e) => {
                          if (e.key === 'Enter') {
                            handleInviteMember();
                          }
                        }}
                      />

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Annuler</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={handleInviteMember}>Inviter</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {invites.length > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      type="button"
                      onClick={clearInvites}
                      aria-label="Supprimer toutes les invitations en attente"
                    >
                      <Trash aria-hidden="true" />
                    </Button>
                  )}
                </div>
              </div>

              {invites.length > 0 && (
                <AccordionContent className="flex flex-col gap-1 sm:grid sm:grid-cols-3 md:gap-3 xl:grid-cols-4 xl:gap-4">
                  {invites.map((invite) => (
                    <FormField
                      control={form.control}
                      name="invites"
                      render={() => (
                        <FormItem key={invite}>
                          <FormControl>
                            <UserCard
                              content={{ type: 'invite', email: invite }}
                              isSelected={true}
                              onClick={() =>
                                form.setValue(
                                  'invites',
                                  invites.filter((i) => i !== invite)
                                )
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </AccordionContent>
              )}
            </AccordionItem>

            <AccordionItem
              value="selected"
              disabled={selectedMembers.length === 0}
            >
              <div className="relative">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 uppercase">
                    {selectedMembers.length > 0 ? (
                      <>
                        <CircleCheck aria-hidden="true" />
                        <span>Participants sélectionnés :</span>
                        <span
                          className="font-bold"
                          aria-label="Nombre de participants sélectionnés"
                        >
                          {selectedMembers.length}
                        </span>
                      </>
                    ) : (
                      <>
                        <CircleX aria-hidden="true" />
                        <span>Aucun participant sélectionné</span>
                      </>
                    )}
                  </div>
                </AccordionTrigger>

                {selectedMembers.length > 0 && (
                  <Button
                    variant="destructive"
                    className="absolute top-3 right-8"
                    size="sm"
                    type="button"
                    onClick={clearSelectedMembers}
                    aria-label="Supprimer toutes les participants sélectionnés"
                  >
                    <Trash aria-hidden="true" />
                  </Button>
                )}
              </div>

              {selectedMembers.length > 0 && (
                <AccordionContent className="flex flex-col gap-1 sm:grid sm:grid-cols-3 md:gap-3 xl:grid-cols-4 xl:gap-4">
                  {selectedMembers.map((member) => (
                    <FormItem key={member.id}>
                      <FormControl>
                        <UserCard
                          content={{ type: 'user', user: member }}
                          isSelected={true}
                          onClick={() => handleMemberClick(member, true)}
                        />
                      </FormControl>
                    </FormItem>
                  ))}
                </AccordionContent>
              )}
            </AccordionItem>

            <AccordionItem value="available">
              <AccordionTrigger>
                <div className="flex items-center gap-2 uppercase">
                  <CirclePlus aria-hidden="true" />
                  <span>Ajouter des participants</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-1 sm:grid sm:grid-cols-3 md:gap-3 xl:grid-cols-4 xl:gap-4">
                {availableMembers.map((member) => (
                  <FormItem key={member.id}>
                    <FormControl>
                      <UserCard
                        content={{ type: 'user', user: member }}
                        isSelected={false}
                        onClick={() => handleMemberClick(member, false)}
                      />
                    </FormControl>
                  </FormItem>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      />
    </>
  );
};
