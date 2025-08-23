import { useForm, type SubmitHandler } from "react-hook-form";
import { Phone, DollarSign, StickyNote, ArrowDownCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LabeledInput from "../../ui/InputWithLabel";
import PrimaryButton from "../../ui/PrimaryButton";
import { useCashInMutation } from "../../../redux/features/auth/authApi";

export interface ICashInPayload {
    receiverPhone: string;
    amount: number;
    note?: string;
}

const CashInSchema = z.object({
    receiverPhone: z
        .string({ message: "Receiver phone is required" })
        .min(1, { message: "Receiver phone is required" })
        .regex(/^01\d{9}$/, {
            message: "Phone number must be 11 digits and start with 01",
        }),
    amount: z
        .string()
        .min(1, { message: "Amount is required" })
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Amount must be a positive number",
        }),
    note: z.string().optional(),
});

type CashInFormInputs = z.infer<typeof CashInSchema>;

const CashInForm = () => {
    const [cashIn] = useCashInMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CashInFormInputs>({
        resolver: zodResolver(CashInSchema),
    });

    const onSubmit: SubmitHandler<CashInFormInputs> = async (data) => {
        try {
            const payload = {
                ...data,
                amount: Number(data.amount),
            };
            const res = await cashIn(payload).unwrap();
            toast.success(res?.message || "Cash In successful!");
        } catch (error: any) {
            toast.error(
                error?.data?.message || "Cash In failed. Please try again."
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-2xl"
        >
            <LabeledInput
                label="Receiver Phone Number"
                name="receiverPhone"
                placeholder="01XXXXXXXXX"
                icon={<Phone size={16} className="text-blue-500" />}
                register={register}
                error={errors.receiverPhone?.message}
            />

            <LabeledInput
                label="Amount"
                name="amount"
                type="number"
                placeholder="Enter amount"
                icon={<DollarSign size={16} className="text-green-500" />}
                register={register}
                error={errors.amount?.message}
            />

            <LabeledInput
                label="Note (Optional)"
                name="note"
                placeholder="Add a note..."
                icon={<StickyNote size={16} className="text-orange-500" />}
                register={register}
                error={errors.note?.message}
            />

            <PrimaryButton type="submit" icon={<ArrowDownCircle />}>
                Cash In
            </PrimaryButton>
        </form>
    );
};

export default CashInForm;
