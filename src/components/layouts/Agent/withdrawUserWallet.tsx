import { useForm, type SubmitHandler } from "react-hook-form";
import { Phone, DollarSign, StickyNote, ArrowUp } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useWithdrawUserWalletMutation } from "../../../redux/features/auth/authApi";
import LabeledInput from "../../ui/InputWithLabel";
import PrimaryButton from "../../ui/PrimaryButton";

export interface IWithdrawPayload {
    receiverPhone: string;
    amount: number;
    note?: string;
}

const WithdrawPayloadSchema = z.object({
    receiverPhone: z
        .string({ message: "user phone is required" })
        .min(1, { message: "user phone is required" })
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

type WithdrawFormInputs = z.infer<typeof WithdrawPayloadSchema>;

const WithdrawUserWalletForm = () => {
    const [withdraw] = useWithdrawUserWalletMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WithdrawFormInputs>({
        resolver: zodResolver(WithdrawPayloadSchema),
    });

    const onSubmit: SubmitHandler<WithdrawFormInputs> = async (data) => {
        try {
            const payload = {
                ...data,
                amount: Number(data.amount),
            };
            const res = await withdraw(payload).unwrap();
            toast.success(res?.message || "Withdrawal successful!");
        } catch (error: any) {
            toast.error(
                error?.data?.message || "Failed to withdraw. Please try again."
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-2xl"
        >
            <LabeledInput
                label="User Phone"
                name="receiverPhone"
                placeholder="017XXXXXXXX"
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

            <PrimaryButton type="submit" icon={<ArrowUp />}>
                Withdraw monay from User's Wallet
            </PrimaryButton>
        </form>
    );
};

export default WithdrawUserWalletForm;
