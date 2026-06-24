export default async function StartupDetailsPage({ params }) {
  const { id } = await params;

  // TODO: Fetch startup details from API using id

  return (
    <div className="startup-details-page">
      {/* TODO: Implement full startup detail view */}
      <h1>Startup Details</h1>
      <p>Startup ID: {id}</p>
    </div>
  );
}
