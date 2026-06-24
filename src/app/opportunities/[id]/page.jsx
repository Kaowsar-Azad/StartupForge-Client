export default async function OpportunityDetailsPage({ params }) {
  const { id } = await params;

  // TODO: Fetch opportunity details from API using id

  return (
    <div className="opportunity-details-page">
      {/* TODO: Show all opportunity info and Apply button */}
      <h1>Opportunity Details</h1>
      <p>Opportunity ID: {id}</p>
    </div>
  );
}
