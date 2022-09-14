const Profile: React.FC<{ appID: string; logout: () => void }> = ({
  appID,
  logout,
}) => {
  return <passage-profile app-id={appID} />
}
export default Profile
