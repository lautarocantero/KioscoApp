import React from "react";
import AppLayout from "../../shared/layout/AppLayout";
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import PresentationFormComponent from "../components/PresentationForm/PresentationForm";


const PresentationCreatePage = (): React.ReactNode => {
    return (
        <AppLayout isOptions title="Crear presentación">
            <SimpleGrid title="crear presentación" position="normal">
                <PresentationFormComponent />
            </SimpleGrid>
        </AppLayout>
    );
};

export default PresentationCreatePage;