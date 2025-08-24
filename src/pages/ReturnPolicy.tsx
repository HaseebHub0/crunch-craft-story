import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ReturnPolicy = () => {
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
              Return Policy
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
                  1. Return Eligibility
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We want you to be completely satisfied with your purchase. You may return items within 
                  7 days of delivery for the following reasons:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Product arrived damaged or defective</li>
                  <li>Wrong product was shipped</li>
                  <li>Product quality issues (taste, texture, etc.)</li>
                  <li>Expired or near-expiry products</li>
                  <li>Packaging issues affecting product safety</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-4">
                  <p className="text-yellow-800 font-inter text-sm">
                    <strong>Note:</strong> Opened food products cannot be returned for hygiene reasons unless they are defective.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  2. Return Process
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  To initiate a return, please follow these steps:
                </p>
                <ol className="list-decimal list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Contact our customer service within 7 days of delivery</li>
                  <li>Provide your order number and reason for return</li>
                  <li>Take photos of the issue (if applicable)</li>
                  <li>Wait for return authorization and instructions</li>
                  <li>Package the item securely and ship it back</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  3. Return Shipping
                </h2>
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                    <h3 className="font-poppins font-semibold text-lg text-green-800 mb-2">
                      Free Return Shipping
                    </h3>
                    <p className="text-green-700 font-inter text-sm">
                      We cover return shipping costs for damaged, defective, or incorrectly shipped items.
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <h3 className="font-poppins font-semibold text-lg text-blue-800 mb-2">
                      Customer-Paid Returns
                    </h3>
                    <p className="text-blue-700 font-inter text-sm">
                      For change of mind or other non-defect reasons, customers are responsible for return shipping costs.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  4. Refund Process
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  Once we receive and inspect your return:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Refunds are processed within 3-5 business days</li>
                  <li>Original payment method will be credited</li>
                  <li>You will receive email confirmation of the refund</li>
                  <li>Bank processing times may vary (typically 5-10 business days)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  5. Non-Returnable Items
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  The following items cannot be returned:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Opened food products (unless defective)</li>
                  <li>Personalized or custom orders</li>
                  <li>Sale or clearance items (final sale)</li>
                  <li>Gift cards or vouchers</li>
                  <li>Items purchased from third-party sellers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  6. Exchange Policy
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  We offer exchanges for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Wrong size or flavor (if available)</li>
                  <li>Damaged items for the same product</li>
                  <li>Defective items for working replacements</li>
                </ul>
                <p className="text-muted-foreground font-inter leading-relaxed mt-4">
                  Exchanges are subject to product availability. If the desired item is not available, 
                  we will process a refund instead.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  7. Return Conditions
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  To be eligible for return, items must be:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>In original packaging (when possible)</li>
                  <li>Unused and in sellable condition</li>
                  <li>Returned within the 7-day window</li>
                  <li>Properly packaged for return shipping</li>
                  <li>Accompanied by return authorization</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  8. Damaged or Defective Items
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  For damaged or defective items:
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-inter space-y-2 ml-4">
                  <li>Do not discard the item</li>
                  <li>Take clear photos showing the damage</li>
                  <li>Contact us immediately (within 24 hours preferred)</li>
                  <li>We will arrange pickup or provide return shipping label</li>
                  <li>Full refund or replacement will be provided</li>
                </ul>
              </section>

              <section>
                <h2 className="font-poppins font-bold text-2xl text-foreground mb-4">
                  9. Contact Information
                </h2>
                <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                  For return-related questions or to initiate a return, please contact us:
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-muted-foreground font-inter">
                    <strong>Email:</strong> returns@pakasianfoods.com<br />
                    <strong>Phone:</strong> +92 315-742222<br />
                    <strong>WhatsApp:</strong> +92 315-742222<br />
                    <strong>Address:</strong> Nag Shah Chowk, Shujabad Road, Multan, Pakistan
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-4">
                  <p className="text-blue-800 font-inter text-sm">
                    <strong>Customer Service Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM (Pakistan Time)
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

export default ReturnPolicy;
