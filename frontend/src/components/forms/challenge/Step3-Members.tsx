import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui';
import { UserCard } from '@/components/UserCard';
import {
  useGetUsersAsUserQuery,
  User,
} from '@/lib/graphql/generated/graphql-types';
import { CircleCheck, CirclePlus, CircleX, Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const Step3Members = () => {
  const { data, loading, error } = useGetUsersAsUserQuery();
  const form = useFormContext();
  const selectedMembersIds = form.watch('members') || [];
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
      (user) => !selectedMembersIds.includes(user.id)
    ) || [];

  const handleMemberClick = (member: User, isSelected: boolean) => {
    const newValue = isSelected
      ? selectedMembersIds.filter((id: string) => id !== member.id)
      : [...selectedMembersIds, member.id];
    form.setValue('members', newValue, { shouldValidate: true });
  };

  const clearSelectedMembers = () => {
    form.setValue('members', [], { shouldValidate: true });
  };
  return (
    <FormField
      control={form.control}
      name="members"
      render={() => (
        <Accordion type="multiple" defaultValue={['selected', 'available']}>
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
                      <span>Participants sélectionnés : </span>
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
                        user={member}
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
                      user={member}
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
  );
};
