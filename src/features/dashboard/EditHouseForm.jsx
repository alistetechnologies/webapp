import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocationSelector from "@/components/ui/location-input";
import useHouseStore from "./houseStore";

const formSchema = z.object({
  houseName: z.string().min(1),
  address: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, {
    message: "Invalid PIN Code",
  }),
  country: z.tuple([z.string(), z.string().optional()]),
});

export default function EditPropertyForm({}) {
  const house = useHouseStore((state) => state.house);
  console.info("HOuSE", house);
  const [countryName, setCountryName] = useState("India");
  const [stateName, setStateName] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      houseName: house?.houseName,
      city: house?.address?.city,
      pincode: house?.address?.pincode,
      country: house?.address?.country,
    },
  });

  console.log("ERRORS", form.formState.errors);
  function onSubmit(values) {
    console.log("HERE");
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full  py-10"
      >
        <FormField
          control={form.control}
          name="houseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="House name" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flat / Plot Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Flat / Plot Number"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="Street Address" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input placeholder="Pincode" type="number" {...field} />
              </FormControl>
              {/* <FormDescription>Pincode</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    setCountryName(country?.name || "");
                    form.setValue(field.name, [
                      country?.name || "",
                      stateName || "",
                    ]);
                  }}
                  onStateChange={(state) => {
                    setStateName(state?.name || "");
                    form.setValue(field.name, [
                      form.getValues(field.name)[0] || "",
                      state?.name || "",
                    ]);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
