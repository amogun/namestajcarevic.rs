'use client';

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Ime je obavezno"),
  email: z.string().email("Unesite validan email"),
  message: z.string().min(10, "Poruka mora imati bar 10 karaktera"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // This is just a contact form, distinct from orders
    console.log("Contact form submitted:", data);
    toast({
      title: "Poruka poslata",
      description: "Hvala što ste nas kontaktirali. Odgovorićemo uskoro.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      <div className="pt-24 pb-16 bg-brand-beige/30">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Kontakt</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Imate pitanje ili želite savet? Tu smo da pomognemo.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-6">Informacije</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Adresa</h3>
                    <p className="text-muted-foreground">Božidara Milosavljevica 12</p>
                    <p className="text-muted-foreground">Kragujevac, Srbija</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Telefon</h3>
                    <p className="text-muted-foreground">064 119 31 83</p>
                    <p className="text-muted-foreground">060 024 42 02</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Email</h3>
                    <p className="text-muted-foreground">carevicnamestaj@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Radno Vreme</h3>
                    <div className="grid grid-cols-2 gap-x-8 text-muted-foreground">
                      <span>Ponedeljak - Petak:</span>
                      <span>10:00 - 19:00</span>
                      <span>Subota:</span>
                      <span>10:00 - 14:00</span>
                      <span>Nedelja:</span>
                      <span>Zatvoreno</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-border/50">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">Pošaljite nam poruku</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ime i Prezime</FormLabel>
                      <FormControl>
                        <Input placeholder="Vaše ime" {...field} />
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
                        <Input placeholder="vas@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poruka</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Kako možemo da Vam pomognemo?"
                          className="min-h-[150px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-all hover:shadow-lg"
                >
                  Pošalji
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}