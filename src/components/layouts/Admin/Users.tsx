import { 
  useGetAllUserQuery, 
  useToggleWalletBlockMutation, 
  useUpdateAgentStatusMutation 
} from "../../../redux/features/admin/AdminApi";

const Users = () => {
  const { data, error, isLoading } = useGetAllUserQuery("");
  const [toggleWalletBlock] = useToggleWalletBlockMutation();
  const [updateAgentStatus] = useUpdateAgentStatusMutation();

  const handleBlockUnblock = async (walletId: string) => {
    try {
      await toggleWalletBlock(walletId).unwrap();
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading users</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data?.map((user: User) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleBlockUnblock(user._id)} 
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        Block / Unblock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
