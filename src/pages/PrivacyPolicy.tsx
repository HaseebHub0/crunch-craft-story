import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
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
              Privacy Policy
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
                  1. Information We Collect
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us for support. This may include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our customer service team</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our products and services</li>
                  <li>Provide customer support</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  3. Information Sharing
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To process payments through secure payment processors</li>
                  <li>To fulfill orders through shipping partners</li>
                  <li>When required by law or to protect our rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  4. Data Security
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal information</li>
                  <li>Secure data transmission protocols</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  5. Your Rights
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with relevant authorities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  6. Cookies and Tracking
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your browsing experience, 
                  analyze website traffic, and personalize content. You can control cookie 
                  settings through your browser preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  7. Contact Us
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us at:
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-muted-foreground font-inter">
                    <strong>Email:</strong> privacy@pakasianfoods.com<br />
                    <strong>Phone:</strong> +92 315-742222<br />
                    <strong>Address:</strong> Nag Shah Chowk, Shujabad Road, Multan, Pakistan
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  8. Changes to This Policy
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new policy on our website and updating the 
                  "Last updated" date above.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
