import {
  Button,
  Calendar,
  Input,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

export const Step1Init = () => {
  const form = useFormContext();
  return (
    <>
      <FormField
        control={form.control}
        name="label"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input placeholder="Nom" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bannerURL"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bannière</FormLabel>
            <FormControl>
              <Input placeholder="Bannière" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dateRange"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Période du challenge</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'font-normal, bg-muted/30 w-[300px] justify-start text-left',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value?.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, 'PPP', { locale: fr })} -{' '}
                          {format(field.value.to, 'PPP', { locale: fr })}
                        </>
                      ) : (
                        format(field.value.from, 'PPP', { locale: fr })
                      )
                    ) : (
                      <span>Sélectionnez une période</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={field.value?.from}
                  selected={field.value}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                  locale={fr}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
