import React from 'react'
import { useGetMytransactionsQuery, useProfileQuery, useWalletQuery } from '../../../redux/features/auth/authApi';
import { computeExpenseData, computeWeeklyData } from '../../../utils/chartUtils';
import BalanceCardSkeleton from '../../Skeleton/BalanceCardSkeleton';
import BalanceCard from '../../ui/BalanceCard';
import QuickActions from '../../ui/QuickActions';
import SendMoneyForm from '../../ui/SendMoney';
import WithdrawForm from '../../ui/WithdrawForm';
import TransactionHistory from '../../ui/TransactionsTable';
import ChartCard from '../../ui/ChartCard';
import CashInForm from './CashIn';
import WithdrawUserWalletForm from './withdrawUserWallet';

const AgentDashboard = () => {
    const { data: profile } = useProfileQuery("");
    const username = profile?.data?.name || "";
    const accountType = profile?.data?.role;
    const { data: wallet, isLoading: walletLoading } = useWalletQuery("");
    const { data: transactions } = useGetMytransactionsQuery("");
    const weeklyChartData = React.useMemo(() => {
        if (!transactions?.data) return [];
        return computeWeeklyData(transactions.data, username);
    }, [transactions, username]);

    const expenseData = React.useMemo(() => {
        if (!transactions?.data) return [];
        return computeExpenseData(transactions.data);
    }, [transactions]);
    return (
        <>
            {walletLoading ? (
                <BalanceCardSkeleton />
            ) : (
                <BalanceCard balance={wallet?.data?.balance} currency="৳" provider="Digital Wallet" accountType={accountType} watermark={username} />
            )}

            {/* Quick Actions */}
            <QuickActions show={["cashin", "withdraw"]} modals={{ cashin: <CashInForm />, withdraw: <WithdrawUserWalletForm /> }} />

            {/* Charts */}
            <div id="charts-section" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard title="Weekly Spending" type="bar" data={weeklyChartData} dataKey="amount" />
                <ChartCard title="Expense Breakdown" type="pie" data={expenseData} dataKey="value" nameKey="name" />
            </div>
            {/* Transaction History */}
            <TransactionHistory transactions={transactions?.data || []} currentUserName={username} />

        </>)
}

export default AgentDashboard