import { Pill } from '@/components/Pill';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Slider,
  Switch,
} from '@/components/ui';
import { Leaf, Sprout, TreePalm } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const Step1Init = () => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
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
        name="requires_view"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              L'action doit-elle être validée par d'autres participants ?
            </FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                id="requires_view"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Niveau de difficulté</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={field.value === 1 ? 'default' : 'outline'}
                  className="p-1"
                  onClick={() => field.onChange(1)}
                >
                  <Sprout size={16} className="mr-1" />
                  Facile
                </Button>
                <Button
                  type="button"
                  variant={field.value === 2 ? 'default' : 'outline'}
                  className="p-1"
                  onClick={() => field.onChange(2)}
                >
                  <Leaf size={16} className="mr-1" />
                  Moyen
                </Button>
                <Button
                  type="button"
                  variant={field.value === 3 ? 'default' : 'outline'}
                  className="p-1"
                  onClick={() => field.onChange(3)}
                >
                  <TreePalm size={16} className="mr-1" />
                  Difficile
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="time"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Durée de réalisation : {field.value || 1}
              {field.value > 1 ? ' heures' : ' heure'}
            </FormLabel>
            <FormControl>
              <Slider
                min={1}
                max={24}
                step={1}
                value={[field.value || 1]}
                onValueChange={([val]) => field.onChange(val)}
                className="w-70"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
