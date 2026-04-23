import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo({
  options,
  placeholder = "Select",
  value,
  onChange,
  disabled,
  label,
  className,
}) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="text-xs font-medium text-muted-foreground ml-1.5">
          {label}
        </label>
      )}

      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        className="w-full max-w-48 h-10!"
      >
        <SelectTrigger
          className={`w-full max-w-48 h-10! border dark:border-gray-400 `}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>{placeholder}</SelectLabel>

            {options?.map((option) => (
              <SelectItem key={option} value={option}>
                <span className="block w-full truncate">
                  {option[0].toUpperCase() + option.slice(1)}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
