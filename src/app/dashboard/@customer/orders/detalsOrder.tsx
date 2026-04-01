"use client";

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  medicine?: {
    name: string;
  };
}

interface OrderWithItems {
  id: string;
  totalAmount: number;
  status: string;
  orderItems?: OrderItem[];
}

// এটি এখন একটি প্রপস ভিত্তিক কম্পোনেন্ট
export default function DetailsOrderPage({ order }: { order: OrderWithItems }) {
  if (!order) return null;

  return (
    <div className="space-y-4 py-4 text-black">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Transaction ID</p>
        <p className="font-mono text-xs break-all text-gray-700">{order.id}</p>
      </div>

      <div>
        <h4 className="font-bold mb-3 text-sm text-gray-500 uppercase tracking-wider">Ordered Items</h4>
        <div className="space-y-2">
          {order.orderItems?.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
              <span className="text-gray-700 font-medium">
                {item.medicine?.name} <span className="text-gray-400 ml-1">x{item.quantity}</span>
              </span>
              <span className="font-bold text-primary">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t-2 border-dashed flex justify-between items-center">
        <span className="font-bold text-gray-600">Total Amount</span>
        <span className="text-2xl font-black text-primary">
          ${(order.totalAmount ?? 0).toFixed(2)}
        </span>
      </div>
      
      <div className={`text-center py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
        order.status === 'DELIVERED' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'
      }`}>
        Order Status: {order.status}
      </div>
    </div>
  );
}