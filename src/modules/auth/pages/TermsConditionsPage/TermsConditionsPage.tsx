import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import type { ReactNode } from "react";
import AuthLayout from "../../layout/AuthLayout";

const TermsConditionsPage = (): ReactNode => (
  <AuthLayout>
      <Card
        sx={(theme) => ({
          width: "100%",
          maxWidth: 810,
          bgcolor: theme.palette.background.paper,
          boxShadow: 3,
          borderRadius: 4,
          overflow: "hidden",
        })}
      >
        <CardContent
          sx={{
            p: { xs: 3, md: 5 },
            minHeight: { xs: 520, md: 640 },
            maxHeight: "calc(100vh - 160px)",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Términos y Condiciones de Uso — Stoko
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            <strong>Última actualización:</strong> 12 de agosto de 2026
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            1. Aceptación de los términos
          </Typography>
          <Typography variant="body1" paragraph>
            Al acceder o utilizar Stoko ("la Aplicación", "el Servicio"), aceptás estos Términos y Condiciones en su
            totalidad. Si no estás de acuerdo con alguna parte, no debés utilizar la Aplicación.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            2. ⚠️ Etapa beta — Advertencia importante
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Stoko se encuentra actualmente en etapa de desarrollo activo (beta).</strong> Esto significa que:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              La Aplicación puede contener <strong>errores, fallas o comportamientos inesperados</strong>.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Las funcionalidades pueden <strong>cambiar, modificarse, eliminarse o interrumpirse sin previo aviso</strong>.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>No se garantiza la disponibilidad continua</strong> del Servicio; pueden ocurrir interrupciones,
              mantenimientos o caídas temporales.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Existe la posibilidad de <strong>pérdida, corrupción o inconsistencia de datos</strong> (productos, ventas,
              proveedores, información de cuenta, etc.).
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            <strong>Recomendación:</strong> no utilices Stoko como única fuente de registro para información crítica de
            tu negocio durante esta etapa. Mantené respaldos propios de tu información siempre que sea posible.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            3. Uso de la aplicación
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Debés proporcionar información veraz al registrarte y mantenerla actualizada.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Sos responsable de mantener la confidencialidad de tus credenciales de acceso (incluyendo las asociadas a
              Google OAuth) y de toda actividad realizada desde tu cuenta.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              No debés utilizar la Aplicación con fines ilícitos, fraudulentos o que infrinjan derechos de terceros.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Nos reservamos el derecho de suspender o dar de baja cuentas que incumplan estos términos.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            4. Datos e información
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Los datos que cargues (productos, ventas, clientes, proveedores, etc.) son de tu responsabilidad en cuanto a
              su exactitud.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Durante la etapa beta, podemos realizar cambios en la estructura de datos que requieran migraciones,
              reinicios o ajustes que afecten la información almacenada.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Para más detalles sobre el tratamiento de datos personales, consultá la Política de Privacidad
              correspondiente (si aún no existe, se recomienda elaborar una antes del lanzamiento público).
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            5. Limitación de responsabilidad
          </Typography>
          <Typography variant="body1" paragraph>
            En la máxima medida permitida por la ley aplicable:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              No garantizamos que el Servicio sea ininterrumpido, seguro o libre de errores.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              No seremos responsables por daños directos, indirectos, incidentales o consecuentes derivados del uso o la
              imposibilidad de uso de la Aplicación, incluyendo pero no limitado a pérdida de datos, pérdida de ventas o
              interrupción del negocio.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              El uso de Stoko durante la etapa beta se realiza <strong>bajo tu propio riesgo</strong>.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            6. Propiedad intelectual
          </Typography>
          <Typography variant="body1" paragraph>
            Todo el contenido, diseño, código fuente y marca de Stoko son propiedad de su desarrollador/es, salvo que se
            indique lo contrario. No está permitida su reproducción, distribución o modificación sin autorización.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            7. Cambios en los términos
          </Typography>
          <Typography variant="body1" paragraph>
            Estos Términos y Condiciones pueden actualizarse en cualquier momento a medida que la Aplicación evoluciona desde
            su etapa beta hacia una versión estable. Se recomienda revisar esta sección periódicamente.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            8. Contacto
          </Typography>
          <Typography variant="body1" paragraph>
            Ante dudas, consultas o reportes de errores, podés contactarte con el equipo de desarrollo a través de los
            canales habilitados en la Aplicación.
          </Typography>

          <Typography variant="caption" color="text.secondary">
            *Este documento es un modelo básico de Términos y Condiciones para un producto en etapa beta y no constituye
            asesoramiento legal. Se recomienda que un profesional en derecho lo revise y adapte antes de su publicación
            definitiva, especialmente en lo referido a protección de datos personales y normativa local aplicable.
          </Typography>
        </CardContent>
      </Card>

  </AuthLayout>
);

export default TermsConditionsPage;
