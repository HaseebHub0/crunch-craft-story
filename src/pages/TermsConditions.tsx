import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsConditions = () => {
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
              Terms & Conditions
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
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  By accessing and using the Pak Asian Foods website and services, you accept and agree to be bound 
                  by the terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  2. Use License
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials (information or software) 
                  on Pak Asian Foods's website for personal, non-commercial transitory viewing only. This is the 
                  grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  3. Product Information and Pricing
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We strive to provide accurate product descriptions, pricing, and availability information. 
                  However, we do not warrant that product descriptions or other content is accurate, complete, 
                  reliable, current, or error-free. Prices are subject to change without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  4. Order Acceptance and Cancellation
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  All orders are subject to acceptance and availability. We reserve the right to refuse service, 
                  terminate accounts, or cancel orders at our sole discretion. We may cancel an order if:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>The product is out of stock</li>
                  <li>There are issues with payment verification</li>
                  <li>The order violates our terms of service</li>
                  <li>We suspect fraudulent activity</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  5. Payment Terms
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  Payment is due at the time of order placement. We accept various payment methods as indicated 
                  on our website. All transactions are processed securely through our payment partners. 
                  By placing an order, you authorize us to charge your payment method for the total amount.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  6. Intellectual Property Rights
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  The content on this website, including but not limited to text, graphics, logos, images, 
                  and software, is the property of Pak Asian Foods and is protected by copyright laws. 
                  You may not reproduce, distribute, or create derivative works without our express written consent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  In no event shall Pak Asian Foods be liable for any damages arising out of the use or 
                  inability to use the materials on our website, even if we have been notified orally or 
                  in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  8. Governing Law
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  These terms and conditions are governed by and construed in accordance with the laws of Pakistan. 
                  Any disputes relating to these terms and conditions will be subject to the exclusive 
                  jurisdiction of the courts of Pakistan.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  9. Changes to Terms
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We reserve the right to modify these terms and conditions at any time. Changes will be 
                  effective immediately upon posting on our website. Your continued use of our services 
                  constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  10. Contact Information
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  If you have any questions about these Terms & Conditions, please contact us at:
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-muted-foreground font-inter">
                    <strong>Email:</strong> legal@pakasianfoods.com<br />
                    <strong>Phone:</strong> +92 315-742222<br />
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

export default TermsConditions;
