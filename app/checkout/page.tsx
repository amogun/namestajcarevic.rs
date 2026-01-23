'use client';

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@/hooks/use-products";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Checkout form schema
const checkoutSchema = z.object({
  customerName: z.string().min(2, "Ime mora imati bar 2 karaktera"),
  email: z.string().email("Unesite validnu email adresu"),
  phone: z.string().min(6, "Unesite validan broj telefona"),
  address: z.string().min(5, "Unesite punu adresu"),
  deliveryDate: z.string().optional(),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const createOrder = useCreateOrder();
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  const onSubmit = (values: CheckoutFormValues) => {
    if (items.length === 0) {
      toast({
        title: "Korpa je prazna",
        description: "Dodajte proizvode u korpu pre naručivanja.",
        variant: "destructive",
      });
      return;
    }

    createOrder.mutate(
      {
        ...values,
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: () => {
          toast({
            title: "Porudžbina uspešna!",
            description: "Hvala na poverenju. Kontaktiraćemo vas uskoro radi potvrde.",
          });
          clearCart();
          form.reset();
        },
        onError: (error) => {
          toast({
            title: "Greška",
            description: error.message || "Došlo je do greške prilikom slanja porudžbine.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navigation />
        <div className="pt-32 pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-md mx-auto text-center">
              <h1 className="font-serif text-3xl font-bold text-primary mb-4">Vaša korpa je prazna</h1>
              <p className="text-muted-foreground mb-6">
                Dodajte proizvode u korpu da biste nastavili sa naručivanjem.
              </p>
              <Link href="/catalog">
                <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90">
                  Pogledajte katalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* Header */}
      <div className="pt-24 pb-6 bg-brand-beige/20">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">Korpa</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vaši proizvodi ({items.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.product.images?.[0] || '/placeholder-product.jpg'}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium text-foreground">{item.product.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {(item.product.priceCents / 100).toLocaleString('sr-RS')} RSD po komadu
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {((item.product.priceCents * item.quantity) / 100).toLocaleString('sr-RS')} RSD
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ukupno: {(totalPrice / 100).toLocaleString('sr-RS')} RSD</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ime i Prezime</FormLabel>
                          <FormControl>
                            <Input placeholder="Petar Petrović" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input placeholder="06x xxx xxxx" {...field} />
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
                            <Input placeholder="petar@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresa za isporuku</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ulica, Broj, Grad, Poštanski broj"
                              className="resize-none"
                              {...field}
                            />
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
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Napomena (opciono)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Dodatne informacije..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={createOrder.isPending}
                      className="w-full py-3 text-base font-medium"
                    >
                      {createOrder.isPending ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={18} />
                          Šaljem porudžbinu...
                        </>
                      ) : (
                        "Naruči"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}