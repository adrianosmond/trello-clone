const App = () => {
  const columns = [
    {
      id: 'col-1',
      name: 'To do',
      items: [
        { id: 'item-1', name: 'First' },
        { id: 'item-2', name: 'Second' },
        { id: 'item-3', name: 'Third' },
      ],
    },
    {
      id: 'col-2',
      name: 'In progress',
      items: [],
    },
    {
      id: 'col-3',
      name: 'Done',
      items: [],
    },
  ];

  return (
    <div>
      <h1>Trello clone</h1>
      <ul>
        {columns.map((col) => (
          <li key={col.id}>
            <h2>{col.name}</h2>
            <ul>
              {col.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
