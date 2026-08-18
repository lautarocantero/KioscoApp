import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { JoinKioscoFormValues, UseJoinKioscoReturn } from "@typings/kiosco/kioscoTypes";
import type { AppDispatch } from "../../store/auth/authSlice";
import { fetchMyKioscosThunk, joinKioscoThunk, selectKioscoThunk } from "../../store/kiosco/kioscoThunks";
import { useErrorParser } from "../shared/useErrorParser";

export const useJoinKiosco = (): UseJoinKioscoReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { parseError } = useErrorParser();

    const handleSubmit = async (values: JoinKioscoFormValues): Promise<void> => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const kiosco = await dispatch(joinKioscoThunk(values));
            if (!kiosco) throw new Error("No se pudo unir al kiosco");

            await dispatch(fetchMyKioscosThunk());
            await dispatch(selectKioscoThunk(kiosco._id));
            navigate("/shop");
        } catch (err) {
            const message = await parseError(err, "Código de invitación inválido");
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { isSubmitting, submitError, handleSubmit };
};

export default useJoinKiosco;
