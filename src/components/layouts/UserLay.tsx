import { useState } from "react";
import {
  Wallet,
  Send,
  ArrowDownCircle,
  ArrowUpCircle,
  User,
  X,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#F43F5E"];

const MfsDashboard = () => {
  const [balance, setBalance] = useState(1250);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 500, date: "2025-08-15" },
    { id: 2, type: "Send", amount: 200, date: "2025-08-16" },
    { id: 3, type: "Withdraw", amount: 100, date: "2025-08-18" },
  ]);

  const [showSendModal, setShowSendModal] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [sendAmount, setSendAmount] = useState(0);

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const spendingData = [
    { name: "Deposit", value: transactions.filter(t => t.type === "Deposit").reduce((a,b)=>a+b.amount,0) },
    { name: "Withdraw", value: transactions.filter(t => t.type === "Withdraw").reduce((a,b)=>a+b.amount,0) },
    { name: "Send", value: transactions.filter(t => t.type === "Send").reduce((a,b)=>a+b.amount,0) },
  ];

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const paginatedTransactions = transactions.slice((page-1)*itemsPerPage, page*itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Wallet Balance */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex justify-between items-center border border-gray-100">
          <div>
            <h2 className="text-gray-500 text-sm">Wallet Balance</h2>
            <p className="text-4xl font-bold text-gray-800">${balance}</p>
          </div>
          <Wallet className="w-12 h-12 text-indigo-600" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setShowDepositModal(true)}
            className="flex flex-col items-center bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            <ArrowDownCircle className="w-10 h-10 text-green-500" />
            <span className="mt-2 font-semibold">Deposit</span>
          </button>

          <button
            onClick={() => setShowWithdrawModal(true)}
            className="flex flex-col items-center bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            <ArrowUpCircle className="w-10 h-10 text-red-500" />
            <span className="mt-2 font-semibold">Withdraw</span>
          </button>

          <button
            onClick={() => setShowSendModal(true)}
            className="flex flex-col items-center bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            <Send className="w-10 h-10 text-indigo-600" />
            <span className="mt-2 font-semibold">Send</span>
          </button>

          <button className="flex flex-col items-center bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition">
            <User className="w-10 h-10 text-gray-600" />
            <span className="mt-2 font-semibold">Profile</span>
          </button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl shadow-lg p-4 hover:shadow-2xl transition">
            <h3 className="font-semibold mb-2 text-gray-800">Spending Breakdown</h3>
            <div className="h-52">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={spendingData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={4}
                    label
                  >
                    {spendingData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Transactions</h3>
          <div className="divide-y divide-gray-100">
            {paginatedTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between py-3">
                <span className="font-medium">{tx.type}</span>
                <span
                  className={`${
                    tx.type === "Deposit"
                      ? "text-green-600"
                      : tx.type === "Withdraw"
                      ? "text-red-600"
                      : "text-indigo-600"
                  }`}
                >
                  ${tx.amount}
                </span>
                <span className="text-gray-400 text-sm">{tx.date}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              disabled={page===1}
              onClick={()=>setPage(prev=>Math.max(prev-1,1))}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={page*5>=transactions.length}
              onClick={()=>setPage(prev=>prev+1)}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Send Money Modal */}
        {showSendModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Send Money</h2>
                <X className="w-6 h-6 cursor-pointer" onClick={()=>setShowSendModal(false)} />
              </div>
              <input
                type="text"
                placeholder="Phone / Email"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
                className="w-full border rounded-lg p-2 mb-4"
              />
              <input
                type="number"
                placeholder="Amount"
                value={sendAmount}
                onChange={(e) => setSendAmount(Number(e.target.value))}
                className="w-full border rounded-lg p-2 mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={()=>setShowSendModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={()=>{
                    if(sendAmount>0 && sendTo){
                      setBalance(prev=>prev-sendAmount);
                      setTransactions(prev=>[{id:prev.length+1,type:'Send',amount:sendAmount,date:new Date().toISOString().split('T')[0]},...prev]);
                      setSendAmount(0);
                      setSendTo('');
                      setShowSendModal(false);
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Deposit Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Deposit Money</h2>
                <X className="w-6 h-6 cursor-pointer" onClick={()=>setShowDepositModal(false)} />
              </div>
              <input
                type="number"
                placeholder="Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full border rounded-lg p-2 mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={()=>setShowDepositModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={()=>{
                    if(depositAmount>0){
                      setBalance(prev=>prev+depositAmount);
                      setTransactions(prev=>[{id:prev.length+1,type:'Deposit',amount:depositAmount,date:new Date().toISOString().split('T')[0]},...prev]);
                      setDepositAmount(0);
                      setShowDepositModal(false);
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white"
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Withdraw Money</h2>
                <X className="w-6 h-6 cursor-pointer" onClick={()=>setShowWithdrawModal(false)} />
              </div>
              <input
                type="number"
                placeholder="Amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="w-full border rounded-lg p-2 mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={()=>setShowWithdrawModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={()=>{
                    if(withdrawAmount>0 && withdrawAmount<=balance){
                      setBalance(prev=>prev-withdrawAmount);
                      setTransactions(prev=>[{id:prev.length+1,type:'Withdraw',amount:withdrawAmount,date:new Date().toISOString().split('T')[0]},...prev]);
                      setWithdrawAmount(0);
                      setShowWithdrawModal(false);
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MfsDashboard;
