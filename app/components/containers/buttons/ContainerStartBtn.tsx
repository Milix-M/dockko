import { IconButton } from "@material-tailwind/react";
import { Form } from "@remix-run/react";
import { FaPlay } from "react-icons/fa6";

type Prop = {
    className?: string
    size: "sm" | "md" | "lg"
    variant: "filled" | "gradient" | "outlined" | "text"
    containerId: string
}

export default function ContainerStartBtn({ className, size, variant, containerId }: Prop) {
    return (
        <Form replace method="post">
            <input type="hidden" value={containerId} name="containerId" />

            <IconButton variant={variant} size={size} type="submit" name="container" value="start">
                <FaPlay className={className} />
            </IconButton>
        </Form>
    )
}