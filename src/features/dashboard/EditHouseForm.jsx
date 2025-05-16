import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Select from "react-select";
import countries from "@/data/countries.json";
import states from "@/data/states.json";

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

import useHouseStore from "./houseStore";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/apiClient";
import { serverUrl } from "@/constants/config";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  houseName: z.string().min(1),
  flatPlotNumber: z.string().min(1),
  streetAddress: z.string().min(1),
  locality: z.string().min(1),
  city: z.string().min(1),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, {
    message: "Invalid PIN Code",
  }),
  state: z.string().min(1),
  country: z.string().min(1),
});

export default function EditPropertyForm({
  house,
  refreshUserHouses,
  closeModal,
}) {
  const [countryName, setCountryName] = useState("India");
  const [stateName, setStateName] = useState("");
  console.debug("house", house);
  let form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      houseName: house?.houseName,
      city: house?.address?.city,
      pincode: house?.address?.pincode,
      country: house?.address?.country,
      flatPlotNumber: house?.address?.flatPlotNumber || "",
      locality: house?.address?.locality || "",
      state: house?.address?.state || "",
      streetAddress: house?.address?.streetAddress || "",
    },
  });

  useEffect(() => {
    if (house) {
      // If the house object exists, reset the form values
      form.reset({
        houseName: house.houseName,
        city: house.address?.city,
        locality: house?.address?.locality || "",
        pincode: house.address?.pincode,
        country: house.address?.country,
        flatPlotNumber: house?.address?.flatPlotNumber || "",
        state: house?.address?.state || "",
        streetAddress: house?.address?.streetAddress || "",
      });
      setStateName(house?.address?.state);
    }
  }, [house, form]);
  // console.log("ERRORS", form.formState.errors);

  async function onSubmit(values) {
    try {
      const { houseName, ...address } = values;
      const payload = {
        houseName,
        address,
        houseId: house?._id,
      };

      console.warn("RESP", payload);
      const response = await api.post(
        `${serverUrl.sub}/v3/house/updateHouse`,
        payload
      );

      if (!response.data?.success) {
        //
      }

      refreshUserHouses();
      closeModal();

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
        className="space-y-8 w-full py-2"
      >
        <div className="flex w-full">
          <div className="w-1/2 p-2 space-y-6">
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
              name="flatPlotNumber"
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
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Street Address"
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
              name="locality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locality</FormLabel>
                  <FormControl>
                    <Input placeholder="locality" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator orientation="vertical" />
          <div className="w-1/2 p-2 space-y-6">
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
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Select
                      value={{ label: stateName, value: stateName }}
                      onChange={(selected) => {
                        const state = selected?.value || "";
                        setStateName(state);

                        form.setValue("state", state);
                      }}
                      options={states
                        .filter((s) => s.country_name === "India")
                        .map((c) => ({
                          label: c.name,
                          value: c.name,
                        }))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select
                      value={{ label: countryName, value: countryName }}
                      onChange={(selected) => {
                        const country = selected?.value || "";
                        setCountryName(country);
                        setStateName("");
                        form.setValue("country", country);
                      }}
                      options={countries.map((c) => ({
                        label: c.name,
                        value: c.name,
                      }))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-1/2">
          Submit
        </Button>
      </form>
    </Form>
  );
}
