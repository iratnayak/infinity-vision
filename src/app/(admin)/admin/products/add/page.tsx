"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Update Zod Schema
const formSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.string().min(1, "Price is required"),
    type: z.string().min(1, "Please select a product type"),
    gender: z.string().min(1, "Please select age & gender"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function AddProductPage() {
    // Forms Initilize
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: "",
            type: "",
            gender: "",
            description: "",
        },
    });

    // Set Temp display the data on browser console
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form Submitted Data:", values);
        alert("Data captured successfully! Check your browser console.")
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-md">
                <CardHeader className="text-center border-b mb-6">
                    <CardTitle className="text-3xl font-bold text-[#1A237E]">InfiniVision Inventory</CardTitle>
                    <CardDescription className="">Enter the details of the new optical frame to the inventory.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/*Product Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold">Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Ray-Ban Aviator Classic"
                                                className="h-12 text-md focus:ring-[#00B0FF]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            {/* Price */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-semibold">Price (LKR)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. 25000"
                                                    className="h-12"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Type Selection (Specsavers Categories) */}
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-semibold">Frame Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="glasses">Glasses</SelectItem>
                                                    <SelectItem value="sunglasses">Sunglasses</SelectItem>
                                                    <SelectItem value="designer-glasses">Designer Glasses</SelectItem>
                                                    <SelectItem value="designer-brands">Designer Brands</SelectItem>
                                                    <SelectItem value="blue-light">Blue Light Glasses</SelectItem>
                                                    <SelectItem value="safety-eyewear">Safety Eyewear</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Age & Gender Selection */}
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold">Age & Gender</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue placeholder="Select Target" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="men">Men</SelectItem>
                                                <SelectItem value="women">Women</SelectItem>
                                                <SelectItem value="young">Young</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold">Product Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Describe the frame material, size, and style..." className="min-h-[120px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full h-14 bg-[#1A237E] hover:bg-[#00B0FF] text-white text-xl font-bold transition-all shadow-lg shadow-blue-200">
                                Publish to InfiniVision
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

