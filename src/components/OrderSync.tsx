import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, Copy, Check } from "lucide-react";

interface OrderSyncProps {
  orders: any[];
  onOrdersImported: (orders: any[]) => void;
}

export default function OrderSync({ orders, onOrdersImported }: OrderSyncProps) {
  const [copied, setCopied] = useState(false);
  const [importData, setImportData] = useState('');

  // Export orders as JSON string
  const exportOrders = () => {
    const dataString = JSON.stringify(orders, null, 2);
    navigator.clipboard.writeText(dataString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Import orders from JSON string
  const importOrders = () => {
    try {
      const newOrders = JSON.parse(importData);
      if (Array.isArray(newOrders)) {
        // Merge with existing orders
        const existingOrders = JSON.parse(localStorage.getItem('pakasianOrders') || '[]');
        const mergedOrders = [...newOrders, ...existingOrders];
        
        // Remove duplicates by orderId
        const uniqueOrders = mergedOrders.filter((order, index, self) => 
          index === self.findIndex(o => o.orderId === order.orderId)
        );
        
        localStorage.setItem('pakasianOrders', JSON.stringify(uniqueOrders));
        onOrdersImported(uniqueOrders);
        setImportData('');
        alert(`Successfully imported ${newOrders.length} orders!`);
      } else {
        alert('Invalid data format. Please paste valid JSON array.');
      }
    } catch (error) {
      alert('Error importing data. Please check the format and try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Cross-Device Sync</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Export Orders (PC → Mobile)</h4>
          <p className="text-sm text-gray-500 mb-3">
            Copy orders from this device to share with mobile
          </p>
          <Button onClick={exportOrders} className="w-full">
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Orders Data
              </>
            )}
          </Button>
        </div>

        {/* Import Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Import Orders (Mobile ← PC)</h4>
          <p className="text-sm text-gray-500 mb-3">
            Paste orders data from another device
          </p>
          <textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            placeholder="Paste orders data here..."
            className="w-full h-24 p-2 border border-gray-300 rounded-md text-sm mb-2"
          />
          <Button 
            onClick={importOrders} 
            disabled={!importData.trim()}
            variant="outline" 
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Orders
          </Button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">How to Sync:</h5>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. <strong>On PC:</strong> Click "Copy Orders Data"</li>
          <li>2. <strong>Send to Mobile:</strong> WhatsApp/Email the copied data to yourself</li>
          <li>3. <strong>On Mobile:</strong> Paste the data and click "Import Orders"</li>
          <li>4. <strong>Done:</strong> Both devices will have same orders!</li>
        </ol>
      </div>
    </div>
  );
}
