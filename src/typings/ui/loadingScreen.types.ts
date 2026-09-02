export interface LoadingScreenProps {
    label?: string;
    // La mayoría de las páginas gatean a nivel página, reemplazando a
    // AppLayout entero (true, default): ahí LoadingScreen es dueño de todo
    // el viewport. Pero en los 5 dominios "form" (Product/Sell/Provider/
    // Seller/PresentationForm) el early return vive dentro del componente
    // Form, que ya está anidado DENTRO de un <AppLayout> ya renderizado por
    // la página — forzar 100vh + <main> ahí duplicaría el <main> semántico
    // y quedaría apretado contra el ancho/padding de AppLayout. Esos
    // call sites pasan fullViewport={false} para ocupar solo el área de
    // contenido, dejando el header de AppLayout visible arriba.
    fullViewport?: boolean;
}
