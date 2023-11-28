export default function UserProfile({ params }: any) {
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>
        Profile Page
        <span>{params.id}</span>
      </p>
    </div>
  );
}

//Note : whateverwe are grabbing it is gonnan grab if rom thei using this mehod
