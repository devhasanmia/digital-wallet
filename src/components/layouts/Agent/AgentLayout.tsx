import { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";


import { Outlet } from "react-router";
import { useProfileQuery } from "../../../redux/features/auth/authApi";
import HeaderSkeleton from "../../Skeleton/HeaderSkeleton";
import Header from "../../ui/Header";

const AgentLayout = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("digitalWalletTourCompleted")) setRunTour(true);
  }, []);

  const handleJoyrideCallback = (data: any) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      setRunTour(false);
      localStorage.setItem("digitalWalletTourCompleted", "true");
    }
  };

  const restartTour = () => {
    setRunTour(false);
    setTimeout(() => {
      localStorage.removeItem("digitalWalletTourCompleted");
      setRunTour(true);
    }, 300);
  };

  const { isLoading: profileLoading } = useProfileQuery("");
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Joyride
        run={runTour}
        steps={[
          { target: "body", content: "Welcome to Digital Wallet!", placement: "center" },
          { target: "#balance-card", content: "Your balance overview" },
          { target: "#quick-actions", content: "Quick actions" },
          { target: "#charts-section", content: "Income & Expenses charts" },
          { target: "#transaction-filters", content: "Transaction filters" },
        ]}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{ options: { primaryColor: "#4f46e5", zIndex: 1000 } }}
      />

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Header */}
          {profileLoading ? (
            <HeaderSkeleton />
          ) : (
            <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} onRestartTour={restartTour} />
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}


export default AgentLayout;