import { HasPermission } from '@/components/hasPermission';
import { PageWithBackButton } from '@/components/pageWithBackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { canCreateArt } from '@/server/permissions';

import { ArtDetailsForm } from '../../_forms/art-form';

export default function NewArtPage() {
  return (
    <PageWithBackButton
      pageTitle="Create Product"
      backButtonHref="/dashboard/art"
    >
      <HasPermission
        permission={canCreateArt}
        renderFallback
        fallbackText="Vous avez déjà atteint le nombre maximum d'oeuvres que vous pouvez créer. Veuillez mettre à jour votre abonnement pour en créer plus."
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{"Détails de l'oeuvre"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ArtDetailsForm />
          </CardContent>
        </Card>
      </HasPermission>
    </PageWithBackButton>
  );
}
