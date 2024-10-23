import {
    Input,
    Typography,
} from "@material-tailwind/react";



export function DateInputLabel({ label, placeholder, value, onValueChange }) {
    return (
        <div className="mb-1 flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                {label}
            </Typography>
            <Input
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                size="lg"
                type="date"
                placeholder={placeholder}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
        </div>
    )
}

export default DateInputLabel
