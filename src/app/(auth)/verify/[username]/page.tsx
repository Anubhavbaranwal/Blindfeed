'use client'
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { codevalidator } from "@/schemas/verifyschema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Console } from "console";
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import * as z from "zod";


const page = () => {
    const router =useRouter();
    const {toast}=useToast();
    const params=useParams<{username:string}>();
    const form =useForm<z.infer<typeof codevalidator>>({
        resolver:zodResolver(codevalidator)
    })

    const onSubmit=async(data:z.infer<typeof codevalidator>)=>{
        try {
            const response= await axios.post('/api/verify',{
                username:params.username,
                code:data.code
            })
            toast({
                title:"Success",
                description:response.data.message
            })
            
        } catch (error:any) {
            console.error(error);
            toast({
                title:"Failed",
                description:error.data.message
            })
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default page