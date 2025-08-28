import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-foreground mb-4">
              Shipping Policy
            </h1>
            <p className="text-muted-foreground text-lg font-inter">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg border">
              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  1. Shipping Areas
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We currently ship to all major cities and towns across Pakistan. Our shipping network covers:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>All major cities (Karachi, Lahore, Islamabad, Peshawar, Quetta, Multan, Faisalabad, etc.)</li>
                  <li>District headquarters and surrounding areas</li>
                  <li>Remote areas (subject to courier service availability)</li>
                </ul>
                <p className="text-muted-foreground font-inter leading-relaxed mt-4">
                  For international shipping inquiries, please contact our customer service team.
                </p>
              </section>

              

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  2. Processing Time
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  Orders are typically processed and shipped within 24-48 hours of order confirmation. 
                  Processing times may be extended during peak seasons, holidays, or for large orders.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-blue-800 font-inter text-sm">
                    <strong>Note:</strong> Orders placed on weekends or holidays will be processed on the next business day.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  3. Shipping Costs
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  Shipping costs are calculated based on:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Order value and weight</li>
                  <li>Destination location</li>
                  <li>Selected shipping method</li>
                  <li>Courier service rates</li>
                </ul>
                <p className="text-muted-foreground font-inter leading-relaxed mt-4">
                  All shipping costs are clearly displayed during checkout before order confirmation.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  4. Order Tracking
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  Once your order ships, you will receive:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Order confirmation email with tracking number</li>
                  <li>SMS notification with tracking details</li>
                  <li>Real-time tracking updates via our website</li>
                  <li>Delivery confirmation upon successful delivery</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  5. Delivery Process
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  Our delivery process includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Signature confirmation for orders above PKR 5,000</li>
                  <li>Photo proof of delivery for all orders</li>
                  <li>Multiple delivery attempts (3 attempts maximum)</li>
                  <li>Contact with customer if delivery issues arise</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  6. Delivery Issues
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  If you experience delivery issues, please contact us within 24 hours:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Damaged packages</li>
                  <li>Missing items</li>
                  <li>Delivery delays beyond estimated time</li>
                  <li>Incorrect delivery address</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  7. Special Handling
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  Some products require special handling:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Fragile items are packaged with extra care</li>
                  <li>Perishable items are shipped with ice packs when necessary</li>
                  <li>Large orders may be split into multiple shipments</li>
                  <li>Holiday orders may have extended processing times</li>
                </ul>
              </section>

              <section>
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  8. Contact Information
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  For shipping-related questions or concerns, please contact us:
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-muted-foreground font-inter">
                    <strong>Email:</strong> infopakasian@gmail.com<br />
                    <strong>Phone:</strong> +92 315-742222<br />
                    <strong>WhatsApp:</strong> +92 315-742222<br />
                    <strong>Address:</strong> Nag Shah Chowk, Shujabad Road, Multan, Pakistan
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
