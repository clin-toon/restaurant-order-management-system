"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Mode = "add" | "edit" | "delete";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: Mode;
}

export default function MenuModal({ open, onClose, mode }: Props) {
  const [image, setImage] = useState<File | null>(null);

  if (!open) return null;
  const isDelete = mode === "delete";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* MODAL */}
      <div className="w-full max-w-4xl bg-background rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-lg font-semibold">
              {mode === "add" && "Add Menu Item"}
              {mode === "edit" && "Edit Menu Item"}
              {mode === "delete" && "Delete Item"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isDelete ? "This cannot be undone" : "Fill item details"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-lg opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        {/* DELETE */}
        {isDelete ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="text-sm text-muted-foreground max-w-sm">
              Are you sure you want to delete this item?
            </p>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        ) : (
          <>
            {/* BODY */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="grid grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="col-span-2 space-y-5">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Name
                    </label>
                    <Input placeholder="Enter the name of the food" />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Description
                    </label>
                    <Textarea
                      className="h-24 resize-none"
                      placeholder="Short description..."
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Input type="number" placeholder="Price" />

                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="snacks">Snacks</SelectItem>
                        <SelectItem value="drinks">Drinks</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sub" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="momo">Momo</SelectItem>
                        <SelectItem value="pizza">Pizza</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-sm">Vegetarian</span>
                  </div>
                </div>

                {/* RIGHT (IMAGE) */}
                <div className="space-y-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Image
                  </p>

                  {!image ? (
                    <label className="cursor-pointer border border-dashed rounded-xl h-[180px] flex flex-col items-center justify-center text-center hover:bg-muted/40 transition">
                      <span className="text-xs text-muted-foreground">
                        Click to upload
                      </span>
                      <Input
                        type="file"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                      />
                    </label>
                  ) : (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="rounded-xl h-[180px] w-full object-cover shadow-sm"
                      />

                      <button
                        onClick={() => setImage(null)}
                        className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t flex justify-between">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>

              <Button className="px-8 py-4 text-sm font-medium">
                {mode === "add" ? "Add Item" : "Save"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
