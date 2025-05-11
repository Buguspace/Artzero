
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/sonner";
import ImageUploader, { ImageFile } from "@/components/ImageUploader";
import { Artwork } from "@/types/artwork";

// Define the validation schema for the artwork form
export const artworkFormSchema = z.object({
  title: z.string().min(2, {
    message: "作品名称至少需要2个字符",
  }),
  description: z.string().min(10, {
    message: "作品描述至少需要10个字符",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "请输入有效的价格",
  }),
  category: z.string().min(1, {
    message: "请选择一个分类",
  }),
});

export type ArtworkFormValues = z.infer<typeof artworkFormSchema>;

export interface ArtworkFormProps {
  defaultValues?: ArtworkFormValues;
  imageFiles: ImageFile[];
  setImageFiles: (files: ImageFile[]) => void;
  onSubmit: (values: ArtworkFormValues, images: ImageFile[]) => void;
  submitButtonText?: string;
  isSubmitting?: boolean;
}

const ArtworkForm: React.FC<ArtworkFormProps> = ({
  defaultValues = {
    title: "",
    description: "",
    price: "",
    category: "",
  },
  imageFiles,
  setImageFiles,
  onSubmit,
  submitButtonText = "提交作品",
  isSubmitting = false,
}) => {
  const form = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: ArtworkFormValues) => {
    if (imageFiles.length === 0) {
      toast.error("请上传至少一张作品图片");
      return;
    }

    onSubmit(values, imageFiles);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="mb-6">
          <Label htmlFor="artwork-images" className="block mb-2">作品图片</Label>
          <ImageUploader
            images={imageFiles}
            onChange={setImageFiles}
            maxImages={6}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>作品名称</FormLabel>
              <FormControl>
                <Input placeholder="输入作品名称" {...field} />
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
              <FormLabel>作品描述</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="描述您的作品，创作背景，灵感等" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>价格 (¥)</FormLabel>
                <FormControl>
                  <Input placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>分类</FormLabel>
                <FormControl>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="" disabled>选择分类</option>
                    <option value="art">艺术</option>
                    <option value="books">书籍</option>
                    <option value="music">音乐</option>
                    <option value="video">视频</option>
                    <option value="rental">租赁</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit"
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "上传中..." : submitButtonText}
        </Button>
      </form>
    </Form>
  );
};

export default ArtworkForm;
