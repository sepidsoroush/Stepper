const DummyContent = ({ step }: { step: number }) => {
  const divs = [
    { id: 1, width: "300px" },
    { id: 2, width: "250px" },
    { id: 3, width: "200px" },
  ];

  const orderedDivs = [...divs];
  const startIndex = step - 1;
  const rotatedDivs = [
    ...orderedDivs.slice(startIndex),
    ...orderedDivs.slice(0, startIndex),
  ];

  return (
    <div className="my-8 space-y-4">
      {rotatedDivs.map((div) => (
        <div
          key={div.id}
          className={`rounded-md bg-muted h-4 w-[${div.width}]`}
        />
      ))}
    </div>
  );
};
export default DummyContent;
