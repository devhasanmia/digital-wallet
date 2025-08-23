import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";
import BalanceCard from "../ui/BalanceCard";
import Header from "../ui/Header";
import { useGetMytransactionsQuery, useProfileQuery, useWalletQuery } from "../../redux/features/auth/authApi";
import BalanceCardSkeleton from "../Skeleton/BalanceCardSkeleton";
import HeaderSkeleton from "../Skeleton/HeaderSkeleton";
import TransactionHistory from "../ui/TransactionsTable";
import QuickActions from "../ui/QuickActions";
import SendMoneyForm from "../ui/SendMoney";
import WithdrawForm from "../ui/WithdrawForm";
import ChartCard from "../ui/ChartCard";
import { computeExpenseData, computeWeeklyData } from "../../utils/chartUtils";

export default function Dashboard() {
    const [isDarkMode, setDarkMode] = useState(false);
    const [runTour, setRunTour] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('digitalWalletTourCompleted')) setRunTour(true);
    }, []);
    const handleJoyrideCallback = (data: any) => {
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
            setRunTour(false);
            localStorage.setItem('digitalWalletTourCompleted', 'true');
        }
    };
    const restartTour = () => {
        setRunTour(false);
        setTimeout(() => {
            localStorage.removeItem('digitalWalletTourCompleted');
            setRunTour(true);
        }, 300);
    };
    const { data: profile, isLoading: profileLoading } = useProfileQuery("");
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
        <div className={isDarkMode ? 'dark' : ''}>
            <Joyride
                run={runTour}
                steps={[
                    { target: 'body', content: 'Welcome to Digital Wallet!', placement: 'center' },
                    { target: '#balance-card', content: 'Your balance overview' },
                    { target: '#quick-actions', content: 'Quick actions' },
                    { target: '#charts-section', content: 'Income & Expenses charts' },
                    { target: '#transaction-filters', content: 'Transaction filters' },
                ]}
                continuous
                showProgress
                showSkipButton
                callback={handleJoyrideCallback}
                styles={{ options: { primaryColor: '#4f46e5', zIndex: 1000 } }}
            />

            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

                    {/* Header */}
                    {profileLoading ? <HeaderSkeleton /> :
                        <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} onRestartTour={restartTour} />
                    }
                    {/* Balance Card */}
                    {walletLoading ? (
                        <BalanceCardSkeleton />
                    ) : (
                        <BalanceCard balance={wallet?.data?.balance} currency="৳" provider="Digital Wallet" accountType={accountType} watermark={username} />
                    )}
                    {/* Quick Actions */}
                    <QuickActions
                        show={["cashin", "withdraw"]}
                        modals={{
                            send: <SendMoneyForm />,
                            cashin: <WithdrawForm />
                        }}
                    />
                    {/* Charts */}
                    <div id="charts-section" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <ChartCard title="Weekly Spending" type="bar" data={weeklyChartData} dataKey="amount" />
                        <ChartCard title="Expense Breakdown" type="pie" data={expenseData} dataKey="value" nameKey="name" />
                    </div>

                    {/* Transaction History */}
                    <TransactionHistory transactions={transactions?.data || []} currentUserName={username} />
                </div>
            </div>
        </div>
    );
}
