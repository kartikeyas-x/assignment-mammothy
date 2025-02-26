import { UseFormReturn } from "react-hook-form";
import { InsertActivity } from "@shared/schema";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ActivityDetailsProps {
  form: UseFormReturn<InsertActivity>;
  onNext: () => void;
}

export default function ActivityDetails({ form, onNext }: ActivityDetailsProps) {
  const validateStep = () => {
    const fields = ["name", "category", "description", "activityType", "locationType", "minMembers", "maxMembers"];
    const isValid = fields.every(field => !form.formState.errors[field as keyof InsertActivity]);
    if (isValid) onNext();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Create New Activity</h1>
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Activity Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Eg: Cooking class in Palo Alto" {...field} className="rounded-lg" />
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
              <FormLabel className="text-gray-700">Select the best category to describe your activity <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  {[
                    { value: "Adventure & Games", icon: "🎮" },
                    { value: "Creative Expression", icon: "🎨" },
                    { value: "Food & Drink", icon: "🍳" },
                    { value: "Learning & Development", icon: "📚" },
                    { value: "Sports and Fitness", icon: "⚽" },
                    { value: "Volunteering", icon: "🤝" },
                    { value: "Other", icon: "✨" }
                  ].map((category) => (
                    <FormItem key={category.value} className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value={category.value} />
                      </FormControl>
                      <FormLabel className="mb-0">
                        <span className="mr-2">{category.icon}</span>
                        {category.value}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
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
              <FormLabel className="text-gray-700">Activity Description <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Activity Description"
                  className="min-h-[100px] rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activityType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Please select the activity type <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  {[
                    { value: "Indoor", icon: "🏠" },
                    { value: "Outdoor", icon: "🌳" },
                    { value: "Virtual", icon: "💻" }
                  ].map((type) => (
                    <FormItem key={type.value} className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value={type.value} />
                      </FormControl>
                      <FormLabel className="mb-0">
                        <span className="mr-2">{type.icon}</span>
                        {type.value}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Please select the type of location <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  {[
                    { value: "Provider Location", label: "Provider Location (activity takes place at the provider's venue)", icon: "🏢" },
                    { value: "User Location", label: "User Location (activity takes place at the user's venue)", icon: "🏡" }
                  ].map((type) => (
                    <FormItem key={type.value} className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value={type.value} />
                      </FormControl>
                      <FormLabel className="mb-0">
                        <span className="mr-2">{type.icon}</span>
                        {type.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel className="text-gray-700">How many members can take part in the activity?</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Minimum Members</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Maximum Members</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="button" 
            onClick={validateStep}
            className="group relative bg-gray-900 hover:bg-gray-800"
          >
            Save and Continue
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}