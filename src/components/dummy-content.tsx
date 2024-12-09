const DummyContent = ({ step }: { step: number }) => {
  const divs = [
    { id: 1, width: "w-full" },
    { id: 2, width: "w-5/6" },
    { id: 3, width: "w-4/6" },
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
        <div key={div.id} className={`rounded-md bg-muted h-4 ${div.width}`} />
      ))}
    </div>
  );
};
export default DummyContent;
