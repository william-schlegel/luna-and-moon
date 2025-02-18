import PricingCard from '@/components/pricingCard';
import { subscriptionTiersInOrder } from '@/data/subscriptionTiers';

export default function Subscriptions() {
  return (
    <section className="bg-accent/5 px-8 py-16">
      <h1>Les différents plans proposés</h1>
      <div className="mx-auto mt-8 grid max-w-(--breakpoint-xl) grid-cols-2 gap-4 lg:grid-cols-4">
        {subscriptionTiersInOrder.map((tier) => (
          <PricingCard key={tier.id} {...tier} />
        ))}
      </div>
    </section>
  );
}
