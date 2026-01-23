'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateOrder } from "@/hooks/use-products";
import { type Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Schema for the form specifically
const formSchema = z.object({
  customerName: z.string().min(2, "Ime mora imati bar 2 karaktera"),
  email: z.string().email("Unesite validnu email adresu"),
  phone: z.string().min(6, "Unesite validan broj telefona"),
  address: z.string().min(5, "Unesite punu adresu"),
  quantity: z.coerce.number().min(1, "Najmanje 1 komad"),
  deliveryDate: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  product: Product;
  onSuccess?: () => void;
}

export function OrderForm({ product, onSuccess }: OrderFormProps) {
  const { toast } = useToast();
  const createOrder = useCreateOrder();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      address: "",
      quantity: 1,
      notes: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    createOrder.mutate(
      {
        ...values,
        items: [
          {
            productId: product.id,
            quantity: values.quantity,
          }
        ]
      },
      {
        onSuccess: () => {
          toast({
            title: "Porudžbina uspešna!",
            description: "Hvala na poverenju. Kontaktiraćemo vas uskoro radi potvrde.",
            variant: "default",
          });
          form.reset();
          onSuccess?.();
        },
        onError: (error) => {
          toast({
            title: "Greška",
            description: error.message || "Došlo je do greške prilikom slanja.",
            variant: "destructive",
          });
        }
      }
    );
  };

  if (createOrder.isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-xl font-serif font-bold text-green-800 mb-2">Hvala na poverenju!</h3>
        <p className="text-green-700 mb-6">
          Vaša porudžbina za <strong>{product.title}</strong> je primljena.
        </p>
        <p className="text-sm text-green-600">
          Naš tim će vas kontaktirati uskoro na navedeni broj telefona radi potvrde detalja isporuke.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border/50">
      <div className="mb-6">
        <h3 className="text-xl font-serif font-bold text-primary mb-1">Naručite ovaj proizvod</h3>
        <p className="text-sm text-muted-foreground">Popunite formu i kontaktiraćemo vas radi potvrde.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ime i Prezime</FormLabel>
                <FormControl>
                  <Input placeholder="Petar Petrović" {...field} className="bg-background/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input placeholder="06x xxx xxxx" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="petar@email.com" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresa za isporuku</FormLabel>
                <FormControl>
                  <Input placeholder="Ulica, Broj, Grad" {...field} className="bg-background/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Količina</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Željeni datum isporuke (opciono)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Napomena (opciono)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Dodatne informacije..." 
                    className="resize-none bg-background/50" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={createOrder.isPending}
            className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {createOrder.isPending ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Šaljem...
              </>
            ) : (
              "Pošalji porudžbinu"
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}
