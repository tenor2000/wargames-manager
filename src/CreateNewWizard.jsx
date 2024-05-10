export function CreateNewWizard () {
  return (
    <div className="new-wizard-container">
        <h1>Create New Wizard</h1>
        <form>
          <section>
            <label>Name: </label>
            <input type="text" />
          </section>
        </form>
    </div>
  );
}

export function MenuWizard() {
  return (
    <>
      <h1>Wizard/Apprentice</h1>
    </>
  );
}