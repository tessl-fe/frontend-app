export default function Header({ user }: { user?: { name: string } }) {
  return (
    <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 700 }}>TeamFlow</span>
      {user && <span>{user.name}</span>}
    </header>
  );
}
