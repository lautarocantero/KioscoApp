import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { CreateKioscoFormValues, UseCreateKioscoReturn } from "@typings/kiosco/kioscoTypes";
import type { AppDispatch } from "../../store/auth/authSlice";
import { createKioscoThunk, fetchMyKioscosThunk, selectKioscoThunk } from "../../store/kiosco/kioscoThunks";
import { useErrorParser } from "../shared/useErrorParser";

export const useCreateKiosco = (): UseCreateKioscoReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { parseError } = useErrorParser();

    const handleSubmit = async (values: CreateKioscoFormValues): Promise<void> => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const kiosco = await dispatch(createKioscoThunk(values));
            if (!kiosco) throw new Error("No se pudo crear el kiosco");

            await dispatch(fetchMyKioscosThunk());
            await dispatch(selectKioscoThunk(kiosco._id));
            navigate("/shop");
        } catch (err) {
            const message = await parseError(err, "Error inesperado al crear el kiosco");
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { isSubmitting, submitError, handleSubmit };
};

export default useCreateKiosco;
